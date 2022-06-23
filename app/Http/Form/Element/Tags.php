<?php

namespace App\Http\Form\Element;

use App\Models\Password\Tag;
use Gsdk\Form\Element\Hidden;

class Tags extends Hidden {

	protected function init() {
		$this
			->label('Теги');
	}

}
