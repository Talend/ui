import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Action } from '@talend/react-components/lib/Actions';
import FilterBar from '@talend/react-components/lib/FilterBar';
import RichTooltip from '@talend/react-components/lib/RichTooltip';
import Loader from '@talend/react-components/lib/Loader';
import { CIRCULAR_PROGRESS_SIZE } from '@talend/react-components/lib/constants';
import { Checkbox } from '@talend/react-components/lib/Toggle';
import { getTheme } from '@talend/react-components/lib/theme';
import cssModule from './BadgeTags.scss';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

const theme = getTheme(cssModule);

const BadgeTag = ({ checked, id, label, onChange }) => {
	const describedby = `${id}-${label}`;
	const onChangeTag = event => {
		onChange(event, id);
	};
	return (
		<React.Fragment>
			<Checkbox
				onChange={onChangeTag}
				aria-describedby={describedby}
				id={`${id}-checkbox`}
				label={label}
				checked={checked}
			/>
			<div id={describedby} className="sr-only">
				{label}
			</div>
		</React.Fragment>
	);
};

BadgeTag.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
};

const createTagEntity = value => checkbox => {
	const entity = value.find(v => v.id === checkbox.id);
	return {
		id: checkbox.id,
		label: checkbox.label,
		checked: entity ? entity.checked : checkbox.checked || false,
	};
};

const getTags = (tagsValues, value) => tagsValues.map(createTagEntity(value));

const getVisibleTags = (tags, filterValue, showAll) => {
	const formatFilterValue = filterValue.trim().toLocaleLowerCase();

	return tags
		.filter(checkbox => get(checkbox, 'label', '').toLocaleLowerCase().includes(formatFilterValue))
		.filter(tag => (showAll ? true : tag.checked));
};

const BadgeTagsForm = ({ tagsValues, id, onChange, onSubmit, value, feature, isLoading, t }) => {
	const [filter, setFilter] = useState('');
	const [showAll, setShowAll] = useState(true);

	const badgeTagsFormId = `${id}-tags-form`;

	const tags = useMemo(() => getTags(tagsValues, value), [tagsValues, value]);
	const visibleTags = useMemo(() => getVisibleTags(tags, filter, showAll), [tags, filter, showAll]);

	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);

	const onChangeTags = (event, checkboxId) => {
		const entity = tags.find(checkboxValue => checkboxValue.id === checkboxId);
		if (entity) {
			entity.checked = event.target.checked;
		}
		onChange(
			event,
			tags.filter(c => c.checked),
		);
	};

	const leftBtnLabel = showAll
		? t('NB_SELECTED_TAGS', { count: value.length, defaultValue: '{{count}} selected' })
		: t('SHOW_ALL_TAGS', { defaultValue: 'Show all' });

	return (
		<React.Fragment>
			<FilterBar
				autoFocus={false}
				dockable={false}
				docked={false}
				iconAlwaysVisible
				id={`${badgeTagsFormId}-filter`}
				placeholder={t('FIND_TAG_FILTER_PLACEHOLDER', {
					defaultValue: 'Find a tag',
				})}
				onToggle={() => setFilter('')}
				onFilter={(_, filterValue) => setFilter(filterValue)}
				value={filter}
				disabled={isLoading}
			/>
			{isLoading && (
				<div className={theme('fs-badge-tags-form-loading')}>
					<Loader size={CIRCULAR_PROGRESS_SIZE.default} />
				</div>
			)}
			{!isLoading && (
				<form
					className={theme('fs-badge-tags-form')}
					id={`${badgeTagsFormId}-form`}
					onSubmit={onSubmit}
				>
					<RichTooltip.RichLayout.Body
						id={badgeTagsFormId}
						className={theme('fs-badge-tags-form-body')}
					>
						{!visibleTags.length && (
							<span className={theme('fs-badge-tags-form-empty')}>
								{t('FIND_TAG_NO_RESULT', {
									defaultValue: 'No result found',
								})}
							</span>
						)}

						{visibleTags.map(checkbox => (
							<BadgeTag
								key={checkbox.id}
								id={checkbox.id}
								onChange={onChangeTags}
								label={checkbox.label}
								checked={checkbox.checked}
							/>
						))}
					</RichTooltip.RichLayout.Body>
					<RichTooltip.RichLayout.Footer id={id} className={theme('fs-badge-tags-form-footer')}>
						<div>
							{value.length > 0 && (
								<Action
									type="button"
									onClick={() => {
										setFilter('');
										setShowAll(!showAll);
									}}
									label={leftBtnLabel}
									bsStyle="link"
									className={theme('fs-badge-tags-form-left-button')}
								/>
							)}
						</div>
						<Action
							data-feature={applyDataFeature}
							type="submit"
							label={t('APPLY', { defaultValue: 'Apply' })}
							bsStyle="info"
							disabled={value.length === 0}
						/>
					</RichTooltip.RichLayout.Footer>
				</form>
			)}
		</React.Fragment>
	);
};

BadgeTagsForm.propTypes = {
	tagsValues: PropTypes.arrayOf(
		PropTypes.shape({
			checked: PropTypes.bool,
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	),
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.array,
	feature: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeTagsForm };
