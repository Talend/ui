import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../../Icon';

const TITLE_MODE_TEXT = 'text';
const TITLE_MODE_INPUT = 'input';

const ESC_KEY = 27;
const ENTER_KEY = 13;

function renderButton({ value, className, item, onClick }) {
	const click = (event) => {
		event.stopPropagation();
		onClick(event, item);
	};

	return (
		<Button className={className} onClick={click} role="link" bsStyle="link">
			{value}
		</Button>
	);
}
renderButton.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func,
};

function renderText({ value, className }) {
	return (<span className={className}>{value}</span>);
}
renderText.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string,
};

function renderInput({ value, item, onChange, onCancel }) {
	const cancel = event => onCancel(event, item);
	const validate = event => onChange(event, item);
	const onKeyUp = (event) => {
		switch (event.keyCode) {
		case ESC_KEY:
			cancel(event);
			break;
		case ENTER_KEY:
			validate(event);
			break;
		default:
			break;
		}
	};

	return (<input value={value} onKeyUp={onKeyUp} onBlur={validate} autoFocus />);
}
renderInput.propTypes = {
	value: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onChange: PropTypes.func,
	onCancel: PropTypes.func,
};

/**
 * Item title component
 * @param {string} className the title class name
 * @param {object} item the item from list
 * @param {object} titleProps title configuration props
 * @example
const props = {
	className: 'my-title',
	item: item,
	titleProps: {
		key: 'name',                        // item.name is the title value
		iconKey: 'icon',                    // item.icon is the icon
		displayModeKey: 'display',          // item.display ('text' | 'input') set the display mode
		onClick: (event, item) => {},       // title click callback
		onChange: (event, item) => {},      // input mode validation callback
		onCancel: (event, item) => {},      // input mode cancellation callback
	}
}
<ItemTitle {...props} />
 */
function ItemTitle({ className, item, titleProps }) {
	const {
		key,
		iconKey,
		displayModeKey,
		onClick,
		onChange,
		onCancel,
	} = titleProps;
	const value = item[key];
	const displayMode = (displayModeKey && item[displayModeKey]) || TITLE_MODE_TEXT;
	const iconName = iconKey && item[iconKey];
	const icon = iconName ? <Icon name={iconName} /> : null;

	let titleElement = null;
	if (displayMode === TITLE_MODE_TEXT) {
		titleElement = onClick ?
			renderButton({ value, className, item, onClick }) :
			renderText({ value, className });
	} else if (displayMode === TITLE_MODE_INPUT) {
		titleElement = renderInput({ value, item, onChange, onCancel });
	}

	const style = { display: 'inline' };
	return (
		<div style={style}>
			{icon}
			{titleElement}
		</div>
	);
}

ItemTitle.propTypes = {
	className: PropTypes.string,
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	titleProps: PropTypes.shape({
		key: PropTypes.string,
		iconKey: PropTypes.string,
		displayModeKey: PropTypes.string,
		onClick: PropTypes.func,
		onChange: PropTypes.func,
		onCancel: PropTypes.func,
	}).isRequired,
};

ItemTitle.defaultProps = {
	title: {
		key: 'name',
	},
};

export default ItemTitle;
