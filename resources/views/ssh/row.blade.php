<div class="entity-row ssh-row" data-id="<?=$ssh->id?>">
	<div class="entity-data">
		<div class="main">
			<div class="name"><?=$ssh->name?></div>
			<div class="ip"><?=$ssh->ip?><?=($ssh->port ? ':' . $ssh->port : '')?></div>
		</div>
		<?=view('default.tags', ['entity' => $ssh])?>
		<div class="note"><?=$ssh->note?></div>
	</div>
	<div class="menu">
		<div class="icon"></div>
		<div class="popup">
			<a href="/ssh/<?=$ssh->id?>/tags">Теги</a>
			<a href="/ssh/<?=$ssh->id?>/edit">Изменить</a>
			<a href="/password/create?entity=ssh&entity_id=<?=$ssh->id?>">Добавить пароль</a>
			<hr/>
			<a href="/ssh/<?=$ssh->id?>/delete">Удалить</a>
		</div>
	</div>
	<div class="entity passwords">
		<h2>Пароли</h2>
		<?php
		$passwords = $ssh->passwords();
		if ($passwords->isEmpty())
			echo '<i class="empty">Пароли отсутствуют</i>';
		else {
			foreach ($passwords as $password) {
				echo view('password.row', ['password' => $password]);
			}
		}
		?>
	</div>
</div>
