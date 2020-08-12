import React from 'react';
import styled from 'styled-components';

export type FullHeightLayoutProps = {
	children?: any;
};

const SFullHeightLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 0;
	max-height: 100%;
	overflow: hidden;
`;
const SHeading = styled.div`
	display: flex;
	width: 100%;
`;
const SBody = styled.div`
	display: flex;
	flex-grow: 1;
	min-height: 0;
	width: 100%;
	overflow: auto;
`;
const SFooter = styled.div`
	display: flex;
	width: 100%;
`;

const FullHeightLayout: React.FC<FullHeightLayoutProps> = ({ heading, body, footer }) => {
	return (
		<SFullHeightLayout>
			<SHeading>{heading}</SHeading>
			<SBody>{body}</SBody>
			<SFooter>{footer}</SFooter>
		</SFullHeightLayout>
	);
};

export default FullHeightLayout;
