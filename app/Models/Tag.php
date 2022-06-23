<?php

namespace App\Models\Password;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model {

	protected $table = 'tags';

	protected $attributes = [
		'hidden' => false
	];

	protected $fillable = ['text', 'index', 'hidden'];

	protected $casts = [
		'index' => 'number',
		'text' => 'string',
		'hidden' => 'boolean'
	];

}
