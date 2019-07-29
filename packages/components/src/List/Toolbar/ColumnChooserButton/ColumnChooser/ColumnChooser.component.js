import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ColumnChooserProvider } from './columnChooser.context';
import { useColumnChooserManager } from '../hooks';
import ColumnChooserBody from './ColumnChooserBody';
import ColumnChooserFooter from './ColumnChooserFooter';
import ColumnChooserHeader from './ColumnChooserHeader';
import getDefaultT from '../../../../translate';
import theme from './ColumnChooser.scss';
import Tooltip from '../../../../Tooltip';

const DefaultColumnChooser = (
	<React.Fragment>
		<ColumnChooserHeader />
		<ColumnChooserBody />
		<ColumnChooserFooter />
	</React.Fragment>
);

export default function ColumnChooser({
	children,
	columns,
	id,
	nbLockedLeftItems,
	onClose,
	submit,
	t,
}) {
	const {
		columnsChooser,
		onChangeVisibility,
		onSelectAll,
		onSubmitColumnChooser,
		selectAll,
	} = useColumnChooserManager(columns, submit, nbLockedLeftItems);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and development of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, [id]);

	const onSubmit = event => {
		event.preventDefault();
		onSubmitColumnChooser(event);
		onClose();
	};
	return (
		<ColumnChooserProvider
			value={{
				columnsChooser,
				id,
				onChangeVisibility,
				onClose,
				onSelectAll,
				onSubmitColumnChooser,
				selectAll,
				t,
			}}
		>
			<Tooltip>
				<form
					id={`${id}-column-chooser-content`}
					className={classNames(theme['tc-column-chooser'], 'tc-column-chooser')}
					onSubmit={onSubmit}
				>
					{!children ? DefaultColumnChooser : children}
				</form>
			</Tooltip>
		</ColumnChooserProvider>
	);
}

ColumnChooser.Header = ColumnChooserHeader;
ColumnChooser.Body = ColumnChooserBody;
ColumnChooser.Footer = ColumnChooserFooter;

ColumnChooser.defaultProps = {
	nbLockedLeftItems: 0,
	t: getDefaultT(),
};

ColumnChooser.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	nbLockedLeftItems: PropTypes.number,
	onClose: PropTypes.func,
	submit: PropTypes.func.isRequired,
	t: PropTypes.func,
};
