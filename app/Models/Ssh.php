<?php

namespace App\Models;

use App\Models\Concerns\HasPasswords;
use Illuminate\Database\Eloquent\Model;

class Ssh extends Model {

	use HasPasswords;

	protected $table = 'project_ssh';

	protected $fillable = [
		'project_id',
		'folder_id',
		//'index',
		//'color',
		'name',
		'ip',
		'port',
		//'username',
		//'password',
		//'note'
	];

}
