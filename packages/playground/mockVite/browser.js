import { setupWorker } from 'msw/browser';

import { handlers } from './server';

export const worker = setupWorker(...handlers);
