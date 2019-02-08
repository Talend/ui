import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource, DropTarget, DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ActionButton from '../../../../Actions/ActionButton';
import RichLayout from '../../../../RichTooltip/RichLayout';
import getDefaultT from '../../../../translate';
import Icon from '../../../../Icon';
import theme from './ColumnChooserModal.scss';
import { useColumnChooserManager } from '../Manager/columnChooserManager';

const ColumnVisibility = ({ onChange, value }) => (
	<span>
		<input onChange={() => onChange(!value)} type="checkbox" checked={value} value={value} />
	</span>
);

const ColumnOrder = ({ onChange, value, length }) => (
	<span>
		<input
			style={{ width: '25px' }}
			onChange={event => onChange(event.target.value)}
			placeholder={value}
			type="text"
			value={value}
		/>
		{`/${length}`}
	</span>
);

const DefaultHeader = ({ t }) => {
	return (
		<React.Fragment>
			{t('COLUMN_CHOOSER_HEADER_TITLE', {
				defaultValue: 'Modifying columns position',
			})}
		</React.Fragment>
	);
};

export const ItemTypes = {
	COLUMN_CHOOSER_ROW: 'COLUMN_CHOOSER_ROW',
};

const columnDisplaySource = {
	beginDrag(props) {
		return props;
	},
	endDrag(props, monitor, component) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		return {};
	},
};

const columnDisplayTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return !item.locked;
	},
	drop(props, monitor, component) {
		props.onChangeOrder(props.order + 1);
		const item = monitor.getItem();
		item.onChangeOrder(props.order);
		props.onDragAndDrop();
	},
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectDrop(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		itemType: monitor.getItemType(),
	};
}

const getColumnDisplay = (length, onChangeVisibility, onChangeOrder, onDragAndDrop) => {
	return (column, index) => {
		const myProps = {
			...column,
			index,
			length,
			onChangeVisibility: onChangeVisibility(index),
			onChangeOrder: onChangeOrder(index),
			onDragAndDrop,
		};
		if (column.locked) {
			return (
				<ColumnDisplay
					{...column}
					length={length}
					onChangeVisibility={onChangeVisibility(index)}
					onChangeOrder={onChangeOrder(index)}
				/>
			);
		}
		const Drag = DragSource(ItemTypes.COLUMN_CHOOSER_ROW, columnDisplaySource, collect)(
			DraggableColumnDisplay,
		);
		const Drop = DropTarget(ItemTypes.COLUMN_CHOOSER_ROW, columnDisplayTarget, collectDrop)(Drag);
		return <Drop {...myProps} />;
		{
			/*
		return (
			<ColumnDisplay
				{...column}
				length={length}
				onChangeVisibility={onChangeVisibility(index)}
				onChangeOrder={onChangeOrder(index)}
			/>
			);
		*/
		}
	};
};

const DraggableColumnDisplay = ({ connectDropTarget, connectDragSource, ...rest }) => {
	return connectDropTarget(
		connectDragSource(
			<div>
				<ColumnDisplay {...rest} />
			</div>,
		),
	);
};

const ColumnDisplay = ({
	label,
	hidden,
	locked,
	order,
	length,
	onChangeVisibility,
	onChangeOrder,
	isDragging,
}) => {
	return (
		<div
			id="columnDisplay"
			key={`${label}`}
			style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
		>
			{locked ? (
				<Icon name="talend-locked" />
			) : (
				<ColumnVisibility onChange={onChangeVisibility} value={hidden} />
			)}
			<span>{label}</span>
			<ColumnOrder onChange={onChangeOrder} value={order} length={length} />
		</div>
	);
};

const DefaultContent = ({ columns, changeColumnOrder, changeColumnVisibility, onDragAndDrop }) => {
	return (
		<DragDropContextProvider backend={HTML5Backend}>
			<div id="defaultContent" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{columns.map(
					getColumnDisplay(
						columns.length,
						changeColumnVisibility,
						changeColumnOrder,
						onDragAndDrop,
					),
				)}
			</div>
		</DragDropContextProvider>
	);
};

const DefaultFooter = ({ submitColumns, t }) => {
	return (
		<React.Fragment>
			<ActionButton
				onClick={event => submitColumns(event)}
				label={t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
			/>
		</React.Fragment>
	);
};

export default function ColumnChooserContent({
	id,
	columns,
	handlerColumnChooser,
	header,
	content,
	footer,
	t,
}) {
	const {
		editedColumns,
		submitColumns,
		changeColumnOrder,
		changeColumnVisibility,
		onDragAndDrop,
	} = useColumnChooserManager(columns, handlerColumnChooser);
	return (
		<div
			id={`${id}-column-chooser-content`}
			className={classNames(theme['tc-column-chooser-modal'], 'tc-column-chooser-modal')}
		>
			<RichLayout
				Header={header || <DefaultHeader t={t} />}
				Content={
					content || (
						<DefaultContent
							columns={editedColumns}
							changeColumnOrder={changeColumnOrder}
							changeColumnVisibility={changeColumnVisibility}
							onDragAndDrop={onDragAndDrop}
						/>
					)
				}
				Footer={footer || <DefaultFooter submitColumns={submitColumns} t={t} />}
			/>
		</div>
	);
}

ColumnChooserContent.defaultProps = {
	t: getDefaultT(),
};
