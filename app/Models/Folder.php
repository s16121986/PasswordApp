<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model {

	protected $table = 'project_folders';

	protected $fillable = [
		'project_id',
		'folder_id',
		'name',
	];

}
