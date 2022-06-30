jest.mock('reakit', () => {
    return {
        ...jest.requireActual('reakit'),
        unstable_useId: () => ({id: 42})
    }
})
