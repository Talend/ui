import { call } from 'redux-saga/effects';

import http, { httpGet, httpPostOrPut, handleDefaultConfiguration } from '../../src/sagas/http';
import { HTTP_METHODS } from '../../src/middlewares/http/constants';

describe('http module direct accessed methods', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('http.get', () => {
		it(`check that httpGet is called with only an url and empty config object literal
        when http.get is called only with an url`, () => {
			// given
			const url = '/url';
			// when
			const gen = http.get(url);
			// then
			expect(gen.next().value).toEqual(call(httpGet, url, {}));
		});

		it(`check that fetch is called with only an url and default expectedConfig
        when httpGet is called only with an url`, () => {
			// given
			const url = '/url';
			const expectedConfig = {
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};
			// when
			httpGet(url, {});
			// then
			expect(global.fetch.mock.calls[0][0]).toEqual(url);
			expect(global.fetch.mock.calls[0][1]).toEqual(expectedConfig);
		});

		it(`check that httpGet is called with only an url and config object
            when http.get is called with an url and config object`, () => {
			// given
			const url = '/url';
			const config = {
				headers: {
					'Content-Type': 'overloaded nested header',
				},
				credentials: 'overloaded non nested config',
				newConfig: 'newConfig element',
			};
			// when
			const gen = http.get(url, config);
			// then
			expect(gen.next().value).toEqual(call(httpGet, url, config));
		});

		it(`check that fetch is called with only an url and merged config object
        when httpGet is called only with an url and a overloading config object`, () => {
			// given
			const url = '/url';
			const config = {
				headers: {
					'Content-Type': 'overloaded nested header',
				},
				credentials: 'overloaded non nested config',
				newConfig: 'newConfig element',
			};
			const expectedConfig = {
				method: 'GET',
				credentials: 'overloaded non nested config',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'overloaded nested header',
				},
				newConfig: 'newConfig element',
			};
			// when
			httpGet(url, config);
			// then
			expect(global.fetch.mock.calls[0][0]).toEqual(url);
			expect(global.fetch.mock.calls[0][1]).toEqual(expectedConfig);
		});
	});

	describe('http.post', () => {
		it(`check that httpPostOrPut is called with an url, POST method, payload and empty config object 
        when http.post is called only with an url and a payload`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			// when
			const gen = http.post(url, payload);
			// then
			expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.POST, payload, {}));
		});

		it(`check that fetch is called with only an url and a config object containing, POST method, serialized payload and default configuration
		when httpPostOrPut is called only with an url, POST method, payload and empty config object`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			const expectedConfig = {
				method: 'POST',
				credentials: 'same-origin',
				body: '{"payload":"payload"}',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};
			// when
			httpPostOrPut(url, HTTP_METHODS.POST, payload, {});
			// then
			expect(global.fetch.mock.calls[0][0]).toEqual(url);
			expect(global.fetch.mock.calls[0][1]).toEqual(expectedConfig);
		});

		it(`check that httpPostOrPut is called with an url, POST method, payload and config object 
        when http.post is called with an url and a payload and a config object`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			const config = {
				headers: {
					'Content-Type': 'overloaded nested header',
				},
				credentials: 'overloaded non nested config',
				newConfig: 'newConfig element',
			};
			// when
			const gen = http.post(url, payload, config);
			// then
			expect(gen.next().value).toEqual(
				call(httpPostOrPut, url, HTTP_METHODS.POST, payload, config),
			);
		});

		it(`check that fetch is called with only an url and a config object containing, POST method, serialized payload and merged configuration
		when httpPostOrPut is called only with an url, POST method, payload and overloading config object`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			const config = {
				headers: {
					'Content-Type': 'overloaded nested header',
				},
				credentials: 'overloaded non nested config',
				newConfig: 'newConfig element',
			};
			const expectedConfig = {
				method: 'POST',
				credentials: 'overloaded non nested config',
				body: '{"payload":"payload"}',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'overloaded nested header',
				},
				newConfig: 'newConfig element',
			};
			// when
			httpPostOrPut(url, HTTP_METHODS.POST, payload, config);
			// then
			expect(global.fetch.mock.calls[0][0]).toEqual(url);
			expect(global.fetch.mock.calls[0][1]).toEqual(expectedConfig);
		});
	});

	describe('http.put', () => {
		it(`check that httpPostOrPut is called with an url, PUT method, payload and empty config object 
        when http.put is called only with an url and a payload`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			// when
			const gen = http.put(url, payload);
			// then
			expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, {}));
		});

		it(`check that fetch is called with only an url and a config object containing, PUT method, serialized payload and default configuration
		when httpPostOrPut is called only with an url, PUT method, payload and empty config object`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			const expectedConfig = {
				method: 'PUT',
				credentials: 'same-origin',
				body: '{"payload":"payload"}',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};
			// when
			httpPostOrPut(url, HTTP_METHODS.PUT, payload, {});
			// then
			expect(global.fetch.mock.calls[0][0]).toEqual(url);
			expect(global.fetch.mock.calls[0][1]).toEqual(expectedConfig);
		});

		it(`check that httpPostOrPut is called with an url, PUT method, payload and config object 
        when http.put is called with an url and a payload and a config object`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			const config = {
				headers: {
					'Content-Type': 'overloaded nested header',
				},
				credentials: 'overloaded non nested config',
				newConfig: 'newConfig element',
			};
			// when
			const gen = http.put(url, payload, config);
			// then
			expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, config));
		});

		it(`check that fetch is called with only an url and a config object containing, PUT method, serialized payload and merged configuration
		when httpPostOrPut is called only with an url, PUT method, payload and overloading config object`, () => {
			// given
			const url = '/url';
			const payload = { payload: 'payload' };
			const config = {
				headers: {
					'Content-Type': 'overloaded nested header',
				},
				credentials: 'overloaded non nested config',
				newConfig: 'newConfig element',
			};
			const expectedConfig = {
				method: 'PUT',
				credentials: 'overloaded non nested config',
				body: '{"payload":"payload"}',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'overloaded nested header',
				},
				newConfig: 'newConfig element',
			};
			// when
			httpPostOrPut(url, HTTP_METHODS.PUT, payload, config);
			// then
			expect(global.fetch.mock.calls[0][0]).toEqual(url);
			expect(global.fetch.mock.calls[0][1]).toEqual(expectedConfig);
		});
	});
});

