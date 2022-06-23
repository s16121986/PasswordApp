<?php

namespace App\Http;

use App\Http\Admin\Navigation\Breadcrumbs;
use App\Http\Admin\Navigation\Sidebar;
use App\Services\Http\MetaService;

class Layout {

	public $template;

	protected array $data = [];

	protected $sidebar;

	protected $breadcrumbs;

	protected array $menu = [];

	public function __construct($template) {
		$this->template = $template;
	}

	public function __get(string $name) {
		return match ($name) {
			'breadcrumbs' => $this->breadcrumbs,
			'sidebar' => $this->sidebar,
			default => $this->data[$name] ?? null
		};
	}

	public function __set(string $name, $value): void {
		$this->data[$name] = $value;
	}

	public function meta(): MetaService {
		return MetaService::instance();
	}

	public function sidebar(): Sidebar {
		return $this->sidebar ?? $this->sidebar = new Sidebar();
	}

	public function hasMenu($name): bool {
		return isset($this->menu[$name]) && $this->menu[$name]->isEmpty();
	}

	public function addMenu($name) {
		$cls = __NAMESPACE__ . '\\Navigation\\' . ucfirst($name);
		return $this->menu[$name] = new $cls();
	}

	public function menu($name, bool $create = false) {
		if (isset($this->menu[$name]))
			return $this->menu[$name];
		else if ($create)
			return $this->addMenu($name);
		else
			return null;
	}

	public function breadcrumbs(): Breadcrumbs {
		return $this->breadcrumbs ?? $this->breadcrumbs = new Breadcrumbs();
	}

	public function layout($view, array $data = []) {
		foreach ($data as $k => $v) {
			$this->data[$k] = $v;
		}

		return view($this->template, [
			'layout' => $this,
			'meta' => $this->meta()->configure(array_merge([
				'style' => 'main'
			], $data)),
			'content' => $this->view($view, $this->data)
		]);
	}

	public function view($view, array $data = []) {
		$data['layout'] = $this;

		return view($view, $data);
	}

	public function button($name) {
		return call_user_func([Buttons::class, $name]);
	}

	public function formButtons($new = false): string {
		return '<div class="form-buttons">'
			. $this->button('cancel')
			. '<button type="submit" class="btn btn-submit">' . ($new ? 'Создать' : 'Сохранить') . '</button>'
			. '</div>';
	}

	public function h1(string $title = null): string {
		$html = '<div class="content-title">';

		if ($this->breadcrumbs)
			$html .= $this->breadcrumbs;

		$html .= '<div class="h1-wrap">';
		$html .= '<h1>' . ($title ?? $this->title) . '</h1>';
		$html .= $this->menu('h1');
		$html .= '</div>';

		$html .= '</div>';
		return $html;
	}


}
