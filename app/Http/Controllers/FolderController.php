<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Form;

class FolderController extends Controller {

	public function edit(Request $request, Folder $folder) {
		$data = $request->input();

		if (isset($data['folder_id']) && empty($data['folder_id']))
			$data['folder_id'] = null;

		$folder->fill($data);
		$folder->save();

		return $folder->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Folder());
	}

	public function delete(Request $request, Folder $folder) {
		return ['success' => $folder->delete()];
	}

}
