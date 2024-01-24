import { useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ButtonPrimary, Form, InlineMessageDestructive } from '@talend/design-system';
import Icon from '@talend/react-components/lib/Icon';
import Slider from '@talend/react-components/lib/Slider';

import { getApplyDataFeature, getDataAttributesFrom } from '../../../helpers/usage.helpers';

import styles from './BadgeSlider.module.scss';

const getSliderMode = ({ name }) => {
	switch (name) {
		case 'greaterThan':
			return Slider.MODES.GREATER_THAN;
		case 'equals':
			return Slider.MODES.EQUALS;
		default:
			return null;
	}
};

const getValidator = (decimal, min, max) => v =>
	(v != null && (v < min || v > max)) || (!decimal && v % 1 !== 0);
const getErrorMessage = (t, decimal, min, max, value) => {
	if (!decimal && value % 1 !== 0) {
		return t('FACETED_SEARCH_VALUE_SHOULD_BE_AN_INTEGER', {
			defaultValue: 'Please fill with an integer value',
		});
	}
	if (value < min || value > max) {
		return t('FACETED_SEARCH_VALUES_OUT_OF_RANGE', {
			defaultValue: 'The value must be between {{min}} and {{max}}',
			min,
			max,
		});
	}
	return null;
};

const BadgeSliderForm = ({
	id,
	onChange,
	onSubmit,
	feature,
	t,
	unit,
	icon,
	operator = {},
	decimal = false,
	min = 0,
	max = 100,
	step = 1,
	value: initialValue = min,
	defaultValue,
	...rest
}) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const [value, setValue] = useState(initialValue);
	const [slider, setSlider] = useState(initialValue);
	const [input, setInput] = useState(initialValue);
	const [editing, setEditing] = useState(false);
	const error = useMemo(
		() => getErrorMessage(t, decimal, min, max, input),
		[t, decimal, min, max, input],
	);
	const isErroneous = useMemo(() => getValidator(decimal, min, max), [decimal, min, max]);

	useEffect(() => onChange(null, value), [onChange, value]);

	return (
		<Form id={`${id}-slider`} onSubmit={onSubmit}>
			<div className={styles['tc-badge-slider-form-body']}>
				<div className={styles['tc-badge-slider-form-body-row']}>
					{icon && (
						<div className={styles['tc-badge-slider-form-body-row-icon']}>
							<Icon
								name={icon.name}
								className={classnames(styles['tc-badge-icon'], icon.class || icon.className)}
							/>
						</div>
					)}
					<div className={styles['tc-badge-slider-form-body-row-value']}>
						{editing ? (
							<Form.Number
								id={`${id}-input`}
								min={min}
								max={max}
								step={step}
								onChange={event => {
									const v = event.target.value;
									setInput(v);
									setValue(!isErroneous(v) ? v : defaultValue);
								}}
								onBlur={() => {
									setInput(value);
									setValue(value);
									setSlider(value);
									setEditing(false);
								}}
								value={input}
							/>
						) : (
							<button
								className={styles['tc-badge-value-unit']}
								onClick={() => setEditing(true)}
								title={t('FACETED_SEARCH_EDIT_DIRECTLY', {
									defaultValue: 'Edit directly',
								})}
								aria-label={t('FACETED_SEARCH_EDIT_DIRECTLY', {
									defaultValue: 'Edit directly',
								})}
							>
								{value}
								{unit}
							</button>
						)}
					</div>
				</div>
				<Slider
					value={slider}
					captionTextStepNumber={2}
					mode={getSliderMode(operator)}
					onChange={v => {
						setValue(v);
						setInput(v);
						setSlider(v);
					}}
					min={min}
					max={max}
					step={step}
					hideTooltip
				/>
				{error && <InlineMessageDestructive description={error} />}
			</div>
			<Form.Buttons padding={{ x: 0, bottom: 0, top: 'M' }}>
				<ButtonPrimary
					type="submit"
					data-feature={applyDataFeature}
					disabled={!!error}
					{...getDataAttributesFrom(rest)}
				>
					{t('APPLY', { defaultValue: 'Apply' })}
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

BadgeSliderForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.number,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	unit: PropTypes.string,
	decimal: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	defaultValue: PropTypes.number,
	icon: PropTypes.shape({
		name: PropTypes.string,
		class: PropTypes.string,
		className: PropTypes.string,
	}),
	operator: PropTypes.shape({
		name: PropTypes.string,
	}),
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSliderForm };
