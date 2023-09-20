import { Fragment } from 'react';
import PropTypes from 'prop-types';
import RowLabel from '../RowLabel';
import { Form, SizedIcon } from '@talend/design-system';

const RowCheckbox = ({
	dataFeature,
	description,
	id,
	label,
	locked = false,
	onChange,
	checked = false,
	intermediate = false,
}) => {
	const onChangeCheckbox = event => {
		// Force to pass a checked state in case of intermediate checkbox
		const checkedState = intermediate ? true : event.target.checked;
		onChange(checkedState, label);
	};
	const describedby = `${id}-${description}`;
	return locked ? (
		<Fragment>
			<SizedIcon name="locker-closed" size="M"></SizedIcon>
			<RowLabel label={label} />
		</Fragment>
	) : (
		<Fragment>
			<Form.Checkbox
				checked={checked}
				data-feature={dataFeature}
				aria-describedby={describedby}
				id={`${id}-checkbox-${label.replace(/\s+/g, '-')}`}
				label={label}
				onChange={onChangeCheckbox}
				indeterminate={intermediate}
			/>
			<div id={describedby} className="sr-only">
				{description}
			</div>
		</Fragment>
	);
};

RowCheckbox.propTypes = {
	dataFeature: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	locked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	intermediate: PropTypes.bool,
};

export default RowCheckbox;
