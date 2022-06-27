<div class="content-default">
	<div class="content-title">
		<?=$layout->breadcrumbs?>
		<div class="h1-wrap">
			<h1><?=$title?></h1>
			<?=$layout->menu('h1')?>
			<div class="spacer"></div>
		</div>
	</div>

	<form method="post" class="default-form">
		<div class="card card-form">
			<div class="card-body">
				<?= isset($description) ? '<p>' . $description . '</p>' : '' ?>
				<?= $form->report() ?>
				<div class="fields-wrap"><?= $form->render() ?></div>

			</div>
		</div>
		<div class="form-buttons">
			<a  class="btn btn-submit">Отмена</a>
			<?php if (isset($new) && $new) { ?>
			<button type="submit" class="btn btn-submit">Создать</button>
			<?php } else { ?>
			<button type="submit" class="btn btn-submit">Сохранить</button>
			<?php } ?>
		</div>
	</form>
</div>
