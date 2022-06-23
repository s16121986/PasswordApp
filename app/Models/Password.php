<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Password extends Model {

	protected $table = 'project_passwords';

	protected $fillable = [
		'entity',
		'entity_id',
		'login',
		'password',
		'note'
	];

}
