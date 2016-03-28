import * as schemaDefaultsImp from './lib/schemaDefaults';
import * as sfPathImp from './lib/sfPath';
import canonicalTitleMapImp from './lib/canonicalTitleMap';

export * from './lib/merge.js';
export * from './lib/select.js';
export * from './lib/traverse.js';

export const sfPath = sfPathImp;
export const schemaDefaults = schemaDefaultsImp;
export const canonicalTitleMap = canonicalTitleMapImp;
