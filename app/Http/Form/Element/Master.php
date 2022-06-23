<?php

namespace App\Http\Admin\Form\Element;

use Gsdk\Form\Element\Hidden;

class Master extends Hidden {

	protected function init() {
		$this
			->label('Мастер');
	}

	public function checkValue($value) {
		return !empty($value);
	}

}
