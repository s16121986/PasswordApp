<?php

namespace App\Http\Controllers;

use App\Services\Http\MetaService;

class IndexController extends Controller {

	protected function index() {
		return view('dashboard', [
			'meta' => MetaService::instance()->configure([
				'style' => 'dashboard'
			]),

			//'projects' => Project::get()
		]);
	}

}
