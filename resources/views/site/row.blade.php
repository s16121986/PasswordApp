<div class="entity-row site-row" data-id="<?=$site->id?>">
	<div class="entity-data">
		<a href="<?=$site->url?>"><?=$site->name?></a>
		<?=view('default.tags', ['entity' => $site])?>
		<div class="note"><?=$site->note?></div>
	</div>
	<div class="menu">
		<div class="icon"></div>
		<div class="popup">
			<a href="/ssh/<?=$site->id?>/tags">Теги</a>
			<a href="/ssh/<?=$site->id?>/edit">Изменить</a>
			<a href="/password/create?entity=site&entity_id=<?=$site->id?>">Добавить пароль</a>
			<hr/>
			<a href="/ssh/<?=$site->id?>/delete">Удалить</a>
		</div>
	</div>

	<?php
	$ssh = $site->ssh();
	if (!$ssh->isEmpty()) { ?>

	<div class="entity ssh">
		<h2>View</h2>
		<?php
		foreach ($ssh as $s) {
			echo view('ssh.row', ['ssh' => $s]);
		}
		?>
	</div>
	<?php } ?>

	<?php
	$passwords = $site->passwords();
	if (!$passwords->isEmpty()) { ?>
	<div class="entity passwords">
		<h2>Пароли</h2>
		<?php
		foreach ($passwords as $password) {
			echo view('password.row', ['password' => $password]);
		}
		?>
	</div>
	<?php } ?>

</div>
