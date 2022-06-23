<?php

namespace App\Http\Controllers;

use App\Services\Http\MetaService;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller {

	public function login(Request $request) {
		$form = new Form('data');
		$form
			->addElement('login', 'text', ['placeholder' => 'Email или Телефон'])
			->addElement('password', 'password', ['placeholder' => 'Пароль']);

		if ($form->submit()) {
			$data = $form->getData();
			if (Auth::guard('admin')->attempt($data, true)) {
				request()->session()->regenerate();

				return redirect($request->input('url') ?? '/');
			} else {
				$form->addError('Неправильный логин или пароль');
			}
		}

		if ($request->expectsJson())
			return view('auth.login', [
				'form' => $form
			]);
		else
			return view($this->layout, [
				'title' => 'Вход на сайт',
				'meta' => MetaService::instance()->configure([
					'style' => 'login',
					'script' => 'main'
				]),
				'content' => view('auth.login', [
					'form' => $form
				])
			]);
	}

	public function logout() {
		Auth::logout();

		return self::redirect('/login');
	}

}
