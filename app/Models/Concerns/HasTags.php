<?php

namespace App\Models\Concerns;

use App\Models\Tag;
use Illuminate\Support\Facades\DB;

trait HasTags {

	public function tags() {
		return Tag::whereExists(function ($query) {
			$query->select(DB::raw(1))
				->from('tag_relations as t')
				->whereColumn('t.tag_id', 'tags.id')
				->where('t.entity', $this::class)
				->where('t.entity_id', $this->id);
		})->get();
	}

	public function hasTag() {

	}

	public function setTagsAttribute($tags) {

	}

	public static function scopeWhereTag($query, $tag) {
		$query->whereExists(function ($query) use ($tag) {
			$query->select(DB::raw(1))
				->from('tag_relations as t')
				->whereColumn('t.entity_id', $this->getTable() . '.id')
				->where('t.entity', $this::class)
				->where('t.tag_id', $tag->id);
		});
	}

	public static function scopeWhereTags($query, $tags) {
		foreach ($tags as $tag) {
			static::scopeWhereTag($query, $tag);
		}
	}

	public static function scopeWhereFavorite($query) {

	}

}
