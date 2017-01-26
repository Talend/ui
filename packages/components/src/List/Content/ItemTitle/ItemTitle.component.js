import React from 'react';
import { Button } from 'react-bootstrap';

const TITLE_MODE_TEXT = 'text';
const TITLE_MODE_INPUT = 'input';
const TITLE_MODE_BUTTON = 'button';

const ESC_KEY = 27;
const ENTER_KEY = 13;

function TitleText({ id, value }) {
	return (<div id={id} className="tc-list-item-title-text">{value}</div>);
}

TitleText.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string.isRequired,
};

function TitleButton({ id, value, onClick }) {
	return (
		<Button
			id={id}
			title={value}
			onClick={onClick}
			role="link"
			bsStyle="link"
		>
			{value}
		</Button>
	);
}

TitleButton.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

function TitleInput({ id, value, onChange, onSubmit, onCancel }) {
	const onKeyUp = (event) => {
		switch (event.keyCode) {
		case ESC_KEY:
			onCancel(event);
			break;
		case ENTER_KEY:
			onSubmit(event);
			break;
		default:
			break;
		}
	};
	return (
		<input
			type="text"
			id={id}
			className="tc-list-item-title-input"
			value={value}
			onChange={onChange}
			onKeyUp={onKeyUp}
			onBlur={onSubmit}
			autoFocus
		/>
	);
}

TitleInput.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
};

/**
 * Item title component
 * @param {object} props item title configuration props
 * @example
 const props = {
	id: 'my-title',
	value: 'My Title',
	display: 'text',              // 'text' | 'button' | 'input'
	onClick: (event) => {},       // button mode click callback
	onChange: (event) => {},      // input mode change callback
	onSubmit: (event) => {},      // input mode validation callback
	onCancel: (event) => {},      // input mode cancellation callback
	}
 }
 <ItemTitle {...props} />
 */
function ItemTitle(props) {
	const { display, ...rest } = props;
	const getTitleElement = () => {
		switch (display) {
		case TITLE_MODE_TEXT:
			return <TitleText {...rest} />;
		case TITLE_MODE_BUTTON:
			return <TitleButton {...rest} />;
		case TITLE_MODE_INPUT:
			return <TitleInput {...rest} />;
		default:
			return null;
		}
	};

	return (
		<div className="tc-list-item-title">
			{getTitleElement()}
		</div>
	);
}

ItemTitle.propTypes = {
	id: React.PropTypes.string,
	value: React.PropTypes.string.isRequired,
	display: React.PropTypes.oneOf([
		TITLE_MODE_TEXT,
		TITLE_MODE_BUTTON,
		TITLE_MODE_INPUT,
	]),
	onClick: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onSubmit: React.PropTypes.func,
	onCancel: React.PropTypes.func,
};

ItemTitle.defaultProps = {
	display: TITLE_MODE_TEXT,
};

export default ItemTitle;
