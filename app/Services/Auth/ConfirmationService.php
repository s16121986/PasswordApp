<?php

namespace App\Services\Auth;

use App\Services\SMS\Notification;
use Session;

class ConfirmationService {

	const LIFETIME = 60;
	const SESSION_NAME = 'confirmation';

	private array $data = [];

	public function __construct($login = null) {
		if ($login)
			$this->instance($login);
	}

	public function __get($name) {
		switch ($name) {
			case 'lifetime':
				return $this->time > 0 ? self::LIFETIME - (time() - $this->time) : 0;
		}
		return isset($this->data[$name]) ? $this->data[$name] : null;
	}

	public function instance($login): bool {
		if (!Session::has(self::SESSION_NAME))
			return false;

		$data = Session::get(self::SESSION_NAME);
		if ($data['login'] !== $login)
			return false;

		$this->data = $data;

		return true;
	}

	public function create($login) {
		$this->data = [
			'login' => $login,
			'time' => time(),
			'count' => 3,
			'confirmed' => false
		];
		return $this->regenerate();
	}

	public function regenerate(): bool {
		$code = (string)rand(1000, 9999);

		if (!$this->sendCode($code))
			return false;

		$this->data['code'] = $code;
		$this->data['time'] = time();
		$this->data['count'] = 3;
		$this->data['confirmed'] = false;

		$this->store();

		return true;
	}

	public function tryCode($code): bool {
		if ($this->code === $code) {
			$this->data['confirmed'] = true;
			$this->store();
			return true;
		} else if ($this->isConfirmed())
			return false;

		$this->data['count']--;
		$this->store();

		return false;
	}

	public function isExpired(): bool {
		return (time() - $this->time) > self::LIFETIME;
	}

	public function hasTries(): bool {
		return $this->count > 0;
	}

	public function isConfirmed(): bool {
		return (bool)$this->confirmed;
	}

	public function isEmpty(): bool {
		return empty($this->data);
	}

	public function isValid() {
		return !$this->isEmpty() && !$this->isExpired() && $this->hasTries();
	}

	public function store() {
		Session::put(self::SESSION_NAME, $this->data);
	}

	public function reset() {
		Session::forget(self::SESSION_NAME);
	}

	private function sendCode($code) {
		if (false === strpos($this->login, '@')) {
			$response = Notification::message()
				->to($this->login)
				->text(sprintf('Код подтверждения: %s', $code))
				->send();

			return $response->isSent();
		} else {
			//send email
		}

		return true;
	}

}
