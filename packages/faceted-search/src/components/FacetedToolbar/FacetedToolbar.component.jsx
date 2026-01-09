import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import { FACETED_MODE, USAGE_TRACKING_TAGS } from '../../constants';

import styles from './FacetedToolbar.module.css';

const SwitchFacetedMode = ({ facetedMode, onChange, t }) => (
	<Form className={styles['tc-faceted-switch-mode']}>
		<Form.ToggleSwitch
			label={t('FACETED_SEARCH_QUERY', 'Query')}
			checked={facetedMode === FACETED_MODE.ADVANCED}
			onChange={() =>
				onChange(facetedMode === FACETED_MODE.BASIC ? FACETED_MODE.ADVANCED : FACETED_MODE.BASIC)
			}
			data-feature={
				facetedMode === FACETED_MODE.BASIC
					? USAGE_TRACKING_TAGS.BASIC
					: USAGE_TRACKING_TAGS.ADVANCED
			}
		/>
	</Form>
);

SwitchFacetedMode.propTypes = {
	facetedMode: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

const FacetedToolbar = ({ children, facetedMode, id, onChangeFacetedMode, t }) => (
	<div id={`${id}-toolbar`} className={styles['tc-faceted-toolbar']}>
		{children}
		<SwitchFacetedMode id={id} facetedMode={facetedMode} onChange={onChangeFacetedMode} t={t} />
	</div>
);

FacetedToolbar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	facetedMode: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChangeFacetedMode: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { FacetedToolbar };
