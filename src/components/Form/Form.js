import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledForm = styled.form`
	width: 100%;
`;

function Form({ children }) {
	return <StyledForm>{children}</StyledForm>;
}

Form.propTypes = {
	autocomplete: PropTypes.string,
	name: PropTypes.string,
	novalidate: PropTypes.string,
};

export default Form;
