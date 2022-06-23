<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Form;

class NoteController extends Controller {

	public function edit(Request $request, Note $note) {
		$data = $request->input();

		if (isset($data['folder_id']) && empty($data['folder_id']))
			$data['folder_id'] = null;

		$note->fill($data);
		$note->save();

		return $note->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Note());
	}

	public function delete(Request $request, Note $note) {
		return ['success' => $note->delete()];
	}

}
