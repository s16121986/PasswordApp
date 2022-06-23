<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

const ROUTE_ID = '[0-9]+';
const CONTROLLER_NAMESPACE = 'App\Http\Controllers\\';

//Route::match(['get', 'post'], '/login', CONTROLLER_NAMESPACE . 'AuthController@login')->name('login');

//Route::middleware('auth')
//	->group(function () {
Route::get('/', CONTROLLER_NAMESPACE . 'IndexController@index');
/*
$crud = function ($name, $controller, $path = null) {
	if (null === $path)
		$path = '/' . $name;

	if (method_exists($controller, 'index'))
		Route::get($path, [$controller, 'index'])->name($name . '.index');

	if (method_exists($controller, 'view'))
		Route::get($path . '/{id}', [$controller, 'view'])->name($name . '.view');

	Route::match(['get', 'post'], $path . '/create', [$controller, 'create'])->name($name . '.create');

	Route::match(['get', 'post'], $path . '/{id}/edit', [$controller, 'edit'])->name($name . '.edit');

	if (method_exists($controller, 'update'))
		Route::get($path . '/{id}/update', [$controller, 'update'])->name($name . '.update');

	Route::get($path . '/{id}/delete', [$controller, 'delete'])->name($name . '.delete');
};

$crud('project', CONTROLLER_NAMESPACE . 'ProjectController');
$crud('tag', CONTROLLER_NAMESPACE . 'TagController');*/

$projectEntities = [
	'project' => CONTROLLER_NAMESPACE . 'ProjectController',
	'folder' => CONTROLLER_NAMESPACE . 'FolderController',
	'site' => CONTROLLER_NAMESPACE . 'SiteController',
	'ssh' => CONTROLLER_NAMESPACE . 'SshController',
	'email' => CONTROLLER_NAMESPACE . 'EmailController',
	'password' => CONTROLLER_NAMESPACE . 'PasswordController',
	'database' => CONTROLLER_NAMESPACE . 'DatabaseController',
	'note' => CONTROLLER_NAMESPACE . 'NoteController',
];
foreach ($projectEntities as $name => $controller) {
	$path = '/' . $name;

	Route::post($path . '/create', [$controller, 'create'])->name($name . '.create');

	Route::post($path . '/{' . $name . '}/edit', [$controller, 'edit'])->name($name . '.edit');

	//Route::get($path . '/{' . $name . '}/color/{color}', [$controller, 'color'])->name($name . '.color');

	Route::post($path . '/{' . $name . '}/delete', [$controller, 'delete'])->name($name . '.delete');
}
/*
$passwordController = CONTROLLER_NAMESPACE . 'PasswordController';
Route::match(['get', 'post'], '/password/create', [$passwordController, 'create'])->name('password.create');
Route::match(['get', 'post'], '/password/{password}/edit', [$passwordController, 'edit'])->name('password.edit');
Route::get('/password/{password}/delete', [$passwordController, 'delete'])->name('password.delete');
*/
Route::prefix('data')
	->group(function () {
		$controller = CONTROLLER_NAMESPACE . 'DataController';

		Route::get('/', [$controller, 'data']);
		Route::post('/update', [$controller, 'update']);
	});
//	});
/*
//Project routes
Route::get('/project', [ProjectController::class, 'index']);
Route::get('/project/{id}', [ProjectController::class, 'edit'])->where('id', ROUTE_ID);
Route::delete('/project/{id}', [ProjectController::class, 'edit'])->where('id', ROUTE_ID);

//Ssh routes
Route::get('/ssh', [SshController::class, 'index']);
Route::get('/ssh/{id}', [SshController::class, 'edit'])->where('id', ROUTE_ID);
Route::delete('/ssh/{id}', [SshController::class, 'edit'])->where('id', ROUTE_ID);*/
