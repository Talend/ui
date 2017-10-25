import React from 'react';
import PropTypes from 'prop-types';
import { componentState } from '@talend/react-cmf';
import { ConfirmDialog } from '@talend/react-components';
import { actionAPI } from '@talend/react-containers';

/**
 * DeleteResource is used to delete a specific resource.
 * When the component is mounted, it opens a confirm dialog.
 * It uses the saga matching pattern to launch a race between the cancel and validate action.
 */
export default class DeleteResource extends React.Component {
	static displayName = 'Container(DeleteResource)';
	static propTypes = {
		...componentState.propTypes,
	};
	static contextTypes = {
		// router: PropTypes.object.isRequired,
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
		const resourcesCollection = this.context.store.getState().cmf.collections.get(resourceType);
		if (resourcesCollection) {
			const resource = resourcesCollection.find(r => r.get('id') === id);
			return resource ? { label: resource.get('label'), found: true } : {};
		}
		return { label: '', found: false };
	}

	/**
	 * Build an object with all the data's resource we need.
	 */
	getResourceInfo() {
		return {
			...this.props.resourceInfo,
			...this.getLabel(this.props.resourceInfo.resourceType, this.props.params.id),
			id: this.props.params.id,
		};
	}

	/**
	 * Call the registry to fetch the actions with the resourceInfo data.
	 * @param {object} resourceInfo data add to the model.
	 * @return {object} the fetched actions.
	 */
	getActions(resourceInfo) {
		let validateAction = {};
		let cancelAction = {};
		const actions = actionAPI.getProps(this.context, this.props['form-actions'], {
			props: this.props,
			resourceInfo,
		});
		if (actions) {
			cancelAction = actions.find(it => it.id === 'dialog:delete:cancel');
			validateAction = actions.find(it => it.id === 'dialog:delete:validate');
		}
		return { validateAction, cancelAction };
	}

	render() {
		let actions = { validateAction: {}, cancelAction: {} };
		const resourceInfo = this.getResourceInfo();
		if (this.props['form-actions']) {
			actions = this.getActions(resourceInfo);
		}
		return (
			<ConfirmDialog
				show
				header={this.props.header}
				cancelAction={actions.cancelAction}
				validateAction={actions.validateAction}
			>
				<div>{resourceInfo.label}</div>
			</ConfirmDialog>
		);
	}
}
