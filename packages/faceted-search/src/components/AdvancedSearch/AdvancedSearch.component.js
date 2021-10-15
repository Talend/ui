import React, { useState } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { Action } from '@talend/react-components/lib/Actions';
import Icon from '@talend/react-components/lib/Icon';
import CircularProgress from '@talend/react-components/lib/CircularProgress';
import FormControl from 'react-bootstrap/lib/FormControl';
import { getTheme } from '@talend/react-components/lib/theme';

import { useFacetedSearchContext } from '../context/facetedSearch.context';

import theme from './AdvancedSearch.scss';
import { USAGE_TRACKING_TAGS } from '../../constants';

const css = getTheme(theme);

const AdvancedSearchError = ({ id, label }) => (
	<p aria-live="assertive" className={css('adv-search-error')} id={`${id}-error`} role="status">
		{label}
	</p>
);

AdvancedSearchError.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export function AdvancedSearch({
	initialQuery = '',
	onCancel,
	onChange,
	onKeyDown,
	placeholder,
	onSubmit,
}) {
	const [query, setQuery] = useState(initialQuery);
	const { id, inProgress, error, t } = useFacetedSearchContext();
	const formSubmit = event => {
		event.preventDefault();
		onSubmit(event, query);
	};

	const onKeyDownHandler = event => {
		if (onKeyDown) {
			onKeyDown(event, query);
		} else {
			switch (event.keyCode) {
				case keycode.codes.enter:
					formSubmit(event);
					break;
				default:
					break;
			}
		}
	};

	const onChangeHandler = event => {
		if (onChange) {
			onChange(event, event.target.value);
		} else {
			setQuery(event.target.value);
		}
	};

	const onCancelHandler = () => {
		setQuery('');
		if (onCancel) {
			onCancel();
		}
	};
	const advSearchId = `${id}-adv-search`;
	return (
		<div id={advSearchId} className={css('adv-search')}>
			<form id={`${advSearchId}-form`} onSubmit={formSubmit}>
				<Icon name="talend-filter" className={css('adv-search-filter-icon')} />
				<FormControl
					id={`${id}-form`}
					name="advanced-search-faceted"
					type="search"
					value={query}
					placeholder={
						placeholder || t('ADV_SEARCH_FACETED_PLACEHOLDER', { defaultValue: 'Enter your query' })
					}
					autoComplete="off"
					className={css('adv-search-input', { 'has-error': error })}
					aria-label={
						placeholder || t('ADV_SEARCH_FACETED_ARIA', { defaultValue: 'Advanced Faceted Search' })
					}
					autoFocus
					role="search"
					onKeyDown={onKeyDownHandler}
					onChange={onChangeHandler}
				/>

				<div className={css('adv-search-buttons')}>
					{inProgress && <CircularProgress size="small" />}
					{!inProgress && (
						<React.Fragment>
							<Action
								bsStyle="link"
								className={css('adv-search-buttons-icon', 'adv-search-buttons-cancel')}
								data-feature={USAGE_TRACKING_TAGS.ADVANCED_CLEAR}
								hideLabel
								icon="talend-cross"
								label={t('CANCEL_TOOLTIP', { defaultValue: 'Cancel' })}
								name="action-cancel-title"
								onClick={onCancelHandler}
							/>
							<Action
								bsStyle="link"
								className={css('adv-search-buttons-icon', 'adv-search-buttons-submit')}
								data-feature={USAGE_TRACKING_TAGS.ADVANCED_APPLY}
								hideLabel
								icon="talend-check"
								label={t('SUBMIT_TOOLTIP', { defaultValue: 'Submit' })}
								name="action-submit-title"
								type="submit"
							/>
						</React.Fragment>
					)}
				</div>
			</form>
			{error && <AdvancedSearchError id={advSearchId} label={error} />}
		</div>
	);
}

AdvancedSearch.propTypes = {
	initialQuery: PropTypes.string,
	onCancel: PropTypes.func,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
};
