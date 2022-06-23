<?php
$tags = $entity->tags();
if ($tags->isEmpty())
	return '';
?>
<div class="tags">
	<?php foreach ($tags as $tag) { ?>
	<div class="tag" data-id="<?=$tag->id?>"><?=$tag->text?></div>
	<?php } ?>
</div>
