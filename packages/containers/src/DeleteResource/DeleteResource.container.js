import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import { translate, Trans } from 'react-i18next';
import deleteResourceConst from './constants';
import ConfirmDialog from '../ConfirmDialog';
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
		...cmfConnect.propTypes,
		'cancel-action': PropTypes.string.isRequired,
		'validate-action': PropTypes.string.isRequired,
		header: PropTypes.string,
		uri: PropTypes.string.isRequired,
		resourceType: PropTypes.string.isRequired,
		resourceTypeLabel: PropTypes.string,
		resourceId: PropTypes.string,
		female: PropTypes.string,
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
			resourceTypeLabel: this.props.resourceTypeLabel
				? this.props.resourceTypeLabel
				: this.props.resourceType,
			uri: this.props.uri,
			...this.getLabel(),
			id: this.props.resourceId || this.props.params.id,
		};
	}

	render() {
		const resourceInfo = this.getResourceInfo();
		const validateAction = {
			actionId: this.props[deleteResourceConst.VALIDATE_ACTION],
			model: resourceInfo,
		};
		const cancelAction = {
			actionId: this.props[deleteResourceConst.CANCEL_ACTION],
			model: resourceInfo,
		};
		const i18nKey = this.props.female
			? 'DELETE_RESOURCE_MESSAGE_female'
			: 'DELETE_RESOURCE_MESSAGE';
		return (
			<ConfirmDialog
				show
				header={this.props.header}
				cancelAction={cancelAction}
				validateAction={validateAction}
			>
				<div>
					<Trans i18nKey={i18nKey}>
						Are you sure you want to remove the {{ resourceLabel: resourceInfo.resourceTypeLabel }}
						<strong> {{ resourceName: resourceInfo.label }} </strong> ?
					</Trans>
				</div>
			</ConfirmDialog>
		);
	}
}

export default translate(I18N_DOMAIN_CONTAINERS, { i18n: DEFAULT_I18N })(DeleteResource);
