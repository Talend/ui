import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import FormControl from 'react-bootstrap/lib/FormControl';
import keycode from 'keycode';
import { useTranslation } from 'react-i18next';
import { Action } from '../Actions';
import Icon from '../Icon';
import I18N_DOMAIN_COMPONENTS from '../constants';
import theme from './FilterBar.scss';

function forceBlur(event) {
	event.target.blur();
}

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
		onClear,
		onFocus,
		onFilter,
		autoFocus,
		placeholder,
		value,
		disabled,
		...rest
	} = props;
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	const placeholderLabel = placeholder || t('LIST_FILTER_LABEL', { defaultValue: 'Filter' });
	const inputProps = {
		'data-test': rest['data-test'],
		'data-feature': rest['data-feature'],
		id,
		name: 'search',
		type: 'search',
		value,
		placeholder: placeholderLabel,
		autoComplete: 'off',
		disabled,
		className: classNames(theme.search),
		'aria-label': placeholderLabel,
		onBlur:
			onBlur &&
			(event => {
				onBlur(event, event.target.value);
			}),
		onFocus: onFocus && (event => onFocus(event, event.target.value)),
		onChange: event => onFilter(event, event.target.value),
		onKeyDown: event => onKeyDown(event, onClear, forceBlur),
		autoFocus,
		role: 'searchbox',
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
	autoFocus: PropTypes.bool,
	id: PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	onBlur: PropTypes.func,
	onClear: PropTypes.func,
	onFocus: PropTypes.func,
	onFilter: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	'data-test': PropTypes.string,
	'data-feature': PropTypes.string,
	disabled: PropTypes.bool,
};

/**
 * @param {object} props react props
 * @example
 <FilterBar id="my-filter" docked="false" onFilter="filter()"></Filter>
 */
export default function FilterBar(props) {
	const { onFocus, onBlur, onToggle, onFilter } = props;
	const [focus, setFocus] = useState();
	const [value, setValue] = useState();
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	useEffect(() => {
		// in controlled mode, if the value changes, replace the current value
		setValue(props.value);
	}, [props.value]);

	const onFocusCallback = useCallback(
		event => {
			setFocus(true);
			if (onFocus) {
				onFocus(event);
			}
		},
		[onFocus, setFocus],
	);

	const onBlurCallback = useCallback(
		event => {
			setFocus(false);
			if (onBlur) {
				onBlur(event);
			}
			if (!value && onToggle) {
				onToggle(event);
			}
		},
		[onBlur, onToggle, setFocus, value],
	);

	const onFilterCallback = useCallback(
		event => {
			setValue(event.target.value);
			if (onFilter) {
				onFilter(event, event.target.value);
			}
		},
		[onFilter, setValue],
	);

	const onClearCallback = useCallback(
		event => {
			// needed to avoid blur of the input
			event.preventDefault();
			onFilterCallback({ target: { value: '' } });
		},
		[onFilterCallback],
	);

	const onSubmit = useCallback(
		event => {
			event.preventDefault();
			return onFilterCallback(event);
		},
		[onFilterCallback],
	);

	if (props.dockable && props.docked) {
		return (
			<Action
				id={props.id}
				className={props.className}
				onClick={props.onToggle}
				label={t('LIST_FILTER_TOGGLE', { defaultValue: 'Toggle filter' })}
				hideLabel
				icon="talend-search"
				bsStyle="link"
				data-feature={props['data-feature']}
				tooltipPlacement={props.tooltipPlacement}
				role="search"
			/>
		);
	}

	const classes = classNames(theme.filter, props.className, {
		[theme.highlight]: props.highlight,
		[theme.navbar]: props.navbar,
	});

	return (
		<form className={classes} role="search" onSubmit={onSubmit}>
			<div
				className={classNames('form-group', {
					[theme.animate]: props.dockable,
				})}
			>
				<Icon
					name="talend-search"
					className={classNames(theme['search-icon'], {
						[theme['search-focused']]: focus,
					})}
				/>
				<FilterInput
					disabled={props.disabled}
					data-feature={props['data-feature']}
					data-test={props['data-test']}
					autoFocus={props.autoFocus}
					id={props.id && `${props.id}-input`}
					debounceMinLength={props.debounceMinLength}
					debounceTimeout={props.debounceTimeout}
					onBlur={onBlurCallback}
					onClear={onClearCallback}
					onFocus={onFocusCallback}
					onFilter={onFilterCallback}
					onToggle={props.onToggle}
					placeholder={props.placeholder}
					value={value}
					dockable={props.dockable}
					t={t}
				/>
				{value ? (
					<Action
						className={theme.remove}
						id={props.id && `${props.id}-cross-icon`}
						data-test={props['data-test'] && `${props['data-test']}-reset`}
						data-feature={props['data-feature'] && `${props['data-feature']}-reset`}
						bsStyle="link"
						icon="talend-cross"
						label={t('LIST_FILTER_REMOVE', { defaultValue: 'Remove filter' })}
						hideLabel
						tooltipPlacement={props.tooltipPlacement}
						onMouseDown={onClearCallback}
					/>
				) : null}
			</div>
		</form>
	);
}

FilterBar.propTypes = {
	autoFocus: PropTypes.bool,
	id: PropTypes.string,
	className: PropTypes.string,
	'data-test': PropTypes.string,
	'data-feature': PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	docked: PropTypes.bool,
	dockable: PropTypes.bool,
	navbar: PropTypes.bool,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onFilter: PropTypes.func.isRequired,
	onToggle: PropTypes.func,
	highlight: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	tooltipPlacement: PropTypes.string,
	disabled: PropTypes.bool,
};

FilterBar.defaultProps = {
	autoFocus: true,
	dockable: true,
	docked: true,
	navbar: true,
	disabled: false,
	className: '',
};
