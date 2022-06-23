<?php

namespace App\Http\Admin\Grid;

use Form;

class Search extends Form {

	const emptyItem = '--Все--';

	protected function init() {
		$this->method('get');
	}

	public function language($name = 'language') {
		return $this->addElement($name, 'language', [
			'emptyItem' => self::emptyItem
		]);
	}

	public function site() {
		return $this->addElement('site_id', 'site', [
			'emptyItem' => self::emptyItem
		]);
	}

	public function country() {
		return $this->addElement('country_id', 'country', [
			'emptyItem' => self::emptyItem
		]);
	}

	public function city() {
		return $this->addElement('city_id', 'city', [
			'emptyItem' => self::emptyItem
		]);
	}

	public function category() {
		return $this->addElement('category_id', 'category', [
			'emptyItem' => self::emptyItem
		]);
	}

	public function manager() {
		return $this->addElement('manager_id', 'manager', [
			'emptyItem' => self::emptyItem
		]);
	}

	public function source() {
		return $this->addElement('source', 'source', ['emptyItem' => self::emptyItem]);
	}

}
