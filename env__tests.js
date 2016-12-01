const fetch = jest.fn(() => new Promise(resolve => resolve()));
global.fetch = fetch;
