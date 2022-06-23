<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Form\Form;
use Gsdk\DateTime;

class AppServiceProvider extends ServiceProvider {

	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register() {
		//
	}

	public function bootDateTime() {
		if (isset($_COOKIE['client_timezone'])) {
			try {
				date_default_timezone_set($_COOKIE['client_timezone']);
			} catch (ErrorException $e) {
				date_default_timezone_set('UTC');
			}
		} else
			date_default_timezone_set('UTC');

		DateTime::setFormats([
			'date' => 'd.m.Y',
			'time' => 'H:i',
			'datetime' => 'd.m.Y H:i'
		]);

		$this->app->singleton('timezone', function () { return new DateTimeZone('UTC'); });
	}

	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot() {
		$this->bootDateTime();

		Form::register();
	}

}
