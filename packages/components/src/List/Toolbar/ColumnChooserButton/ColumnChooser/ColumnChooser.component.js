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
		<ColumnChooserBody />\
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
	const { columnsChooser, onChangeVisibility, onSelectAll, selectAll } = useColumnChooserManager(
		columns,
		nbLockedLeftItems,
	);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and development of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, []);

	const onSubmit = event => {
		event.preventDefault();
		submit(event, columnsChooser);
	};

	return (
		<ColumnChooserProvider
			value={{
				columnsChooser,
				id,
				onChangeVisibility,
				onClose,
				onSelectAll,
				selectAll,
				t,
			}}
		>
			<Tooltip>
				<form
					id={`${id}-form`}
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