describe('http module with instance created', () => {
	it(`check that httpGet is called with only an url and empty config object literal
    when http.get is called only with an url`, () => {
		// given
		const url = '/url';
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, {}));
	});

	it(`check that httpGet is called with only an url and config object
    when http.get is called with an url and config object`, () => {
		// given
		const url = '/url';
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url, config);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, config));
	});

	it(`check that httpPostOrPut is called with an url, POST method, payload and empty config object 
    when http.post is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload);
		// then
		expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.POST, payload, {}));
	});

	it(`check that httpPostOrPut is called with an url, POST method, payload and config object 
        when http.post is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload, config);
		// then
		expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.POST, payload, config));
	});

	it(`check that httpPostOrPut is called with an url, PUT method, payload and empty config object 
        when http.put is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload);
		// then
		expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, {}));
	});

	it(`check that httpPostOrPut is called with an url, PUT method, payload and config object 
        when http.put is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, config);
		// then
		expect(gen.next().value).toEqual(call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, config));
	});
});

describe('http module with instance created with no CSRF handling configuration', () => {
	const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';

	beforeEach(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterEach(() => {
		delete document.cookie;
	});

	it(`check that httpGet is called with only an url and empty config object literal
    when http.get is called only with an url`, () => {
		// given
		const url = '/url';
		const expectedConfig = {
			headers: {
				'X-CSRF-Token': CSRFToken,
			},
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpGet is called with only an url and config object
    when http.get is called with an url and config object`, () => {
		// given
		const url = '/url';
		const config = {
			headers: {
				'Content-Type': 'TEST',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'TEST',
				'X-CSRF-Token': CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url, config);
		// then
		const value = gen.next().value;
		handleDefaultConfiguration({}, config);
		expect(value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpPostOrPut is called with an url, POST method, payload and empty config object 
    when http.post is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const expectedConfig = {
			headers: {
				'X-CSRF-Token': CSRFToken,
			},
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.POST, payload, expectedConfig),
		);
	});

	it(`check that httpPostOrPut is called with an url, POST method, payload and config object 
        when http.post is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				'X-CSRF-Token': CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.POST, payload, expectedConfig),
		);
	});

	it(`check that httpPostOrPut is called with an url, PUT method, payload and empty config object 
        when http.put is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const expectedConfig = {
			headers: {
				'X-CSRF-Token': CSRFToken,
			},
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, {});
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, expectedConfig),
		);
	});

	it(`check that httpPostOrPut is called with an url, PUT method, payload and config object 
        when http.put is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				'X-CSRF-Token': CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, expectedConfig),
		);
	});
});

describe('http module with instance created with CSRF handling configuration', () => {
	const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';
	const defaultHttpConfiguration = {
		security: {
			CSRFTokenCookieKey: 'customCookieKey',
			CSRFTokenHeaderKey: 'customHeaderKey',
		},
	};

	beforeEach(() => {
		document.cookie = `customCookieKey=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterEach(() => {
		delete document.cookie;
	});

	it(`check that httpGet is called with only an url and empty config object literal
    when http.get is called only with an url`, () => {
		// given
		const url = '/url';
		const expectedConfig = {
			headers: {
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.get(url);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpGet is called with only an url and config object
    when http.get is called with an url and config object`, () => {
		// given
		const url = '/url';
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.get(url, config);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpPostOrPut is called with an url, POST method, payload and empty config object 
    when http.post is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create(defaultHttpConfiguration);
		const expectedConfig = {
			headers: {
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
		};
		// when
		const gen = httpInstance.post(url, payload);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.POST, payload, expectedConfig),
		);
	});

	it(`check that httpPostOrPut is called with an url, POST method, payload and config object 
        when http.post is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.post(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.POST, payload, expectedConfig),
		);
	});

	it(`check that httpPostOrPut is called with an url, PUT method, payload and empty config object 
        when http.put is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create(defaultHttpConfiguration);
		const expectedConfig = {
			headers: {
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
		};
		// when
		const gen = httpInstance.put(url, payload);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, expectedConfig),
		);
	});

	it(`check that httpPostOrPut is called with an url, PUT method, payload and config object 
        when http.put is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.put(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPostOrPut, url, HTTP_METHODS.PUT, payload, expectedConfig),
		);
	});
});

describe('handleDefaultConfiguration', () => {});
