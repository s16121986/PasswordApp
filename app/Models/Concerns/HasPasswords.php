<?php

namespace App\Models\Concerns;

use App\Models\Password;

trait HasPasswords {

	public function passwords() {
		return Password::where('entity', $this::class)
			->where('entity_id', $this->id)
			->get();
	}

}
