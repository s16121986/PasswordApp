<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProjectController extends Controller {

	public function edit(Request $request, Project $project) {
		$data = $request->input();

		if (!$project->id)
			$data['user_id'] = 1;

		$project->fill($data);
		$project->save();

		return $project->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Project());
	}

	public function delete(Request $request, Project $project) {
		return ['success' => $project->delete()];
	}

}
