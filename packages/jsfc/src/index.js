import tv4index from 'tv4';

// eslint-disable-next-line prettier/prettier
import canonicalTitleMapImp from './lib/canonical-title-map';
// eslint-disable-next-line prettier/prettier
import * as schemaDefaultsImp from './lib/schema-defaults';
// eslint-disable-next-line prettier/prettier
import * as sfPathImp from './lib/sf-path';

export { merge } from './lib/merge';
export { select } from './lib/select';
export { jsonref } from './lib/resolve';
export { traverseSchema, traverseForm } from './lib/traverse';
export { validate } from './lib/validate';

export const sfPath = sfPathImp;
export const schemaDefaults = schemaDefaultsImp;
export const canonicalTitleMap = canonicalTitleMapImp;
export const tv4 = tv4index;
