<div class="default-items">
<?php
foreach ($items as $item) {
	echo view('ssh.row', ['ssh' => $item]);
}
?>
</div>
