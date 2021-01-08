import React from 'react';
import styled from 'styled-components';
import { useCopyToClipboard } from 'react-use';
import Button from '../../../Button';
import Form from '../../index';
import InlineMessage from '../../../InlineMessage';

import tokens from '../../../../tokens';

const CopyButton = styled(Button.Icon)`
	height: ${tokens.sizes.xxl};
	background: ${({ theme }) => theme.colors.inputGroupInteractiveBackgroundColor};
	border-radius: 0 ${tokens.radii.inputBorderRadius} ${tokens.radii.inputBorderRadius} 0;
`;

const InputCopy = ({ value, ...rest }) => {
	const [text, setText] = React.useState(value);
	const [state, copyToClipboard] = useCopyToClipboard();

	return (
		<Form.InputGroup
			label="Copy to clipboard"
			suffix={
				<CopyButton icon="talend-files-o" onClick={() => copyToClipboard(text)}>
					Copy to clipboard
				</CopyButton>
			}
		>
			<Form.Text
				label="Token"
				value={text}
				onChange={event => setText(event.target.value)}
				{...rest}
			/>
			{state.error ? (
				<InlineMessage.Destructive title="Unable to copy value" description={state.error.message} />
			) : (
				state.value && <InlineMessage.Success description={`Copied ${state.value}`} />
			)}
		</Form.InputGroup>
	);
};

export default InputCopy;
