<?php

namespace App\Http\Admin\Grid;

use Form;

class Quicksearch extends Form {

	protected function init() {
		$this->method('get');
	}

	public function __toString(): string {
		$html = '<form method="get" class="quicksearch">';
		$html .= '<button type="submit" title="Найти"></button>';
		$html .= $this->render();
		$html .= '</form>';
		return $html;
	}

}
