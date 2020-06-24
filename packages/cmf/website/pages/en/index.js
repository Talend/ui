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
			<Logo img_src={`${baseUrl}img/react.png`} />
			<div className="inner">
				<ProjectTitle siteConfig={siteConfig} />
				<PromoSection>
					<Button siteConfig={siteConfig} href="#try">
						Try It Out
					</Button>
					<Button siteConfig={siteConfig} href={docUrl('getting-started')}>
						Getting started
					</Button>
					<Button siteConfig={siteConfig} href={docUrl('examples')}>
						Examples
					</Button>
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
			<MarkdownBlock>
				{`**React**: for rendering

**Redux** to centralize state

**Saga** to manage effects
`}
			</MarkdownBlock>
		</div>
	);
}

function Index(props) {
	const { config: siteConfig, language = '' } = props;
	const { baseUrl } = siteConfig;

	const TryOut = () => (
		<Block id="try" align="left" background="light">
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
		<Block align="left">
			{[
				{
					title: 'Why CMF ?',
					content: `
* add a framework thin layer so every teams work the same way
* bring a set of common addons to have same solutions
* it must be easy to extend an app (entreprise version of it)
* it must be easy to use any components library with it
					`,
					image: `${baseUrl}img/books.png`,
					imageAlign: 'right',
				},
			]}
		</Block>
	);

	const Features = () => (
		<Block layout="fourColumn">
			{[
				{
					title: 'Settings',
					content: 'Control all your components without code.',
					image: `${baseUrl}img/settings.svg`,
					imageAlign: 'top',
					imageLink: '/cmf/docs/core-settings',
				},
				{
					title: 'Registry for DI',
					content: 'You can use dependency injection every where',
					image: `${baseUrl}img/di.svg`,
					imageAlign: 'top',
					imageLink: '/cmf/docs/core-registry',
				},
			]}
		</Block>
	);

	return (
		<div>
			<HomeSplash siteConfig={siteConfig} language={language} />
			<div className="mainContainer">
				<Features />
				<FeatureCallout />
				<TryOut />
				<Description />
			</div>
		</div>
	);
}

module.exports = Index;
