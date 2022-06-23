<div class="default-items">
	<?php
	foreach ($items as $item) {
		echo view('site.row', ['site' => $item]);
	}
	?>
</div>
