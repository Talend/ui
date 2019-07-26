import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions } from '@talend/react-components/lib/Actions';
import ActionIconToggle from '@talend/react-components/lib/Actions/ActionIconToggle';
import { useTranslation } from 'react-i18next';
import Widget from '../../Widget';
import { I18N_DOMAIN_FORMS } from '../../../constants';

import theme from './CollapsibleFieldset.scss';

function defaultTitle(_, schema) {
	return schema.title;
}

export default function createCollapsibleFieldset(title = defaultTitle) {
	function CollapsibleFieldset(props) {
		function toggle(event) {
			event.stopPropagation();
			event.preventDefault();
			const payload = {
				schema: props.schema,
				value: {
					...props.value,
					isClosed: !props.value.isClosed,
				},
			};
			props.onChange(event, payload);
		}

		const { id, schema, value, ...restProps } = props;
		const { t } = useTranslation(I18N_DOMAIN_FORMS);
		const { items } = schema;
		const iconTransform = !props.value.isClosed ? 'flip-vertical' : null;
		const expandLabel = t('FIELDSET_EXPAND', { defaultValue: 'Expand' });
		const collapseLabel = t('FIELDSET_COLLAPSE', { defaultValue: 'Collapse' });

		return (
			<fieldset
				className={classNames('form-group', theme['collapsible-panel'], 'collapsible-panel')}
			>
				<div
					onDoubleClick={toggle}
					id={id && `${id}__title_bar`}
					role="button"
					className={theme['title-bar']}
				>
					<div // eslint-disable-line jsx-a11y/no-static-element-interactions
						onClick={toggle}
						id={id && `${id}__title_wrapper`}
						role="button"
						className={theme.title}
					>
						<legend id={id && `${id}__title`}>{title(value, schema)}</legend>
					</div>
					<div className={theme['action-wrapper']}>
						{props.actions.length > 0 && (
							<Actions className={theme.actions} actions={props.actions} />
						)}
						<ActionIconToggle
							className={theme.collapse}
							onClick={toggle}
							id={id && `${id}__collapse`}
							label={props.value.isClosed ? expandLabel : collapseLabel}
							type="button"
							active={!value.isClosed}
							icon="talend-caret-down"
							iconTransform={iconTransform}
						/>
					</div>
				</div>
				{!value.isClosed && (
					<div className={theme.body}>
						{items.map((itemSchema, index) => (
							<Widget {...restProps} id={id} key={index} schema={itemSchema} value={value} />
						))}
					</div>
				)}
			</fieldset>
		);
	}

	CollapsibleFieldset.defaultProps = {
		value: {},
		actions: [],
	};
	CollapsibleFieldset.isCloseable = true;

	if (process.env.NODE_ENV !== 'production') {
		CollapsibleFieldset.propTypes = {
			id: PropTypes.string,
			onChange: PropTypes.func.isRequired,
			schema: PropTypes.shape({
				items: PropTypes.array.isRequired,
			}).isRequired,
			value: PropTypes.object,
			actions: PropTypes.array,
		};
	}

	return CollapsibleFieldset;
}
