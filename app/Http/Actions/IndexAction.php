<?php

namespace App\Http\Actions;

use App\Http\Grid\Grid;

class IndexAction extends AbstractAction {

	protected $view = 'default.index';

	public function grid(array $options = null): Grid {
		return $this->data['grid'] ?? $this->data['grid'] = new Grid($options ?? []);
	}

	public function run() { }

	public function query($query = null) {
		return $this->grid()->query($query);
	}

	public function layout($view = null, array $data = null) {
		$grid = $this->grid();
		if (empty($grid->getData()->getData()))
			$grid->query($this->controller::model()::query());

		return parent::layout($view, $data);

	}

}
