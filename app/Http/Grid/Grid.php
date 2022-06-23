<?php

namespace App\Http\Grid;

use Grid as BaseGrid;

class Grid extends BaseGrid {

	protected $quicksearch;

	protected $search;

	public static function register() {
		self::registerNamespace(__NAMESPACE__ . '\\Column');
	}

	public function __construct($options = []) {
		parent::__construct(array_merge([
			'emptyGridText' => 'Список пуст'
		], $options));
	}

	public function __get(string $name) {
		return match ($name) {
			'quicksearch' => $this->quicksearch,
			'search' => $this->search,
			default => parent::__get($name)
		};
	}

	public function quicksearch(): static {
		$this->quicksearch = new Quicksearch(['method' => 'GET']);
		$this->quicksearch->addElement('quicksearch', 'text', ['placeholder' => 'Быстрый поиск', 'autocomplete' => false]);
		$this->quicksearch->submit();
		return $this;
	}

	public function search($form) {
		$this->search = $form;
		$this->search->submit();
		return $this;
	}

	public function query($query = null) {
		if (null === $query)
			return $this->data->getData();

		return $this->setData($query);
	}

	public function addColumn($column, $type = 'text', array $options = []): static {
		switch ($column) {
			case 'id':
				return $this->addColumnId(is_array($type) ? $type : $options);
			case 'view':
				return $this->addColumnView();
			case 'edit':
				return $this->addColumnEdit();
			case 'language':
				return $this->addColumnLanguage();
			case 'created':
				return $this->addColumnCreated();
		}

		return parent::addColumn($column, $type, $options);
	}

	public function addColumnId(array $options = []) {
		return parent::addColumn('id', 'number', array_merge([
			'text' => 'ID',
			'order' => true,
			'format' => 'ND=8;NFD=2;NDS=,;NGS=;NLZ=1'
		], $options));
	}

	public function addColumnEdit($routeName = null) {
		if (null === $routeName)
			$routeName = str_replace('.index', '', request()->route()->getName());

		$permission = $routeName . '.edit';

		return parent::addColumn('edit', 'text', [
			'text' => '',
			'renderer' => function ($row) use ($permission) {
				return '<a href="' . route($permission, ['id' => $row->id]) . '" class="icon-edit" title="Редактировать"></a>';
			}
		]);
	}

	public function addColumnLanguage() {
		return parent::addColumn('language', 'text', [
			'text' => 'Язык',
			'renderer' => function ($row) {
				return '<img src="/images/flag/' . $row->language . '.svg" width="16px" />';
			}
		]);
	}

	public function addColumnCreated() {
		return parent::addColumn('created', 'date', [
			'text' => 'Дата создания',
			'order' => true,
			'format' => 'datetime'
		]);
	}

}
