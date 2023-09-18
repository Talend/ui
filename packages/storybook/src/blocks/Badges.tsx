import { useContext } from 'react';
import { DocsContext, Unstyled } from '@storybook/blocks';
import { BadgeFigma, BadgeI18n, BadgeReact, BadgeStorybook, Badges } from '~docs';
import { Statuses } from '../docs/StatusTable';
// eslint-disable-next-line @talend/import-depth
import statuses from '@talend/design-system/src/stories/status.json';

export function BadgesBlock() {
	const context = useContext(DocsContext);
	const { story } = context.resolveOf('story', ['story']);
	const { id, title, componentId } = story;

	const { status = {}, figmaLink, githubLink } = (statuses as Statuses)[componentId];

	const titleArray = title.split('/');

	const docsTitle = title.replace(/\//gi, ' / ');
	const docsCategory = titleArray[0];

	return (
		<Unstyled>
			{/* 
			
			Doesn't work because it'll update iframe meta and not page meta, so when we share the link, meta won't be used
			
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

			Doesn't work anymore with SB7 DOM
			
			<TableOfContents/>
			
			*/}

			<Badges>
				<BadgeFigma status={status.figma} href={figmaLink} />
				<BadgeStorybook status={status.storybook} />
				<BadgeReact status={status.react} href={githubLink} />
				<BadgeI18n status={status.i18n} />
			</Badges>
		</Unstyled>
	);
}
