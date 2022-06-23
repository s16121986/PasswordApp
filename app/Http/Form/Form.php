<?php

namespace App\Http\Form;

use App\Http\Admin\Form\Element\File;
use Form as BaseForm;

class Form extends BaseForm {

	const emptyItem = '';

	public static function register() {
		self::registerNamespace(__NAMESPACE__ . '\\Element');
	}

	protected function init() {
		$this->setId('form_data');
	}

	protected function addDefaultSelect($name, $type, array $options) {
		return $this->addElement($name, $type, array_merge([
			'emptyItem' => self::emptyItem
		], $options));
	}

	public function language(array $options = []) {
		return $this->addDefaultSelect('language', 'language', $options);
	}

	public function site(array $options = []) {
		return $this->addDefaultSelect('site_id', 'site', $options);
	}

	public function tags(array $options = []) {
		return $this->addDefaultSelect('tags', 'tags', $options);
	}

	public function city(array $options = []) {
		return $this->addDefaultSelect('city_id', 'city', $options);
	}

	public function category(array $options = []) {
		return $this->addDefaultSelect('category_id', 'category', $options);
	}

	public function master(array $options = []) {
		return $this->addElement('master_id', 'master', $options);
	}

	public function setModel($model): static {
		//$this->setData($model->toArray());
		$hasTranslation = method_exists($model, 'isTranslatable');

		/*foreach ($this->elements as $element) {
			//var_dump($element->name, $model->{$element->name});
			$element->setValue($model->{$element->name});
		}*/

		foreach ($this->elements as $element) {
			if ($hasTranslation && $model->isTranslatable($element->name))
				$element->setValue($model->getTranslations($element->name));
			else
				$element->setValue($model->{$element->name});
		}

		return $this;
	}

	public function saveUploads($model) {
		foreach ($this->elements as $element) {
			if ($element instanceof File)
				$element->saveUpload($model);
		}
	}

}
