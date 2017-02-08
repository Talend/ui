import React, { PropTypes } from 'react';
import classNames from 'classnames';

import headerPropTypes from './Header/Header.propTypes';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import ItemPropTypes from './Items/Item/Item.propTypes';
import Items from './Items/Items.component';
import theme from './Enumeration.scss';

const enumerationClasses = () => classNames({
	[theme['tc-enumeration']]: true,
	'tc-enumeration': true,
});

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';

function Enumeration({ displayMode, headerDefault, headerInput, items, itemsProp, onAddChange, onAddKeyDown }) {
	const getHeaderFor = () => {
		switch (displayMode) {
		case DISPLAY_MODE_ADD:
			const propsInput = {
				headerInput,
				onAddChange,
				onAddKeyDown,
			};

			return <HeaderInput {...propsInput} />;
		default:
			const propsDefault = {
				headerDefault,
				onAddChange,
			};

			return <Header {...propsDefault} />;
		}
	};

	return (
		<div className={enumerationClasses()}>
			{getHeaderFor()}
			<Items items={items} itemsProp={itemsProp} />
		</div>
	);
}

Enumeration.propTypes = {
	displayMode: PropTypes.oneOf([DISPLAY_MODE_DEFAULT, DISPLAY_MODE_ADD]),
	headerDefault: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		values: PropTypes.arrayOf(PropTypes.string),
	})).isRequired,
	onAddChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
};

export default Enumeration;
