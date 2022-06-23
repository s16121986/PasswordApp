<?php

namespace App\Models;

use App\Models\Concerns\HasPasswords;
use Illuminate\Database\Eloquent\Model;

class Site extends Model {

	use HasPasswords;

	protected $table = 'project_sites';

	protected $fillable = [
		'project_id',
		'folder_id',
		//'index',
		//'color',
		'name',
		'url'
	];

}
