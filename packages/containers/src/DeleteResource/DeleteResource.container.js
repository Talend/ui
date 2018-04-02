import React from 'react';
import PropTypes from 'prop-types';
import { componentState } from '@talend/react-cmf';
import { ConfirmDialog } from '@talend/react-components';
import { translate } from 'react-i18next';
import { getActionsProps } from '../actionAPI';
import deleteResourceConst from './deleteResource.constants';
import DEFAULT_I18N from '../translate';
import I18N_DOMAIN_CONTAINERS from '../constant';

/**
 * DeleteResource is used to delete a specific resource.
 * When the component is mounted, it opens a confirm dialog.
 * It uses the saga matching pattern to launch a race between the cancel and validate action.
 */
export class DeleteResource extends React.Component {
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
	static defaultProps = {
		t: DEFAULT_I18N.t.bind(DEFAULT_I18N),
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
	getLabel() {
		return {
			label: this.props.resource ? this.props.resource.get('label', '') : '',
			found: !!this.props.resource,
		};
	}

	/**
	 * Build an object with all the data's resource we need.
	 */
	getResourceInfo() {
		return {
			resourceType: this.props.resourceType,
			resourceLabel: this.props.resourceTypeLabel
				? this.props.resourceTypeLabel
				: this.props.resourceType,
			uri: this.props.uri,
			...this.getLabel(),
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
		console.log(this.props.t('DELETE_RESOURCE_MESSAGE'));
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
				<div>
					{this.props.t('DELETE_RESOURCE_MESSAGE', {
						defaultValue: 'Are you sure you want to remove the {{resourceLabel}} ',
						resourceLabel: resourceInfo.resourceLabel,
					})}
					<b>{resourceInfo.label}</b>
					?
				</div>
			</ConfirmDialog>
		);
	}
}

export default translate(I18N_DOMAIN_CONTAINERS, { i18n: DEFAULT_I18N })(DeleteResource);
