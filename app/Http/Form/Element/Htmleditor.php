<?php

namespace App\Http\Admin\Form\Element;

use Gsdk\Form\Element\Textarea;

class Htmleditor extends Textarea {

	protected function init() {
		$this
			->stripTags(false);
	}

}
