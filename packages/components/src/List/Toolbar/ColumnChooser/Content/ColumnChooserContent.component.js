import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './ColumnChooser.scss';
import { useColumnChooserManager } from '../hooks';
import ColumnChooserFooter from './Footer';
import ColumnChooserHeader from './Header';
import ColumnChooserBody from './Body';
// import ColumnDisplayer from '../ColumnDisplayer';
import { columnChooserContext } from './columnChooser.context';
import Tooltip from '../TooltipCompound/Tooltip.component';

export default function ColumnChooser({
	children,
	columns,
	id,
	lockedLeftItems,
	onClose,
	submit,
	t,
}) {
	const {
		onChangeVisibility,
		onBlurInputTextOrder,
		onKeyPressInputTextOrder,
		onSelectAll,
		stateColumnChooser,
		onSubmitColumnChooser,
	} = useColumnChooserManager(columns, submit, lockedLeftItems);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and developpement of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, [id]);

	const { Provider } = columnChooserContext;
	const onSubmit = event => {
		onSubmitColumnChooser(event);
		onClose();
	};
	return (
		<Provider
			value={{
				id,
				onBlurOrder: onBlurInputTextOrder,
				onChangeVisibility,
				onClose,
				onKeyPressOrder: onKeyPressInputTextOrder,
				onSelectAll,
				onSubmitColumnChooser,
				stateColumnChooser,
				t,
			}}
		>
			<Tooltip>
				<form
					id={`${id}-column-chooser-content`}
					className={classNames(theme['tc-column-chooser'], 'tc-column-chooser')}
					onSubmit={event => onSubmit(event)}
				>
					{children}
				</form>
			</Tooltip>
		</Provider>
	);
}

ColumnChooser.Header = ColumnChooserHeader;
ColumnChooser.Body = ColumnChooserBody;
ColumnChooser.Footer = ColumnChooserFooter;

ColumnChooser.propTypes = {
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	lockedLeftItems: PropTypes.number,
	onClose: PropTypes.func,
	submit: PropTypes.func.isRequired,
	t: PropTypes.func,
};

// <Header>
// 	<Header.Title value="Hello world" />
// 	<button style={{ marginLeft: '200px' }}>My Button</button>
// </Header>
// <ColumnChooserBody>
// 	{hookColumns => (
// 		<React.Fragment>
// 			<div>Some special stuff</div>
// 			{hookColumns.map((column, index) => (
// 				<ColumnDisplayer>
// 					<ColumnDisplayer.ColumnVisibility
// 						index={index}
// 						value={column.hidden}
// 						locked={column.locked}
// 					/>
// 					<span style={{ paddingLeft: '20px' }}>More data</span>
// 					<ColumnDisplayer.ColumnLabel label={column.label} />
// 					<span style={{ paddingRight: '20px ' }}>Icon</span>
// 					<ColumnDisplayer.ColumnOrder
// 						index={index}
// 						length={length}
// 						locked={column.locked}
// 						value={column.order}
// 					/>
// 					<button style={{ marginLeft: '20px', display: 'flex', height: '50%' }}>
// 						Action
// 					</button>
// 				</ColumnDisplayer>
// 			))}
// 			<p>
// 				<button style={{ width: '100%' }}>A new action for all columns</button>
// 			</p>
// 		</React.Fragment>
// 	)}
// </ColumnChooserBody>
// <Footer default />
// />
