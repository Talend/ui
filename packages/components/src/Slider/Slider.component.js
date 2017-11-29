import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';
import theme from './Slider.scss';

function Slider({ id, defaultValue }) {
	return (
		<div id={id} className={theme['tc-slider-container']}>
			<RcSlider className={theme['tc-slider']} defaultValue={defaultValue} />
		</div>
	);
}

Slider.propTypes = {
	id: PropTypes.string,
	defaultValue: PropTypes.number,
	// t: PropTypes.func.isRequired,
	// style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Slider.defaultProps = {
	defaultValue: 0,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(Slider);
