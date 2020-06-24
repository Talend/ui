import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import Icon from '../../../Icon';
import theme from './TreeBranchIcon.scss';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

/**
 * Allow to use custom get icon function.
 */
export function getDefaultIcon({ useCustomIcon, getIcon, opened, ...props }) {
	if (useCustomIcon && getIcon) {
		return getIcon(opened, props);
	}
	return {
		name: opened ? 'talend-caret-down' : 'talend-chevron-left',
	};
}

/**
 * Render a standard caret icon.
 * Customizable with useCustomIcon and getIcon.
 */
export class TreeBranchIcon extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		index: PropTypes.number,
		opened: PropTypes.bool,
		jsonpath: PropTypes.string,
		onToggle: PropTypes.func.isRequired,
		style: PropTypes.object,
		t: PropTypes.func,
		useCustomIcon: PropTypes.bool,
		value: PropTypes.object,
	};

	static defaultProps = {
		t: getDefaultT(),
		useCustomIcon: false,
	};

	onClick = event => {
		this.props.onToggle(
			event,
			{
				value: this.props.value,
				opened: this.props.opened,
				jsonpath: this.props.jsonpath,
			},
			this.props.index,
		);
	};

	render() {
		const { className, opened, dataKey, jsonpath, useCustomIcon, style, t } = this.props;
		const icon = getDefaultIcon(this.props);
		const title = opened
			? t('TREE_BRANCH_ICON_TITLE_COLLAPSED', { defaultValue: 'Collapse' })
			: t('TREE_BRANCH_ICON_TITLE_EXPANDED', { defaultValue: 'Expand' });
		const iconClassNames = classNames(icon.className, {
			[theme['tc-tree-branch-icon-caret']]: !useCustomIcon,
			'tc-tree-branch-icon-caret': !useCustomIcon,
			[theme['tc-tree-branch-icon-caret-right']]: !opened,
			'tc-tree-branch-icon-caret-right': !opened,
		});
		return (
			<span
				className={classNames(theme['tc-tree-branch-icon'], 'tc-tree-branch-icon', className)}
				style={style}
			>
				<Icon
					className={iconClassNames}
					key="Icon"
					name={icon.name}
					onClick={this.onClick}
					title={`${title} ${dataKey} (${jsonpath})`}
				/>
			</span>
		);
	}
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(TreeBranchIcon);
