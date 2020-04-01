import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import Component from './RecordsViewer.component';
import Branch from './Branch';
import Leaf from './Leaf';
import { TreeManager } from '../Managers';
import theme from './RecordsViewer.scss';
import {
	getChilds,
	getChildsCount,
	getItemType,
	getJSONPath,
	getObjectBranchDatakey,
	getQuality,
} from './RecordsViewer.parser';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

/**
 * Used in the branch to get the icon.
 * Allow custom icon.
 */
export function getIcon(opened) {
	if (opened) {
		return {
			name: 'talend-minus-circle',
			className: classNames(
				theme['tc-records-viewer-branch-icon'],
				'tc-records-viewer-branch-icon',
			),
		};
	}
	return {
		name: 'talend-plus-circle',
		className: classNames(theme['tc-records-viewer-branch-icon'], 'tc-records-viewer-branch-icon'),
	};
}

export class RecordsViewer extends React.Component {
	static propTypes = {
		componentId: PropTypes.string,
		getChilds: PropTypes.func,
		getChildsCount: PropTypes.func,
		getIcon: PropTypes.func,
		getObjectBranchDatakey: PropTypes.func.isRequired,
		getJSONPath: PropTypes.func,
		getQuality: PropTypes.func,
		getItemType: PropTypes.func,
		highlighted: PropTypes.array,
		sample: PropTypes.object,
		t: PropTypes.func,
		renderBranchQuality: PropTypes.func,
		renderLeafQuality: PropTypes.func,
	};

	static defaultProps = {
		getChilds,
		getChildsCount,
		getIcon,
		getObjectBranchDatakey,
		getJSONPath,
		getQuality,
		getItemType,
		t: getDefaultT(),
	};

	renderLeaf = args => (
		<Leaf
			{...args}
			getQuality={this.props.getQuality}
			t={this.props.t}
			renderLeafQuality={this.props.renderLeafQuality}
		/>
	);

	renderBranch = args => (
		<Branch
			{...args}
			getChilds={this.props.getChilds}
			getChildsCount={this.props.getChildsCount}
			getIcon={this.props.getIcon}
			getQuality={this.props.getQuality}
			getObjectBranchDatakey={this.props.getObjectBranchDatakey}
			t={this.props.t}
			renderBranchQuality={this.props.renderBranchQuality}
		/>
	);

	renderComponent = args => {
		const componentProps = {
			...this.props,
			branch: this.renderBranch,
			getJSONPath: this.props.getJSONPath,
			getValueType: this.props.getItemType,
			leaf: this.renderLeaf,
			value: this.props.sample.data,
			t: this.props.t,
		};
		return <Component {...args} {...componentProps} />;
	};

	render() {
		return (
			<TreeManager
				componentId={this.props.componentId || 'RecordsViewer'}
				highlighted={this.props.highlighted}
				wrappedComponent={this.renderComponent}
				sample={this.props.sample}
			/>
		);
	}
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(RecordsViewer);
