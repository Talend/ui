// eslint-disable-next-line @talend/import-depth
import { IconName } from '@talend/icons/dist/typeUtils';

export type DataAttributes = {
	'data-feature'?: string;
	'data-test'?: string;
	'data-testid'?: string;
};

export type DeprecatedIconNames = IconName;

// Allow to force one or more properties K in T to be required
export type Mandatory<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;
