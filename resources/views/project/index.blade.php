<div class="projects-list">
	<?php foreach ($projects as $project) { ?>
	<a href="/project/<?=$project->id?>"><?=$project->name?></a>
	<?php } ?>
	<a href="/project/create">Новый проект</a>
</div>
