<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model {

	protected $table = 'project_notes';

	protected $fillable = [
		'project_id',
		'folder_id',
		//'index',
		//'color',
		'name',
		'text'
	];

}
