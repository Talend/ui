const CACHE_NAME = 'cache-or-figma';

const FIGMA_BASEURL = 'https://api.figma.com';

self.addEventListener('fetch', event => {
	if (event.request.method === 'GET' && event.request.url.startsWith(FIGMA_BASEURL)) {
		// eslint-disable-next-line no-console
		console.info(`[${CACHE_NAME}] The service worker is serving the Figma assets`, event);

		event.respondWith(
			caches.open(CACHE_NAME).then(
				cache =>
					// eslint-disable-next-line no-console
					console.debug(`[${CACHE_NAME}] Get Figma asset from cache`, event.request.url) ||
					cache.match(event.request).then(match => match || fetch(event.request)),
			),
		);

		event.waitUntil(
			caches.open(CACHE_NAME).then(cache =>
				fetch(event.request).then(response =>
					cache.put(event.request, response.clone()).then(
						() =>
							// eslint-disable-next-line no-console
							console.debug(
								`[${CACHE_NAME}] Async get Figma assets from network`,
								event.request.url,
							) || response,
					),
				),
			),
		);
	}
});
