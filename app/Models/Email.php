<?php

namespace App\Models;

use App\Models\Concerns\HasTags;
use Illuminate\Database\Eloquent\Model;

class Email extends Model {

	protected $table = 'project_emails';

	protected $fillable = [
		'project_id',
		'folder_id',
		//'index',
		//'color',
		'email',
		'password',
		//'note'
	];

}
