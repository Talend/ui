import React from 'react';
import PropTypes from 'prop-types';
import { QualityBar } from '@talend/react-components/lib';
import theme from './TableRow.scss';

export function TableRow({ element, onEnterRow, onLeaveRow, onClick, ...props  }) {
	return (
		<li
			className={theme['table-row']}
			key={element.id}
			onMouseEnter={() => onEnterRow(element)}
			onMouseLeave={() => onLeaveRow(element)}
			onClick={(ev) => 	this.onClick(element, ev)}
		>
			<div className={theme['table-row__container']}>
				<div className={theme['table-row__name']}>{element.name}</div>
				<div className={theme['table-row__type']}>
					{element.type}
				</div>
			</div>
			<div className={theme['table-row__quality-bar']}>
				<QualityBar
					valid={70}
					empty={20}
					invalid={10}
				/>
			</div>
		</li>
	);
}

TableRow.propTypes = {
	element: PropTypes.object.isRequired,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
