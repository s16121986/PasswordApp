<?php

namespace App\Http\Controllers;

use App\Models\Ssh;
use Illuminate\Http\Request;
use Form;

class SshController extends Controller {

	public function edit(Request $request, Ssh $ssh) {
		$data = $request->input();

		if (isset($data['folder_id']) && empty($data['folder_id']))
			$data['folder_id'] = null;

		$ssh->fill($data);
		$ssh->save();

		return $ssh->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Ssh());
	}

	public function delete(Request $request, Ssh $ssh) {
		return ['success' => $ssh->delete()];
	}

}
