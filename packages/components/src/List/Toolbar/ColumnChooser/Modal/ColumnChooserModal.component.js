import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../Actions/ActionButton';
import RichLayout from '../../../../RichTooltip/RichLayout';
import getDefaultT from '../../../../translate';
import Icon from '../../../../Icon';
import theme from './ColumnChooserModal.scss';

const columns = [
	{
		name: 'column1',
		locked: true,
		order: 1,
	},
	{
		name: 'column2',
		locked: false,
		order: 2,
	},
	{
		name: 'column3',
		locked: false,
		order: 3,
	},
];

const columnDisplay = length => {
	return ({ name, locked, order }) => (
		<div id="columnDisplay" style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Icon name={locked ? 'talend-locked' : 'talend-unlocked'} />
			<span>{name}</span>
			<span>
				<input style={{ width: '25px' }} placeholder={order} type="text" />
				{`/${length}`}
			</span>
		</div>
	);
};

class ColumnChooserModal extends React.Component {
	static defaultProps = {
		t: getDefaultT(),
	};

	static propTypes = {
		header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		footer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		t: PropTypes.func,
	};

	onClick = () => {
		console.log('MODIFY');
	};

	getLayoutComponent = () => {
		return {
			header: this.props.header || this.getDefaultHeader(),
			content: this.props.content || this.getDefaultContent(),
			footer: this.props.footer || this.getDefaultFooter(),
		};
	};

	getDefaultHeader = () => {
		return (
			<React.Fragment>
				{this.props.t('COLUMN_CHOOSER_HEADER_TITLE', {
					defaultValue: 'Modifying columns position',
				})}
			</React.Fragment>
		);
	};

	getDefaultContent = () => {
		return (
			<div id="defaultContent" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{columns.map(columnDisplay(columns.length))}
			</div>
		);
	};

	getDefaultFooter = () => {
		return (
			<React.Fragment>
				<ActionButton
					onClick={this.onClick}
					label={this.props.t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
				/>
			</React.Fragment>
		);
	};

	render() {
		const layoutComponent = this.getLayoutComponent();
		return (
			<div className={classNames(theme['tc-column-chooser-modal'], 'tc-column-chooser-modal')}>
				<RichLayout
					Header={layoutComponent.header}
					Content={layoutComponent.content}
					Footer={layoutComponent.footer}
				/>
			</div>
		);
	}
}

export default ColumnChooserModal;
