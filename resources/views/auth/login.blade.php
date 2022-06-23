<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<?= $meta->head; ?>
<body class="antialiased">

<section class="content">
	<form method="post" class="auth-form" data-title="Вход на сайт" data-cls="window-auth">
		@csrf
		<?= $form->report() . $form->render(); ?>
		<div class="form-buttons">
			<button type="submit" class="btn btn-submit">Войти</button>
		</div>
	</form>
</section>

</body>
</html>
