jest.mock('reakit', () => {
	return {
		...jest.requireActual('reakit'),
	};
});

jest.mock('reakit/lib/Id/IdProvider', () => ({
	...jest.requireActual('reakit/lib/Id/IdProvider'),
	unstable_IdContext: jest.requireActual('react').createContext(() => 'a-42'),
}));
