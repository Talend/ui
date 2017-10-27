import React from 'react';
import PropTypes from 'prop-types';
import { componentState } from '@talend/react-cmf';
import { ConfirmDialog } from '@talend/react-components';
import { getActionsProps } from '../actionAPI';
import deleteResourceConst from './deleteResource.constants';

/**
 * DeleteResource is used to delete a specific resource.
 * When the component is mounted, it opens a confirm dialog.
 * It uses the saga matching pattern to launch a race between the cancel and validate action.
 */
export default class DeleteResource extends React.Component {
	static displayName = 'Container(DeleteResource)';
	static propTypes = {
		...componentState.propTypes,
		'cancel-action': PropTypes.string.isRequired,
		'validate-action': PropTypes.string.isRequired,
		header: PropTypes.string,
		uri: PropTypes.string.isRequired,
		resourceType: PropTypes.string.isRequired,
	};
	static contextTypes = {
		registry: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
	};

	constructor(props, context) {
		super(props, context);
		this.getActions = this.getActions.bind(this);
		this.getLabel = this.getLabel.bind(this);
	}

	/**
	 * Get the label from the collections.
	 * Return the label and a boolean to confirm that the item has been found.
	 * @param {object} resourceInfo
	 */
	getLabel(resourceType, id) {
		let resource;
		const resourcesCollection = this.context.store.getState().cmf.collections.get(resourceType);
		if (resourcesCollection) {
			resource = resourcesCollection.find(
				resoureCollection => resoureCollection.get('id') === id,
			);
		}
		return resource ? { label: resource.get('label'), found: true } : { label: '', found: false };
	}

	/**
	 * Build an object with all the data's resource we need.
	 */
	getResourceInfo() {
		return {
			resourceType: this.props.resourceType,
			uri: this.props.uri,
			...this.getLabel(this.props.resourceType, this.props.params.id),
			id: this.props.params.id,
		};
	}

	/**
	 * Call the registry to fetch the actions with the resourceInfo data.
	 * @param {object} resourceInfo data add to the model.
	 * @return {object} the fetched actions.
	 */
	getActions(key, resourceInfo) {
		return getActionsProps(this.context, this.props[key], {
			resourceInfo,
		});
	}

	render() {
		const resourceInfo = this.getResourceInfo();
		const validateAction = this.getActions(deleteResourceConst.VALIDATE_ACTION, resourceInfo);
		const cancelAction = this.getActions(deleteResourceConst.CANCEL_ACTION, resourceInfo);
		return (
			<ConfirmDialog
				show
				header={this.props.header}
				cancelAction={cancelAction}
				validateAction={validateAction}
			>
				<div>{resourceInfo.label}</div>
			</ConfirmDialog>
		);
	}
}
