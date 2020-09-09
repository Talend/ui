import React from 'react';

import Link from '../../Link';

import * as S from './SkipLinks.style';

export type SkipLinksProps = {
	nav?: boolean;
	main?: boolean;
};

const SkipLinks: React.FC<SkipLinksProps> = ({ nav, main }: SkipLinksProps) => {
	return (
		<S.SkipLinks className="skip-links">
			<ul>
				{nav && (
					<li key="nav">
						<Link className="skip-links__link" href="#nav">
							Go to navigation
						</Link>
					</li>
				)}
				{main && (
					<li key="main">
						<Link className="skip-links__link" href="#main">
							Go to main content
						</Link>
					</li>
				)}
			</ul>
		</S.SkipLinks>
	);
};

export default SkipLinks;
