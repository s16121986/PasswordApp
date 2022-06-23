<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Form;

class SiteController extends Controller {

	public static function model(): string {
		return Site::class;
	}

	public function edit(Request $request, Site $site) {
		$data = $request->input();

		if (isset($data['folder_id']) && empty($data['folder_id']))
			$data['folder_id'] = null;

		$site->fill($data);
		$site->save();

		return $site->toArray();
	}

	public function create(Request $request) {
		return $this->edit($request, new Site());
	}

	public function delete(Request $request, Site $site) {
		return ['success' => $site->delete()];
	}

}
