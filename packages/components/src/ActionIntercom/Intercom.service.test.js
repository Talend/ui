import IntercomService from './Intercom.service';

describe('Intercom service', () => {
	let scriptContainer;
	let intercomContainer;

	beforeEach(() => {
		scriptContainer = document.createElement('script');
		intercomContainer = document.createElement('div');
		intercomContainer.setAttribute('id', 'intercom-container');
		document.body.appendChild(scriptContainer);
		document.body.appendChild(intercomContainer);
	});

	afterEach(() => {
		document.body.removeChild(scriptContainer);
		document.body.removeChild(intercomContainer);
		delete window.Intercom;
	});

	describe('boot', () => {
		it('should insert intercom script and create intercom function', () => {
			// given
			const appId = 'a123def';
			const scriptUrl = `https://widget.intercom.io/widget/${appId}`;
			expect(document.querySelector(`script[src="${scriptUrl}"]`)).toBeFalsy();
			expect(window.Intercom).toBeFalsy();

			// when
			IntercomService.boot('#widgetId', { app_id: appId });

			// then
			expect(document.querySelector(`script[src="${scriptUrl}"]`)).toBeTruthy();
			expect(window.Intercom).toBeTruthy();
		});

		it('should update config when it is already initialized', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();
			const newConfig = { app_id: 'lol' };

			// when
			IntercomService.boot('#widgetId', newConfig);

			// then
			expect(window.Intercom).toBeCalledWith('reattach_activator');
			expect(window.Intercom).toBeCalledWith('update', newConfig);
		});

		it('should boot with config', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();
			const newConfig = { app_id: 'lol' };

			// when
			IntercomService.boot('#widgetId', newConfig);

			// then
			expect(window.Intercom).toBeCalledWith('boot', {
				app_id: 'lol',
				widget: { activator: '#widgetId' },
				hide_default_launcher: true,
			});
		});
	});

	describe('update', () => {
		it('should update config', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();
			const config = { app_id: 'lol' };

			// when
			IntercomService.update(config);

			// then
			expect(window.Intercom).toBeCalledWith('update', config);
		});
	});

	describe('update', () => {
		it('should update config', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();
			const config = { app_id: 'lol' };

			// when
			IntercomService.update(config);

			// then
			expect(window.Intercom).toBeCalledWith('update', config);
		});
	});

	describe('shutdown', () => {
		it('should shutdown', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();

			// when
			IntercomService.shutdown();

			// then
			expect(window.Intercom).toBeCalledWith('shutdown');
		});
	});

	describe('onHide', () => {
		it('should register callback', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();
			function onHideCallback() {}

			// when
			IntercomService.onHide(onHideCallback);

			// then
			expect(window.Intercom).toBeCalledWith('onHide', onHideCallback);
		});
	});

	describe('onShow', () => {
		it('should register callback', () => {
			// given
			IntercomService.boot('#widgetId', { app_id: 'a123def' });
			window.Intercom = jest.fn();
			function onShowCallback() {}

			// when
			IntercomService.onShow(onShowCallback);

			// then
		});
	});

	describe('setPosition', () => {
		it('should center messenger on trigger element', () => {
			// given
			jest.useFakeTimers();
			const triggerElement = {
				getBoundingClientRect: () => ({
					bottom: 39,
					left: 600,
					right: 630,
				}),
			};

			// when
			IntercomService.setPosition(triggerElement);
			jest.runAllTimers();

			// then
			const styleElement = intercomContainer.querySelector('style');
			expect(styleElement.textContent.trim().replace(/\s/g, ' ')).toBe(
				'.intercom-namespace .intercom-app div.intercom-messenger-frame {     top: 39px;     left: 427px;     right: 221px;     margin-top: 2rem;    }',
			);
		});

		it('should remove custom style with cleanup return function', () => {
			// given
			jest.useFakeTimers();
			const triggerElement = {
				getBoundingClientRect: () => ({
					bottom: 39,
					left: 600,
					right: 630,
				}),
			};
			const cleanUp = IntercomService.setPosition(triggerElement);
			jest.runAllTimers();
			expect(intercomContainer.querySelector('style')).toBeTruthy();

			// when
			cleanUp();
			jest.runAllTimers();

			// then
			expect(intercomContainer.querySelector('style')).toBeFalsy();
		});
	});
});
