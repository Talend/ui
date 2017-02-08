import React, { PropTypes } from 'react';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import FormControl from 'react-bootstrap/lib/FormControl';
import get from 'lodash/get';
import { Action } from '../../../Actions';
import Icon from '../../../Icon';
import { ESC_KEY, ENTER_KEY } from '../../../utils/keyboardConstants';
import theme from './Filter.scss';

function onKeyDown(event, escAction, enterAction) {
	switch (event.keyCode) {
	case ESC_KEY:
		escAction(event);
		break;
	case ENTER_KEY:
		if (enterAction) {
			enterAction(event);
		}
		break;
	default:
		break;
	}
}
function FilterInput(props) {
	const {
		id,
		debounceMinLength,
		debounceTimeout,
		onBlur,
		onFocus,
		onFilter,
		onToggle,
	} = props;

	const inputProps = {
		id,
		name: 'search',
		type: 'search',
		placeholder: 'Filter',
		className: theme.search,
		'aria-label': 'Filter',
		onBlur: onBlur && (event => onBlur(event, event.target.value)),
		onFocus: onFocus && (event => onFocus(event, event.target.value)),
		onChange: event => onFilter(event, event.target.value),
		onKeyDown: event => onKeyDown(event, onToggle, onBlur),
		autoFocus: true,
	};

	if (debounceMinLength || debounceTimeout) {
		return (<DebounceInput
			{...inputProps}
			element={FormControl}
			minLength={debounceMinLength}
			debounceTimeout={debounceTimeout}
		/>);
	}

	return <FormControl {...inputProps} />;
}
FilterInput.propTypes = {
	id: PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onFilter: PropTypes.func.isRequired,
	onToggle: PropTypes.func,
};

/**
 * @param {object} props react props
 * @example
 <Filter id="my-filter" docked="false" onFilter="filter()"></Filter>
 */
function Filter(props) {
	const {
		id,
		debounceMinLength,
		debounceTimeout,
		docked,
		highlight,
		onBlur,
		onFocus,
		onFilter,
		onToggle,
	} = props;
	if (docked) {
		return (
			<Action
				id={id}
				className="navbar-right"
				onClick={onToggle}
				label="Toggle filter"
				hideLabel
				icon="talend-search"
				bsStyle="link"
			/>
		);
	}

	function onSubmit(event) {
		event.preventDefault();
		return onFilter(event, get(event, 'target.search.value'));
	}

	const classes = classNames(
		'navbar-form',
		'navbar-right',
		theme.filter,
		{ [theme.highlight]: highlight },
	);

	return (
		<form
			className={classes}
			role="search"
			onSubmit={onSubmit}
		>
			<Icon name="talend-search" className={theme['search-icon']} />
			<div className="form-group">
				<FilterInput
					id={id && `${id}-input`}
					debounceMinLength={debounceMinLength}
					debounceTimeout={debounceTimeout}
					onBlur={onBlur}
					onFocus={onFocus}
					onFilter={onFilter}
					onToggle={onToggle}
				/>
				<Action
					id={id && `${id}-cross-icon`}
					bsStyle="link"
					icon="talend-cross"
					label="Remove filter"
					hideLabel
					onClick={onToggle}
				/>
			</div>
		</form>
	);
}

Filter.propTypes = {
	id: PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	docked: PropTypes.bool,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onFilter: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired,
	highlight: PropTypes.bool,
};

Filter.defaultProps = {
	docked: true,
};

export default Filter;
