<?php

namespace App\Http\Controllers;

use App\Models\Email;
use Illuminate\Http\Request;
use Form;

class EmailController extends Controller {

	public function edit(Request $request, Email $email) {
		$data = $request->input();

		if (isset($data['folder_id']) && empty($data['folder_id']))
			$data['folder_id'] = null;

		$email->fill($data);
		$email->save();

		return $email->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Email());
	}

	public function delete(Request $request, Email $email) {
		return ['success' => $email->delete()];
	}

}
