import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../Actions/ActionButton';
import RichLayout from '../../../../RichTooltip/RichLayout';
import getDefaultT from '../../../../translate';
import Icon from '../../../../Icon';
import theme from './ColumnChooserModal.scss';
import { useColumnChooserManager } from '../Manager/columnChooserManager';

const columnDisplay = (length, onChangeVisibility, onChangeOrder) => {
	return ({ label, hidden, locked, order }, index) => (
		<div
			id="columnDisplay"
			key={`${label}-${index}`}
			style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
		>
			{locked ? (
				<Icon name="talend-locked" />
			) : (
				<span>
					<input
						onChange={() => onChangeVisibility(index, !hidden)}
						type="checkbox"
						checked={hidden}
						value={hidden}
					/>
				</span>
			)}
			<span>{label}</span>
			<span>
				<input
					style={{ width: '25px' }}
					onChange={event => onChangeOrder(event, index)}
					placeholder={order}
					type="text"
				/>
				{`/${length}`}
			</span>
		</div>
	);
};

export default class ColumnChooserContent extends React.Component {
	static defaultProps = {
		t: getDefaultT(),
	};

	static propTypes = {
		header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		footer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		// onChangeVisibilityColumn: PropTypes.func.isRequired,
		// onChangeOrderColumn: PropTypes.func.isRequired,
		// onClickModify: PropTypes.func.isRequired,
		t: PropTypes.func,
	};

	componentWillUnmount() {
		this.props.onExitOverlay();
	}

	getLayoutComponent = () => {
		const { submitColumns, changeColumnOrder, changeColumnVisibility } = useColumnChooserManager(
			this.props.columns,
			this.props.handler,
		);
		return {
			header: this.props.header || this.getDefaultHeader(),
			content:
				this.props.content || this.getDefaultContent(changeColumnOrder, changeColumnVisibility),
			footer: this.props.footer || this.getDefaultFooter(submitColumns),
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

	getDefaultContent = (changeColumnOrder, changeColumnVisibility) => {
		const { columns } = this.props;
		return (
			<div id="defaultContent" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{columns.map(
					columnDisplay(
						columns.length,
						changeColumnVisibility,
						changeColumnOrder,
						// this.props.onChangeVisibilityColumn,
						// this.props.onChangeOrderColumn,
					),
				)}
			</div>
		);
	};

	getDefaultFooter = submitColumns => {
		return (
			<React.Fragment>
				<ActionButton
					onClick={event => submitColumns(event)}
					label={this.props.t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
				/>
			</React.Fragment>
		);
	};

	render() {
		const layoutComponent = this.getLayoutComponent();
		return (
			<div
				id={`${this.props.id}-modal`}
				className={classNames(theme['tc-column-chooser-modal'], 'tc-column-chooser-modal')}
			>
				<RichLayout
					Header={layoutComponent.header}
					Content={layoutComponent.content}
					Footer={layoutComponent.footer}
				/>
			</div>
		);
	}
}
