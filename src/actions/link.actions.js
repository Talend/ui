import {
	FLOWDESIGNER_LINK_ADD,
	FLOWDESIGNER_LINK_SET_TARGET,
	FLOWDESIGNER_LINK_SET_SOURCE,
	FLOWDESIGNER_LINK_REMOVE,
	FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_LINK_SET_DATA,
	FLOWDESIGNER_LINK_REMOVE_DATA,
} from '../constants/flowdesigner.constants';

/**
 * Ask for link creation
 * @param {string} linkId
 * @param {string} sourceId - the source port Identifier
 * @param {string} targetId - the target port Identifier
 * @param {string} linkType
 * @param {Object} attr
 */
export const addLink = (
	linkId,
	sourceId,
	targetId,
	{ data = {}, graphicalAttributes = {} } = {},
) => ({
	type: FLOWDESIGNER_LINK_ADD,
	linkId,
	sourceId,
	targetId,
	data,
	graphicalAttributes,
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
 * Ask to set graphical attributes on link
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkGraphicalAttributes = (linkId, graphicalAttributes) => ({
	type: FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES,
	linkId,
	graphicalAttributes,
});

/**
 * Ask to remove an graphical attribute on target link
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removeLinkGraphicalAttribute = (linkId, graphicalAttributesKey) => ({
	type: FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES,
	linkId,
	graphicalAttributesKey,
});

/**
 * Ask to set data on link
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkData = (linkId, data) => ({
	type: FLOWDESIGNER_LINK_SET_DATA,
	linkId,
	data,
});

/**
 * Ask to remove a data on target link
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removeLinkData = (linkId, dataKey) => ({
	type: FLOWDESIGNER_LINK_REMOVE_DATA,
	linkId,
	dataKey,
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
