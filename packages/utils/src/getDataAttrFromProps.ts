import pick from 'lodash/pick';

/**
 * get data attributes from props
 * @param {object} props
 * @returns {object}
 */
export default function getDataAttrFromProps(props: object) {
	const dataAttributesKeys: string[] = Object.keys(props).filter(objectKey =>
		objectKey.startsWith('data-'),
	);
	return pick(props, dataAttributesKeys);
}
