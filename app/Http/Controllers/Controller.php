<?php

namespace App\Http\Controllers;

use App\Http\Actions\AbstractAction;
use App\Http\Layout;
use App\Services\Http\MetaService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\View;

class Controller extends BaseController {

	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	protected $layout;

	public function __construct() {
		MetaService::setDefaults([
			'title' => 'Панель администратора'
		]);

		//View::addLocation(resource_path('admin/views'));

		$this->layout = new Layout('layouts.default');
	}

	public function __get(string $name) {
		return match ($name) {
			'layout' => $this->layout,
			'sidebar' => $this->layout->sidebar(),
			'breadcrumbs' => $this->layout->breadcrumbs,
			default => $this->layout->$name,
		};
	}

	public function __set(string $name, $value) {
		$this->layout->$name = $value;
	}

	public function action($name = null, ...$args) {
		$action = AbstractAction::factory($this, $name);

		call_user_func_array([$action, 'run'], $args);

		return $action;
	}

	public function callAction($method, $parameters) {
		$callMethod = $method;// . 'Action';
		if (!method_exists($this, $callMethod))
			return abort(404);

		$response = call_user_func_array([$this, $callMethod], array_values($parameters));

		if (is_null($response))
			return view($this->layout->template, [
				'content' => '',
				'layout' => $this->layout,
				'meta' => $this->layout->meta()
			]);
		else if ($response instanceof AbstractAction)
			return $response->layout();
		else
			return $response;
	}

	public function layout($view, array $data = []) {
		//if (!request()->expectsJson())
		return $this->layout->layout($view, $data);
	}

}
