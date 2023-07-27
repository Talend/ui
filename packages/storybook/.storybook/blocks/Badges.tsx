import { Fragment, useContext, useEffect, useState } from 'react';
import { DocsContext } from '@storybook/blocks';
import type { Globals } from '@storybook/csf';
import type { DocsContextProps } from '@storybook/types';
import { Helmet } from 'react-helmet';
import { BackToTop, TableOfContents } from 'storybook-docs-toc';
import { Divider, Form, StackVertical } from '@talend/design-system';
import { BadgeFigma, BadgeI18n, BadgeReact, BadgeStorybook, Badges } from '~docs';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import { ComponentStatus, Status } from '.storybook/docs/StatusTable';

const useGlobalsCustom = (context: DocsContextProps): [Globals] => {
	const storyContext = context.getStoryContext(context.storyById());
	const [globals, setGlobals] = useState(storyContext.globals);

	useEffect(() => {
		const cb = (changed: { globals: Globals }) => {
			setGlobals(changed.globals);
		};
		context.channel.on(GLOBALS_UPDATED, cb);
		return () => context.channel.off(GLOBALS_UPDATED, cb);
	}, []);

	return [globals];
};

type BadgesBlockProps = {
	status?: ComponentStatus;
	figmaLink?: string;
};

export function BadgesBlock({ status = {}, figmaLink }: BadgesBlockProps) {
	const context = useContext(DocsContext);
	const { story } = context.resolveOf('story', ['story']);
	const { id, parameters, title } = story;

	const [globals] = useGlobalsCustom(context);

	const titleArray = title.split('/');

	const docsTitle = title.replace(/\//gi, ' / ');
	const docsCategory = titleArray[0];

	console.log('[GNI]-- stop');
	const githubLink =
		'https://github.com/Talend/ui/tree/master/packages/design-system/' +
		parameters.fileName
			.split('/')
			.slice(1, parameters.fileName.split('/').length - 1)
			.join('/')
			.replace('/docs', '');

	const isDesignSystemElementPage = ['design system'].find(term => {
		return title?.toLocaleLowerCase().startsWith(term);
	});

	return (
		<>
			<Helmet>
				<title>{docsTitle}</title>
				<meta property="og:title" content={titleArray[titleArray.length - 1]} />
				<meta property="og:type" content="article" />
				<meta property="og:url" content={`https://design.talend.com/?path=/docs/${id}`} />
				<meta
					property="og:image"
					content={`https://via.placeholder.com/1000x500/F3F3F3/FF6D70?text=${docsTitle}`}
				/>
				{titleArray.length > 1 && <meta property="article:section" content={docsCategory} />}
			</Helmet>

			{/* <TableOfContents>
			</TableOfContents> */}

			<Badges>
				<BadgeFigma status={status.figma} href={figmaLink} />
				<BadgeStorybook status={status.storybook} />
				<BadgeReact status={status.react} href={githubLink} />
				<BadgeI18n status={status.i18n} />
			</Badges>

			<BackToTop />
		</>
	);
}
