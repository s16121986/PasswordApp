<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;

class BaseController extends Controller {

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $layout = 'layouts.default';

    protected function setupLayout() {
        $this->layout = View::make($this->layout, ['content' => '']);
    }

    public function callAction($method, $parameters) {
        $callMethod = $method . 'Action';
        if (!method_exists($this, $callMethod))
            return abort(404);

        $this->setupLayout();

        $response = call_user_func_array([$this, $callMethod], $parameters);

        if (is_null($response) && !is_null($this->layout))
            $response = $this->layout;

        return $response;
    }

    protected function layout($view, array $data = []) {
        if (!is_null($this->layout))
            return $this->layout->nest('content', $view, $data);

        return view($view, $data);
    }

}
