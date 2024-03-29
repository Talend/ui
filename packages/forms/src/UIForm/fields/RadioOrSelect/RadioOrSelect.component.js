import PropTypes from 'prop-types';
import Radio from '../Radios';
import Select from '../Select';

const MAX_TO_RADIO = 2;

export default function RadioOrSelect(props) {
	if (props.schema.titleMap && props.schema.titleMap.length <= MAX_TO_RADIO) {
		return <Radio {...props} />;
	}
	return <Select {...props} />;
}

if (process.env.NODE_ENV !== 'production') {
	RadioOrSelect.propTypes = {
		schema: PropTypes.shape({ titleMap: PropTypes.array }),
	};
}

RadioOrSelect.defaultProps = { schema: {} };
