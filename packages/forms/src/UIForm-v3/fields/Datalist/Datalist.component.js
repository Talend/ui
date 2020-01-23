import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';
import DataListComponent from '@talend/react-components/lib/Datalist';
import FieldTemplate from '../../templates/FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../templates/utils';
import { I18N_DOMAIN_FORMS } from '../../constants';

const onEventGetValue = ([, payload]) => payload.value;

function Datalist(props) {
	const {
		defaultValue,
		description,
		inProgress,
		label,
		resolveName = val => val,
		restricted,
		rules,
		titleMap: titleMapFormProps,
		...rest
	} = props;
	const { id, name, required } = rest;
	const { control, errors, watch } = useFormContext();

	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const value = watch(name);
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const error = get(errors, name);

	const { multiSection, type } = rest;
	const titleMap = useMemo(() => {
		if (restricted || !value) {
			return titleMapFormProps;
		}

		const values = type === 'array' ? value : [value];
		const titleMapFind = multiSection
			? titleMapFormProps.reduce((accu, current) => {
					accu.push(...current.suggestions);
					return accu;
			  }, [])
			: titleMapFormProps;
		const createCustomValue = nextValue => {
			if (multiSection) {
				return {
					title: t('TF_DATALIST_CUSTOM_SECTION', { defaultValue: 'CUSTOM' }),
					suggestions: [{ name: resolveName(nextValue), value }],
				};
			}
			return { name: resolveName(nextValue), nextValue };
		};

		const additionalOptions = values
			.filter(nextValue => !titleMapFind.find(option => option.value === nextValue))
			.map(nextValue => createCustomValue(nextValue))
			.reduce((acc, titleMapEntry) => {
				acc.push(titleMapEntry);
				return acc;
			}, []);
		return titleMapFormProps.concat(additionalOptions);
	}, [restricted, titleMapFormProps, value, multiSection, type, t]);

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			error={error}
			errorId={errorId}
			id={id}
			label={label}
			inProgress={inProgress}
		>
			<Controller
				as={DataListComponent}
				control={control}
				rules={rules}
				onChange={onEventGetValue}
				//onBlur={onEventGetValue}
				name={name}
				defaultValue={defaultValue}
				{...rest}
				titleMap={titleMap}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!!error}
				aria-required={required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string,
		defaultValue: PropTypes.string,
		description: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.string.isRequired,
		resolveName: PropTypes.func,
		restricted: PropTypes.bool,
		rules: PropTypes.object,
		titleMap: PropTypes.array,
	};
}

export default React.memo(Datalist);
