<?php

namespace App\Http\Admin\Form\Element;

use App\Repositories\Reference\CategoryRepository;
use App\Repositories\System\SiteRepository;
use Gsdk\Form\Element\Select;
use Illuminate\Database\Eloquent\Collection;

class Category extends Select {

	protected function init() {
		$this
			//->name('category_id')
			->label('Категория')
			->groups(SiteRepository::items())
			->groupIndex('site_id')
			->items(CategoryRepository::items());
	}

	/*public function prepareValue($value) {
		if (!$this->multiple)
			return parent::prepareValue($value);

		if (!$value instanceof Collection)
			return parent::prepareValue($value);

		$valueTemp = $value;
		$value = [];
		foreach ($valueTemp as $val) {
			$value[] = $val->category_id ?? $val->id;
		}

		return parent::prepareValue($value);
	}*/

}
