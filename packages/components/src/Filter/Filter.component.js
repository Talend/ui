import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import FormControl from 'react-bootstrap/lib/FormControl';
import get from 'lodash/get';
import keycode from 'keycode';
import { Action } from '../Actions';
import Icon from '../Icon';
import { getDefaultTranslate } from '../translate';
import theme from './Filter.scss';

function onKeyDown(event, escAction, enterAction) {
	switch (event.keyCode) {
		case keycode.codes.enter:
			if (enterAction) {
				enterAction(event);
			}
			break;
		case keycode.codes.esc:
			if (escAction) {
				escAction(event);
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
		placeholder,
		value,
		toggeable,
	} = props;

	const inputProps = {
		id,
		name: 'search',
		type: 'search',
		value,
		placeholder,
		autoComplete: 'off',
		className: classNames(theme.search, {
			[theme.animate]: toggeable,
		}),
		'aria-label': 'Filter',
		onBlur: onBlur && (event => onBlur(event, event.target.value)),
		onFocus: onFocus && (event => onFocus(event, event.target.value)),
		onChange: event => onFilter(event, event.target.value),
		onKeyDown: event => onKeyDown(event, onToggle, onBlur),
		autoFocus: true,
	};

	if (debounceMinLength || debounceTimeout) {
		return (
			<DebounceInput
				{...inputProps}
				element={FormControl}
				minLength={debounceMinLength}
				debounceTimeout={debounceTimeout}
			/>
		);
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
	placeholder: PropTypes.string,
	value: PropTypes.string,
	toggeable: PropTypes.bool,
};

/**
 * @param {object} props react props
 * @example
 <Filter id="my-filter" docked="false" onFilter="filter()"></Filter>
 */
function Filter(props) {
	const {
		id,
		className,
		debounceMinLength,
		debounceTimeout,
		docked,
		navbar,
		toggeable,
		highlight,
		onBlur,
		onFocus,
		onFilter,
		onToggle,
		placeholder,
		value,
		t,
	} = props;
	if (toggeable && docked) {
		return (
			<Action
				id={id}
				className="navbar-right"
				onClick={onToggle}
				label={t('LIST_FILTER_TOGGLE', { defaultValue: 'Toggle filter' })}
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

	const classes = classNames(theme.filter, {
		[theme.highlight]: highlight,
		'navbar-form': navbar,
		className,
	});

	return (
		<form className={classes} role="search" onSubmit={onSubmit}>
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
					placeholder={placeholder}
					value={value}
					toggeable={toggeable}
				/>
				<Action
					className={theme.remove}
					id={id && `${id}-cross-icon`}
					bsStyle="link"
					icon="talend-cross"
					label={t('LIST_FILTER_REMOVE', { defaultValue: 'Remove filter' })}
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
	navbar: PropTypes.bool,
	toggeable: PropTypes.bool,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onFilter: PropTypes.func.isRequired,
	onToggle: PropTypes.func,
	highlight: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	t: PropTypes.func.isRequired,
};

Filter.defaultProps = {
	docked: true,
	navbar: true,
	toggeable: true,
	placeholder: 'Filter',
	t: getDefaultTranslate,
};

export default Filter;
