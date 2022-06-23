<?php

namespace App\Http\Admin\Form\Element;

use App\Repositories\Reference\CityRepository;
use App\Repositories\Reference\CountryRepository;
use Gsdk\Form\Element\Select;

class City extends Select {

	protected function init() {
		$this
			->label('Город')
			->items(CityRepository::items())
			->groupIndex('country_id')
			->groups(CountryRepository::items());
	}

}
