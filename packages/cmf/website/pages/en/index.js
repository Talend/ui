/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function SplashContainer(props) {
	return (
		<div className="homeContainer">
			<div className="homeSplashFade">
				<div className="wrapper homeWrapper">{props.children}</div>
			</div>
		</div>
	);
}

function Logo({ img_src }) {
	return (
		<div className="projectLogo">
			<img src={img_src} alt="Project Logo" />
		</div>
	);
}

function ProjectTitle({ siteConfig }) {
	return (
		<h2 className="projectTitle">
			{siteConfig.title}
			<small>{siteConfig.tagline}</small>
		</h2>
	);
}

function PromoSection({ children }) {
	return (
		<div className="section promoSection">
			<div className="promoRow">
				<div className="pluginRowBlock">{children}</div>
			</div>
		</div>
	);
}

function Button(props) {
	return (
		<div className="pluginWrapper buttonWrapper">
			<a className="button" href={props.href} target={props.target}>
				{props.children}
			</a>
		</div>
	);
}

function HomeSplash(props) {
	const { siteConfig, language = '' } = props;
	const { baseUrl, docsUrl } = siteConfig;
	const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
	const langPart = `${language ? `${language}/` : ''}`;
	const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;


	return (
		<SplashContainer>
			<Logo img_src={`${baseUrl}img/docusaurus.svg`} />
			<div className="inner">
				<ProjectTitle siteConfig={siteConfig} />
				<PromoSection>
					<Button siteConfig={siteConfig} href="#try">Try It Out</Button>
					<Button siteConfig={siteConfig} href={docUrl('doc1.html')}>Example Link</Button>
					<Button siteConfig={siteConfig} href={docUrl('howto.html')}>Example Link 2</Button>
				</PromoSection>
			</div>
		</SplashContainer>
	);
}

function Block(props) {
	return (
		<Container padding={['bottom', 'top']} id={props.id} background={props.background}>
			<GridBlock align={props.align} contents={props.children} layout={props.layout} />
		</Container>
	);
}
Block.defaultProps = {
	align: 'center',
};

function FeatureCallout() {
	return (
		<div className="productShowcaseSection paddingBottom" style={{ textAlign: 'center' }}>
			<h2>Feature Callout</h2>
			<MarkdownBlock>These are features of this project</MarkdownBlock>
		</div>
	);
}

function Index(props) {
	const { config: siteConfig, language = '' } = props;
	const { baseUrl } = siteConfig;

	const TryOut = () => (
		<Block id="try" align="left">
			{[
				{
					title: 'Try out CMF',
					content: `
\`\`\`
npm install -g yo generator-talend
yo talend:react-cmf
\`\`\`

					`,
					image: `${baseUrl}img/try.png`,
					imageAlign: 'left',
				},
			]}
		</Block>
	);

	const Description = () => (
		<Block background="dark">
			{[
				{
					content: 'This is another description of how this project is useful',
					image: `${baseUrl}img/docusaurus.svg`,
					imageAlign: 'right',
					title: 'Description',
				},
			]}
		</Block>
	);

	const LearnHow = () => (
		<Block background="light">
			{[
				{
					content: 'Talk about learning how to use this',
					image: `${baseUrl}img/docusaurus.svg`,
					imageAlign: 'right',
					title: 'Learn How',
				},
			]}
		</Block>
	);

	const Features = () => (
		<Block layout="fourColumn">
			{[
				{
					title: 'Settings',
					content: 'cmfConnect()(Component) and your Component bring powerfull tools. [Read more](/docs/core-settings)',
					image: `${baseUrl}img/docusaurus.svg`,
					imageAlign: 'top',
				},
				{
					title: 'Registry for DI',
					content: 'start your app in just two lines of code and bring redux for free [Read more](/docs/core-registry)',
					image: `${baseUrl}img/docusaurus.svg`,
					imageAlign: 'top',
				},
			]}
		</Block>
	);

	const Showcase = () => {
		if ((siteConfig.users || []).length === 0) {
			return null;
		}

		const showcase = siteConfig.users
			.filter(user => user.pinned)
			.map(user => (
				<a href={user.infoLink} key={user.infoLink}>
					<img src={user.image} alt={user.caption} title={user.caption} />
				</a>
			));

		const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

		return (
			<div className="productShowcaseSection paddingBottom">
				<h2>Who is Using This?</h2>
				<p>This project is used by all these people</p>
				<div className="logos">{showcase}</div>
				<div className="more-users">
					<a className="button" href={pageUrl('users.html')}>
						More {siteConfig.title} Users
					</a>
				</div>
			</div>
		);
	};

	return (
		<div>
			<HomeSplash siteConfig={siteConfig} language={language} />
			<div className="mainContainer">
				<Features />
				<FeatureCallout />
				<LearnHow />
				<TryOut />
				<Description />
				<Showcase />
			</div>
		</div>
	);
}

module.exports = Index;
