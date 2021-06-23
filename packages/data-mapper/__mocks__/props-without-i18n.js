import toJson from 'enzyme-to-json';
import cloneDeepWith from 'lodash/cloneDeepWith';

export function getPropsWithoutI18n(props) {
	if (!props.i18n) {
		return props;
	}

	return {
		...props,
		i18n: {},
	};
}

function omitI18nDeep(collection) {
	return cloneDeepWith(
		collection,
		value => {
			if (value && typeof value === 'object') {
				// eslint-disable-next-line no-param-reassign
				delete value.i18n;
			}
		}
	);
}

export default function toJsonWithoutI18n(wrapper) {
	const result = toJson(
		wrapper,
		{
			map: json => ({
				...json,
				props: getPropsWithoutI18n(json.props),
			}),
		}
	);

	if (wrapper !== undefined && result === undefined) {
		return omitI18nDeep(wrapper);
	}

	return result;
}
