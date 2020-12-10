const CACHE_NAME = 'cache-or-figma';

self.addEventListener('install', event => {
	console.log('The service worker is being installed.');
});

self.addEventListener('fetch', event => {
	if (event.request.method === 'GET' && event.request.url.startsWith('https://api.figma.com')) {
		console.log('The service worker is serving the Figma asset.', event);

		event.respondWith(
			caches
				.open(CACHE_NAME)
				.then(
					cache =>
						console.log('Get Figma asset from cache', event.request.url) ||
						cache.match(event.request).then(match => match || fetch(event.request)),
				),
		);

		event.waitUntil(
			caches
				.open(CACHE_NAME)
				.then(cache =>
					fetch(event.request).then(response =>
						cache
							.put(event.request, response.clone())
							.then(
								() =>
									console.log('Async get Figma asset from network', event.request.url) || response,
							),
					),
				),
		);
	}
});
