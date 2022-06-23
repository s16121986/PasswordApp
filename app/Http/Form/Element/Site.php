<?php

namespace App\Http\Form\Element;

use App\Models\Password\Site as SiteModel;
use Gsdk\Form\Element\Select;

class Site extends Select {

	protected function init() {
		$this
			->label('Сайт')
			->items(SiteModel::get());
	}

}
