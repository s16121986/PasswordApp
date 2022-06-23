const MAX_AGE = 86400000;
const CACHE_NAME = 'app_serviceworker_v_1';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/',
	'/css/dashboard.css',
	'/js/dashboard.js'
];

self.addEventListener('install', function (event) {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME).then(function (cache) {
			// загружаем в наш cache необходимые файлы
			console.log(cache)
			return cache.addAll(cacheUrls);
		})
	);
});

self.addEventListener('activate', function (event) {
	// активация
	console.log('activate', event);
});

self.addEventListener('fetch', function (event) {
	console.log(event)
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function (cachedResponse) {
			let lastModified, fetchRequest;
console.log(cachedResponse)
			// если ресурс есть в кэше
			if (cachedResponse) {
				// получаем дату последнего обновления
				lastModified = new Date(cachedResponse.headers.get('last-modified'));
				// и если мы считаем ресурс устаревшим
				if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {

					fetchRequest = event.request.clone();
					// создаём новый запрос
					return fetch(fetchRequest).then(function (response) {
						// при неудаче всегда можно выдать ресурс из кэша
						if (!response || response.status !== 200) {
							return cachedResponse;
						}
						// обновляем кэш
						caches.open(CACHE_NAME).then(function (cache) {
							cache.put(event.request, response.clone());
						});
						// возвращаем свежий ресурс
						return response;
					}).catch(function () {
						return cachedResponse;
					});
				}
				return cachedResponse;
			}

			// запрашиваем из сети как обычно
			return fetch(event.request);
		})
	);
});
