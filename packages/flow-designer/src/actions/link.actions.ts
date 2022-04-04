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
 * @param {Object} attr
 */
export const addLink = (
	linkId: string,
	sourceId: string,
	targetId: string,
	{ data = {}, graphicalAttributes = {} }: any = {},
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
 * @deprecated
 * @param {string} linkId
 * @param {string} targetId - the target port identifier
 */
export const setLinkTarget = (linkId: string, targetId: string) => ({
	type: FLOWDESIGNER_LINK_SET_TARGET,
	linkId,
	targetId,
});

/**
 * Ask for change of link source
 * @deprecated
 * @param {string} linkId
 * @param {string} sourceId - the source port identifier
 */
export const setLinkSource = (linkId: string, sourceId: string) => ({
	type: FLOWDESIGNER_LINK_SET_SOURCE,
	linkId,
	sourceId,
});

/**
 * Ask to set graphical attributes on link
 * @deprecated
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkGraphicalAttributes = (linkId: string, graphicalAttributes: any) => ({
	type: FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES,
	linkId,
	graphicalAttributes,
});

/**
 * Ask to remove an graphical attribute on target link
 * @deprecated
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removeLinkGraphicalAttribute = (linkId: string, graphicalAttributesKey: any) => ({
	type: FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES,
	linkId,
	graphicalAttributesKey,
});

/**
 * Ask to set data on link
 * @deprecated
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkData = (linkId: string, data: any) => ({
	type: FLOWDESIGNER_LINK_SET_DATA,
	linkId,
	data,
});

/**
 * Ask to remove a data on target link
 * @deprecated
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
export const removeLinkData = (linkId: string, dataKey: any) => ({
	type: FLOWDESIGNER_LINK_REMOVE_DATA,
	linkId,
	dataKey,
});

/**
 * Ask for link removal
 * @deprecated use deleteLink action
 * @param {string} linkId
 */
export const removeLink = (linkId: string) => ({
	type: FLOWDESIGNER_LINK_REMOVE,
	linkId,
});
