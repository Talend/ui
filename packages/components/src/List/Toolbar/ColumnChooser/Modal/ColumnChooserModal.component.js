import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../Actions/ActionButton';
import RichLayout from '../../../../RichTooltip/RichLayout';
import getDefaultT from '../../../../translate';
import Icon from '../../../../Icon';
import theme from './ColumnChooserModal.scss';

const columnDisplay = (length, onChangeVisibility, onChangeOrder) => {
	return ({ label, hidden, locked, order }, index) => (
		<div
			id="columnDisplay"
			style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
		>
			{locked ? (
				<Icon name="talend-locked" />
			) : (
				<span>
					<input
						id="label"
						name="scales"
						onChange={() => onChangeVisibility(index, !hidden)}
						type="checkbox"
						checked={hidden}
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

class ColumnChooserModal extends React.Component {
	static defaultProps = {
		handlerColumnChooser: () => {},
		t: getDefaultT(),
	};

	static propTypes = {
		header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		footer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		t: PropTypes.func,
	};

	state = {
		columns: this.props.columns,
		/*
		columnsOrder: new Set(this.props.columns.map(column => column.order))
		if (columnsOder.length < this.props.columns.length)
		throw error / console.warn
		*/
	};

	onClickModify = event => {
		/*
			if (columnsOder.length < this.props.columns.length) {
			 submit block
			}
		*/
		this.props.handlerColumnChooser(event, this.state.columns);
	};

	onChangeVisibilityColumn = (index, hidden) => {
		this.setState(prevState => {
			const columns = prevState.columns;
			columns[index].hidden = hidden;
			return { columns };
		});
	};

	/*
		add order param
		set.delete(order)
		set.add(newOrder)
	*/
	onChangeOrderColumn = (event, index) => {
		const value = event.target.value;
		this.setState(prevState => {
			const columns = prevState.columns;
			columns[index].order = value;
			return { columns };
		});
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
		const { columns } = this.props;
		return (
			<div id="defaultContent" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{columns.map(
					columnDisplay(columns.length, this.onChangeVisibilityColumn, this.onChangeOrderColumn),
				)}
			</div>
		);
	};

	getDefaultFooter = () => {
		return (
			<React.Fragment>
				<ActionButton
					onClick={event => this.onClickModify(event)}
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
