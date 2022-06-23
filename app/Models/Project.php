<?php

namespace App\Models;

use App\Models\Concerns\HasTags;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Project extends Model {

	use SoftDeletes, HasTags;

	protected $table = 'projects';

	protected $fillable = [
		'user_id',
		'name',
		'favorite'
	];

	public function ssh() {
		return $this->hasMany(Ssh::class)->orderBy('index')->get();
	}

	public function emails() {
		return $this->hasMany(Email::class)->orderBy('index')->get();
	}

	public function sites() {
		return $this->hasMany(Site::class)->orderBy('index')->get();
	}

	public function notes() {
		return $this->hasMany(Note::class)->orderBy('index')->get();
	}

	public function tags() {
		return Tag::whereExists(function ($query) {
			$query->select(DB::raw(1))
				->from('project_tags as t')
				->whereColumn('t.tag_id', 'tags.id')
				->where('t.project_id', $this->id);
		})->get();
	}

	public function hasTag() {

	}

	public function setTagsAttribute($tags) {

	}

	public static function scopeWhereTag($query, $tag) {
		$query->whereExists(function ($query) use ($tag) {
			$query->select(DB::raw(1))
				->from('project_tags as t')
				->whereColumn('t.project_id', 'projects.id')
				->where('t.tag_id', $tag->id);
		});
	}

}
