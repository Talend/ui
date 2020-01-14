import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import FormControl from 'react-bootstrap/lib/FormControl';
import keycode from 'keycode';
import { withTranslation } from 'react-i18next';
import { Action } from '../Actions';
import Icon from '../Icon';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';
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
		t,
		...rest
	} = props;

	const inputProps = {
		'data-test': rest['data-test'],
		id,
		name: 'search',
		type: 'search',
		value,
		placeholder,
		autoComplete: 'off',
		className: classNames(theme.search),
		'aria-label': placeholder || t('LIST_FILTER_LABEL', { defaultValue: 'Filter' }),
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
	t: PropTypes.func.isRequired,
};

/**
 * @param {object} props react props
 * @example
 <FilterBar id="my-filter" docked="false" onFilter="filter()"></Filter>
 */
export class FilterBarComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFilter = this.onFilter.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClear = this.onClear.bind(this);
		this.state = { focus: this.props.focus, value: this.props.value };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
	}

	onFocus(event) {
		this.setState({ focus: true });
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	}

	onBlur(event) {
		this.setState({ focus: false });
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		if (!this.state.value) {
			this.props.onToggle(event);
		}
	}

	onClear(event) {
		// needed to avoid blur of the input
		event.preventDefault();
		this.onFilter({ target: { value: '' } });
	}

	onFilter(event) {
		this.setState({ value: event.target.value });
		if (this.props.onFilter) {
			this.props.onFilter(event, event.target.value);
		}
	}

	onSubmit(event) {
		event.preventDefault();
		return this.onFilter(event);
	}

	render() {
		const { t } = this.props;
		if (this.props.dockable && this.props.docked) {
			return (
				<Action
					id={this.props.id}
					className={this.props.className}
					onClick={this.props.onToggle}
					label={t('LIST_FILTER_TOGGLE', { defaultValue: 'Toggle filter' })}
					hideLabel
					icon="talend-search"
					bsStyle="link"
					data-feature={this.props['data-feature']}
					tooltipPlacement={this.props.tooltipPlacement}
					role="search"
				/>
			);
		}

		const classes = classNames(theme.filter, this.props.className, {
			[theme.highlight]: this.props.highlight,
			[theme.navbar]: this.props.navbar,
		});

		return (
			<form className={classes} role="search" onSubmit={this.onSubmit}>
				<div
					className={classNames('form-group', {
						[theme.animate]: this.props.dockable,
					})}
				>
					<Icon
						name="talend-search"
						className={classNames(theme['search-icon'], {
							[theme['search-focused']]: this.state.focus,
						})}
					/>
					<FilterInput
						data-test={this.props['data-test']}
						autoFocus={this.props.autoFocus}
						id={this.props.id && `${this.props.id}-input`}
						debounceMinLength={this.props.debounceMinLength}
						debounceTimeout={this.props.debounceTimeout}
						onBlur={this.onBlur}
						onClear={this.onClear}
						onFocus={this.onFocus}
						onFilter={this.onFilter}
						onToggle={this.props.onToggle}
						placeholder={this.props.placeholder}
						value={this.state.value}
						dockable={this.props.dockable}
						t={t}
					/>
					{this.state.value ? (
						<Action
							className={theme.remove}
							id={this.props.id && `${this.props.id}-cross-icon`}
							bsStyle="link"
							icon="talend-cross"
							label={t('LIST_FILTER_REMOVE', { defaultValue: 'Remove filter' })}
							hideLabel
							tooltipPlacement={this.props.tooltipPlacement}
							onMouseDown={this.onClear}
						/>
					) : null}
				</div>
			</form>
		);
	}
}

FilterBarComponent.displayName = 'FilterBar';
FilterBarComponent.propTypes = {
	autoFocus: PropTypes.bool,
	id: PropTypes.string,
	className: PropTypes.string,
	'data-test': PropTypes.string,
	'data-feature': PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	docked: PropTypes.bool,
	dockable: PropTypes.bool,
	focus: PropTypes.bool,
	navbar: PropTypes.bool,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onFilter: PropTypes.func.isRequired,
	onToggle: PropTypes.func,
	highlight: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	tooltipPlacement: PropTypes.string,
	t: PropTypes.func.isRequired,
};

FilterBarComponent.defaultProps = {
	autoFocus: true,
	dockable: true,
	docked: true,
	navbar: true,
	focus: false,
	placeholder: 'Filter',
	t: getDefaultT(),
	className: '',
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(FilterBarComponent);
