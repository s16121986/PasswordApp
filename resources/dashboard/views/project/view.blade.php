<?php
$colors = app_colors();
$colorsNav = function ($path) use ($colors) {
	$html = '';
	foreach ($colors as $color => $name) {
		$html .= '<a href="' . $path . '/color/' . $color . '" class="color ' . $color . '">' . $name . '</a>';
	}
	return $html;
};
$passwords = function ($entity, $s = '') {
	$passwords = $entity->passwords();
	if ($passwords->isEmpty())
		return '';

	$html = '<div class="item-body passwords">';
	foreach ($passwords as $password) {
		$html .= '<div class="password-item">';
		$html .= $s;
		$html .= '<div class="name x-copy">' . $password->login . '</div>';
		$html .= '<div class="btn-password" title="' . $password->password . '" data-password="' . $password->password . '"></div>';
		$html .= '<div class="spacer"></div>';
		$html .= '<div class="actions-menu">';
		$html .= '<div class="icon"></div>';
		$html .= '<div class="popup">';
		$html .= '<a href="/password/' . $password->id . '/edit" class="edit">Изменить</a>';
		$html .= '<a href="/password/' . $password->id . '/delete" class="delete">Удалить</a>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
	}
	$html .= '</div>';

	return $html;
};
?>
<div class="project-view" id="project-view">
	<div class="h1-wrap">
		<h1><?=$project->name?></h1>
		<div class="actions-menu">
			<div class="icon"></div>
			<div class="popup">
				<a href="/project/<?=$project->id?>/site/create" class="site">Добавить сайт</a>
				<a href="/project/<?=$project->id?>/ssh/create" class="ssh">Добавить ssh</a>
				<a href="/project/<?=$project->id?>/database/create" class="database">Добавить базу данных</a>
				<a href="/project/<?=$project->id?>/email/create" class="email">Добавить email</a>
				<a href="/project/<?=$project->id?>/note/create" class="note">Добавить заметку</a>
				<hr/>
				<a href="/project/<?=$project->id?>/edit" class="edit">Изменить</a>
				<hr/>
				<a href="/project/<?=$project->id?>/delete" class="delete">Удалить</a>
			</div>
		</div>
	</div>

	<div class="ui-tags"><?php foreach ($project->tags() as $tag) { ?>
		<div class="tag"><?=$tag->text?></div>
		<?php } ?></div>

	<?php if (!$sites->isEmpty()) { ?>
	<div class="data-items data-sites">
		<h2>Сайты</h2>
		<div class="items">
			<?php foreach ($sites as $site) { ?>
			<div data-id="<?=$site->id?>" class="item color-<?=$site->color?> site-item">
				<div class="head">
					<div class="name"><?=$site->name?></div>
					<a href="<?=$site->url?>" target="_blank"></a>
				</div>
				<?=$passwords($site)?>
			</div>
			<?php } ?>
		</div>
	</div>
	<?php } ?>

	<?php if (!$emails->isEmpty()) { ?>
	<div class="data-items data-emails">
		<h2>Электронная почта</h2>
		<div class="items">
			<?php foreach ($emails as $email) { ?>
			<div data-id="<?=$email->id?>" class="item email-item">
				<div class="head">
					<div class="name x-copy"><?=$email->email?></div>
					<div class="btn-password" data-password="<?=$email->password?>"></div>
				</div>
			</div>
			<?php } ?>
		</div>
	</div>
	<?php } ?>

	<?php if (!$ssh->isEmpty()) { ?>
	<div class="data-items data-ssh">
		<h2>SSH</h2>
		<div class="items">
			<?php foreach ($ssh as $s) { ?>
			<div data-id="<?=$s->id?>" class="item ssh-item">
				<div class="head">
					<div class="name"><?=$s->name?></div>
				</div>
				<?=$passwords($s, '<div class="ip x-copy">' . ($s->ip . ($s->port ? ':' . $s->port : '')) . '</div>')?>
			</div>
			<?php } ?>
		</div>
	</div>
	<?php } ?>

	<?php if (!$notes->isEmpty()) { ?>
	<div class="data-items data-notes">
		<h2>Заметки</h2>
		<div class="items">
			<?php foreach ($notes as $note) { ?>
			<div data-id="<?=$note->id?>" class="item note-item">
				<div class="head">
					<div class="name"><?=$note->name?></div>
				</div>
				<div class="item-body"><?=$note->text?></div>
			</div>
			<?php } ?>
		</div>
	</div>
	<?php } ?>
</div>
