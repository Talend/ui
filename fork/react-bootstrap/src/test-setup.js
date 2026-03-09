import '@testing-library/jest-dom/vitest';

// Legacy tests in this package use Mocha-style xit; map it to Vitest skip.
globalThis.xit = it.skip;
