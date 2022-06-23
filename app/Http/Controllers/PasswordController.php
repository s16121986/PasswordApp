<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;
use Form;

class PasswordController extends Controller {

	public function edit(Request $request, Password $project) {
		$data = $request->input();

		$project->fill($data);
		$project->save();

		return $project->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Password());
	}

	public function delete(Request $request, Password $password) {
		return ['success' => $password->delete()];
	}

}
