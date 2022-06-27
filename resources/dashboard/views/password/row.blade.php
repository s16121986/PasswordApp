<div class="entity-row password-row" data-id="<?=$password->id?>">
	<div class="entity-data">
		<div class="login"><?=$password->login?></div>
		<div class="password"><?=$password->password?></div>
		<div class="menu">
			<div class="icon"></div>
			<div class="popup">
				<a href="/password/<?=$password->id?>/edit">Изменить</a>
				<hr/>
				<a href="/password/<?=$password->id?>/delete">Удалить</a>
			</div>
		</div>
	</div>
</div>
