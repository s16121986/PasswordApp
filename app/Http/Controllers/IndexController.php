<?php

namespace App\Http\Controllers;

use App\Services\Http\MetaService;
use Illuminate\Routing\Controller;

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
