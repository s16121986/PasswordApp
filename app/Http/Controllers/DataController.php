<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\Folder;
use App\Models\Note;
use App\Models\Project;
use App\Models\Ssh;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Form;

class DataController extends Controller {

	public function data() {
		$userId = 1;
		$data = [
			'projects' => Project::where('user_id', $userId)->get()->toArray()
		];

		$projectEntities = function ($cls) use ($userId) {
			return $cls::whereExists(function ($query) use ($cls, $userId) {
				$query->select(DB::raw(1))
					->from('projects as t')
					->whereColumn('t.id', with(new $cls)->getTable() . '.project_id')
					->where('t.user_id', $userId);
			})->get();
		};

		$data['folders'] = $projectEntities(Folder::class)->toArray();
		$data['emails'] = $projectEntities(Email::class)->toArray();
		$data['sites'] = $projectEntities(Site::class)->map([static::class, 'mapPasswords']);
		$data['ssh'] = $projectEntities(Ssh::class)->map([static::class, 'mapPasswords']);
		$data['notes'] = $projectEntities(Note::class)->toArray();
		$data['favorites'] = DB::table('favorites')->get();
		//$data['tags'] = DB::table('tags')->get();

		/*foreach ($q->cursor() as $project) {
			$p = $project->toArray();

			$p['folders'] = Folder::where('project_id', $project->id)->get()->toArray();
			$p['emails'] = Email::where('project_id', $project->id)->get()->toArray();
			$p['sites'] = Site::where('project_id', $project->id)->get()->map([static::class, 'mapPasswords']);
			$p['ssh'] = Ssh::where('project_id', $project->id)->get()->map([static::class, 'mapPasswords']);
			$p['notes'] = Note::where('project_id', $project->id)->get()->toArray();

			$projects[] = $p;
		}*/

		return $data;
	}

	public static function mapPasswords($entity) {
		$data = $entity->toArray();
		$data['passwords'] = $entity->passwords()->toArray();

		return $data;
	}

}
