import {
	FLOWDESIGNER_LINK_ADD,
	FLOWDESIGNER_LINK_SET_TARGET,
	FLOWDESIGNER_LINK_SET_SOURCE,
	FLOWDESIGNER_LINK_REMOVE,
	FLOWDESIGNER_LINK_SET_ATTR,
	FLOWDESIGNER_LINK_REMOVE_ATTR,
} from '../constants/flowdesigner.constants';

/**
 * Ask for link creation
 * @param {string} linkId
 * @param {string} sourceId - the source port Identifier
 * @param {string} targetId - the target port Identifier
 * @param {string} linkType
 * @param {Object} attr
 */
export const addLink = (linkId, sourceId, targetId, linkType, attributes) => ({
	type: FLOWDESIGNER_LINK_ADD,
	linkId,
	sourceId,
	targetId,
	linkType,
	attributes,
});

/**
 * Ask for change of link target
 * @param {string} linkId
 * @param {string} targetId - the target port identifier
 */
export const setLinkTarget = (linkId, targetId) => ({
	type: FLOWDESIGNER_LINK_SET_TARGET,
	linkId,
	targetId,
});

/**
 * Ask for change of link source
 * @param {string} linkId
 * @param {string} sourceId - the source port identifier
 */
export const setLinkSource = (linkId, sourceId) => ({
	type: FLOWDESIGNER_LINK_SET_SOURCE,
	linkId,
	sourceId,
});

/**
 * Ask to set attributes on link
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkAttribute = (linkId, attributes) => ({
	type: FLOWDESIGNER_LINK_SET_ATTR,
	linkId,
	attributes,
});

/**
 * Ask to remove an attribute on target link
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removeLinkAttribute = (linkId, attributesKey) => ({
	type: FLOWDESIGNER_LINK_REMOVE_ATTR,
	linkId,
	attributesKey,
});

/**
 * Ask for link removal
 * @param {string} linkId
 * @return {Object}
 */
export const removeLink = linkId => ({
	type: FLOWDESIGNER_LINK_REMOVE,
	linkId,
});
