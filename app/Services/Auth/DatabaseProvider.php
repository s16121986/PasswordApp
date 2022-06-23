<?php
// app/Extensions/MongoUserProvider.php
namespace App\Services\Auth;

use App\Models\Administrator\Administrator;
use App\Models\User\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\UserProvider as BaseProvider;
use Illuminate\Contracts\Auth\Authenticatable;

class DatabaseProvider implements BaseProvider {

	private static $salt;
	private Authenticatable $model;

	public function __construct(string $userModel) {
		$class = '\\' . $userModel;
		$this->model = new $class;
	}

	/**
	 * Retrieve a user by the given credentials.
	 *
	 * @param array $credentials
	 * @return \Illuminate\Contracts\Auth\Authenticatable|null
	 */
	public function retrieveByCredentials(array $credentials) {
		if (!isset($credentials['login']) || !isset($credentials['password']))
			return;

		return $this->model->query()
			->whereLogin($credentials['login'])
			->where('password', self::passwordHash($credentials['password']))
			->where('status', 1)
			->first();
	}

	/**
	 * Validate a user against the given credentials.
	 *
	 * @param \Illuminate\Contracts\Auth\Authenticatable $user
	 * @param array $credentials Request credentials
	 * @return bool
	 */
	public function validateCredentials(Authenticatable $user, array $credentials) {
		return ($credentials['login'] === $user->login &&
			self::passwordHash($credentials['password']) === $user->getAuthPassword());
	}

	public function retrieveById($identifier) {
		return $this->model->query()
			->where('id', '=', $identifier)
			->first();
	}

	public function retrieveByToken($identifier, $token) {
		return $this->model->query()
			->where('id', '=', $identifier)
			->where($this->model->getRememberTokenName(), $token)
			->first();
	}

	public function updateRememberToken(Authenticatable $user, $token) {
		$currentToken = $user->getRememberToken();
		if ($currentToken === $token)
			return;

		$user->setRememberToken($token);
		$user->save();
	}

	public function logout() {
		if (!Auth::check())
			return false;

		$user = Auth::user();
		$user->setRememberToken(null);
		$user->save();

		Auth::logout();

		return true;
	}

	public static function passwordHash($password): string {
		return md5($password . env('PASSWORD_SALT'));
	}

}
