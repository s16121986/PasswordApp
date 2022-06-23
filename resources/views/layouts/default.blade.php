<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<?= $meta->head; ?>
<body class="antialiased">
<aside class="sidebar">
	<section class="head">
		<div class="avatar"><img src="/images/default-user.png"/></div>
		<div class="search"><input type="text"/></div>
	</section>
	<section class="menu">
		<h2>Теги</h2>
		<nav>
			<a href="/site">Сайты</a>
			<a href="/email">Site</a>
			<a href="/ssh">View</a>
			<a href="/password">Пароли</a>
			<a href="/tags">Теги</a>
			<a href="/note">Заметки</a>
		</nav>
		<h2>Проекты</h2>
		<nav>
			<a href="/project">Проекты</a>
			<a href="/project">Site</a>
			<a href="/project">View</a>
			<a href="/project">Заметки</a>
		</nav>
	</section>
	<section class="settings">

	</section>
</aside>
<section class="content"><?= $content ?></section>
</body>
</html>
