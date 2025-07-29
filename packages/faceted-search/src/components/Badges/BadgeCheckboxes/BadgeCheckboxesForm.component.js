/* eslint-disable jsx-a11y/no-autofocus */
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import get from 'lodash/get';
import PropTypes from 'prop-types';

import {
	ButtonPrimary,
	ButtonTertiary,
	Divider,
	Form,
	SkeletonHeading,
	StackVertical,
} from '@talend/design-system';
import { getDataAttrFromProps } from '@talend/utils';

import { I18N_DOMAIN_FACETED_SEARCH } from '../../../constants';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

import styles from './BadgeCheckboxes.module.scss';

const createCheckboxEntity = value => checkbox => {
	const entity = value.find(v => v.id === checkbox.id);
	return {
		id: checkbox.id,
		label: checkbox.label,
		checked: entity ? entity.checked : checkbox.checked || false,
	};
};

const getCheckboxes = (checkboxes, value, filterValue, showAll) => {
	const formatFilterValue = filterValue.trim().toLocaleLowerCase();

	return checkboxes
		.filter(checkbox => get(checkbox, 'label', '').toLocaleLowerCase().includes(formatFilterValue))
		.map(createCheckboxEntity(value))
		.filter(checkbox => (showAll ? true : checkbox.checked));
};

const BadgeCheckboxesForm = ({
	checkboxValues,
	id,
	onChange,
	onSubmit,
	value,
	feature,
	filterBarPlaceholder,
	allSelector,
	...rest
}) => {
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
	const [filter, setFilter] = useState('');
	const [showAll, setShowAll] = useState(true);
	const leftBtnLabel = showAll
		? t('NB_SELECTED_TAGS', { count: value.length, defaultValue: '{{count}} selected' })
		: t('SHOW_ALL_TAGS', { defaultValue: 'Show all' });

	const badgeCheckBoxesFormId = `${id}-checkboxes-form`;
	const checkboxes = useCallback(getCheckboxes(checkboxValues, value, filter, showAll), [
		checkboxValues,
		value,
		filter,
		showAll,
	]);
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const onChangeCheckBoxes = (event, checkboxId) => {
		const entity = checkboxes.find(checkboxValue => checkboxValue.id === checkboxId);
		if (entity) {
			entity.checked = event.target.checked;
		}
		onChange(
			event,
			checkboxes.filter(c => c.checked),
		);
	};
	const onToggleAll = event => {
		const checked = event.target.checked;
		if (checked) {
			const checkedCheckboxes = checkboxes.map(entity => ({ ...entity, checked: true }));
			onChange(event, checkedCheckboxes);
		} else {
			onChange(event, []);
		}
	};
	return (
		<Fragment>
			<Form id={`${badgeCheckBoxesFormId}-form`} onSubmit={onSubmit}>
				{allSelector ? (
					<>
						<Form.Checkbox
							key="selectAll"
							id={'selectAll-checkbox'}
							onChange={onToggleAll}
							label={t('FACETED_SEARCH_VALUE_ALL', {
								defaultValue: 'All',
							})}
							checked={checkboxes.filter(c => c.checked).length === checkboxValues.length}
							data-test="badge-checkbox-form-checkbox-selectAll"
							data-testid="badge-checkbox-form-checkbox-selectAll"
						/>
						<Divider orientation="horizontal" />
					</>
				) : (
					<Form.Search
						id={`${badgeCheckBoxesFormId}-filter`}
						placeholder={
							filterBarPlaceholder ||
							t('FIND_COLUMN_FILTER_PLACEHOLDER', {
								defaultValue: 'Find a column',
							})
						}
						onChange={event => {
							setFilter(event?.target?.value || '');
						}}
						value={filter}
						data-test="badge-checkbox-form-filter"
						data-testid="badge-checkbox-form-filter"
					/>
				)}
				<div className={styles['fs-badge-checkbox-form-checkboxes']}>
					{!rest.isLoading ? (
						<StackVertical gap="S">
							{checkboxes.map(checkbox => {
								return (
									<Form.Checkbox
										key={checkbox.id}
										id={`${checkbox.id}-checkbox`}
										label={checkbox.label}
										onChange={event => {
											onChangeCheckBoxes(event, checkbox.id);
										}}
										checked={checkbox.checked}
										data-testid={`badge-checkbox-form-checkbox-${checkbox.id}`}
										data-test={`badge-checkbox-form-checkbox-${checkbox.id}`}
									/>
								);
							})}
						</StackVertical>
					) : (
						<StackVertical
							gap="S"
							data-testid="badge-checkbox-form-skeleton-item"
							data-test="badge-checkbox-form-skeleton-item"
						>
							<SkeletonHeading size="L" width="100" />
							<SkeletonHeading size="L" width="100" />
							<SkeletonHeading size="L" width="100" />
						</StackVertical>
					)}
				</div>
				<Form.Buttons padding={{ x: 0, bottom: 0, top: 'M' }}>
					{value.length > 0 && (
						<ButtonTertiary
							type="button"
							onClick={() => {
								setFilter('');
								setShowAll(!showAll);
							}}
						>
							{leftBtnLabel}
						</ButtonTertiary>
					)}
					<ButtonPrimary
						data-feature={applyDataFeature}
						type="submit"
						disabled={rest.isLoading}
						{...getDataAttrFromProps(rest)}
					>
						{t('APPLY', { defaultValue: 'Apply' })}
					</ButtonPrimary>
				</Form.Buttons>
			</Form>
		</Fragment>
	);
};

BadgeCheckboxesForm.propTypes = {
	checkboxValues: PropTypes.arrayOf(
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
	filterBarPlaceholder: PropTypes.string,
	allSelector: PropTypes.bool,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeCheckboxesForm };
