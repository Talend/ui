import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import Link from '../../../Link';
import tokens from '../../../../tokens';

const FileField = styled.div`
	position: relative;
	border: 1px dashed ${tokens.colors.silverChalice};
	border-radius: ${tokens.radii.inputBorderRadius};

	&:hover {
		border-color: ${tokens.colors.black};
	}

	.file {
		&__text {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		&__input {
			opacity: 0;
		}
	}
`;

function FileTemplate(props) {
	return (
		<FileField>
			<div className="file__text">
				<span>
					Drop your files or <Link>browse</Link>
				</span>
			</div>
			<div className="file__input">
				<Input type="file" {...props} />
			</div>
		</FileField>
	);
}

function File(props) {
	return <Input as={FileTemplate} {...props} />;
}

export default File;
