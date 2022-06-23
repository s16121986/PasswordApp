<?php

namespace App\Services\Http;

use Gsdk\Meta\Page as MetaPage;
use Illuminate\Support\Facades\App;

class MetaService {

	private static $instance;
	private static array $defaults = [
		'style' => 'main'
	];
	protected string $version = 'v102';
	protected $page;

	public static function setDefaults(array $data) {
		foreach ($data as $k => $v) {
			self::$defaults[$k] = $v;
		}
	}

	public static function instance(): MetaService {
		if (!self::$instance)
			self::$instance = new self();

		return self::$instance;
	}

	public static function boot($service) {
		$page = $service->page;
		$head = $page->getHead();
	}

	public function __construct() {
		$this->page = new MetaPage();
	}

	public function __call($name, $arguments) {
		return call_user_func_array([$this->page, $name], $arguments);
	}

	public function __get($name) {
		switch ($name) {
			case 'page':
				return $this->$name;
			case 'head':
				return $this->page->getHead();
		}

		return $this->page->$name;
	}

	public function configure(array $data): static {
		$this->addDefault();

		$data = array_merge(self::$defaults, $data);

		if (isset($data['title']))
			$this->setTitle($data['title']);

		$this->addPageMeta($data['style'] ?? 'main', $data['script'] ?? null);

		return $this;
	}

	public function addScript($src, array $attributes = []): MetaService {
		$this->head->addScript($src . '.js?' . $this->version, $attributes);
		return $this;
	}

	public function addStyle($href, array $attributes = []): MetaService {
		$this->head->addStyle($href . '.css?' . $this->version, $attributes);
		return $this;
	}

	public function addDefault(): MetaService {
		//app()->getLocale()
		$head = $this->head;
		$head
			->addLinkRel('icon', '/favicon.ico')
			->addMetaHttpEquiv('Content-Type', 'text/html; charset=utf-8')
			->addMetaHttpEquiv('X-UA-Compatible', 'IE=edge,chrome=1')
			->addMetaHttpEquiv('Content-language', App::currentLocale())
			->addMetaName('viewport', 'width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1')
			->addMetaName('csrf-token', csrf_token())
			->setBaseHref('https://account.hfgh.ru')
			//->addMetaName('apple-itunes-app', 'app-id=' . Constant::get('IOS_APP_ID'))
			//->addMetaName('google-play-app', 'app-id=' . Constant::get('GOOGLE_APP_ID'))
			//->addStyle('app.css?' . $this->version)
			//->addScript('/sw.js')
		;
		$data = [];
		$data['user'] = ['id' => auth()->id()];
		$head
			->addMetaName('application-data', htmlspecialchars(json_encode($data)));

		foreach (['OpenSans-Regular', 'OpenSans-Bold', 'OpenSans-SemiBold'] as $n) {
			$head->addLinkRel('preload', '/fonts/OpenSans/' . $n . '.ttf', ['as' => 'font', 'crossorigin' => 'anonymous']);
		}

		//$this->addSeoMeta();
		return $this;
	}

	public function addPageMeta($style, $script = null): MetaService {
		$head = $this->head;

		$head
			->addLinkRel('preload', '/css/' . $style . '.css?' . $this->version, ['as' => 'style'])
			->addStyle($style . '.css?' . $this->version)
			->addScript(($script ?? $style) . '.js?' . $this->version, ['defer' => true]);

		return $this;
	}

	public function isPrint() {
		$this->head->addStyle('print.css?' . $this->version);
	}

	public function addSeoScripts(): MetaService {
		//$this->head->addContent(SeoScript::getByType(\SEO_SCRIPT_TYPE::HEAD));
		return $this;
	}

	public function addJsonLd(): MetaService {
		//Json Ld разметка страницы Organization, BreadcrumbList
		$htmlPage = $this->htmlPage;
		$baseUrl = App::getDomain(true);
		$social = [];
		foreach (App::factory('Reference\Social')->select(['auto' => true]) as $r) {
			$social[] = $r->url;
		}
		$jsonLd = $htmlPage->getJsonLd()
			->addOrganization([
				'url' => $baseUrl,
				'logo' => $baseUrl . '/images/logo/logo_ru.svg',
				'telephone' => App::get('contact_phone'),
				'sameAs' => $social
			]);

		$menuManager = $this->controller->get('menu');
		if ($menuManager->has('breadcrumbs') && !$menuManager->get('breadcrumbs')->isEmpty()) {
			$items = [];
			$a = $menuManager->get('breadcrumbs')->getItems();
			foreach ($a as $i => $item) {
				if (!$item->href)
					continue;
				$items[] = [
					'@type' => 'ListItem',
					'position' => $i + 1,
					'name' => $item->text,
					'item' => $baseUrl . $item->href
				];
			}
			$jsonLd->addBreadcrumbs(['itemListElement' => $items]);
		}
		return $this;
	}

	public function addSeoMeta() {
		$head = $this->htmlPage->getHead();

		$head
			->addMetaProperty('og:url', $this->controller->url(['absolute' => true]))
			->addMetaProperty('og:title', $head->getTitle());

		foreach (['keywords', 'description'] as $n) {
			if ($head->$n)
				$head->addMetaProperty('og:' . $n, $head->$n);
		}

		$q = $this->controller->getRequest()->getQuery();

		$noindexParams = ['utm_source', 'utm_medium', 'utm_campaign', 'quicksearch', 'site_id', 'category_id', 'city_id', 'target', 'p', 'url', 'id', 'order', 'gclid', 'language', 'lang', 'provider'];
		foreach ($noindexParams as $k) {
			if (!isset($q[$k]))
				continue;

			$this->controller->getResponse()
				->setHeader('X-Robots-Tag', 'noindex, follow');
			break;
		}
	}

	public function addAlternates(): MetaService {
		$head = $this->page->getHead();
		$absUrl = trim($this->url([
			'absolute' => true,
			'language' => 'ru',
			'url' => '/'
		]), '/');
		$head->addLinkRel('alternate', $absUrl . $this->url([
				'query' => true,
				'language' => 'ru'
			]), ['hreflang' => 'x-default']);
		foreach (Translation::getLanguages() as $lang) {
			//if ($lang->code === Translation::getCode()) continue;
			$head->addLinkRel('alternate', $absUrl . $this->url([
					//'url' => null,
					'query' => true,
					//'absolute' => true,
					'language' => $lang->code
				]), ['hreflang' => $lang->hreflang]);
		}
		return $this;
	}

}
