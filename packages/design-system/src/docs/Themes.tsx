import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

import Grid from './Grid';

import tokens from '../tokens';

function isNumeric(str: string) {
	if (typeof str !== 'string') return false;
	return !isNaN(parseFloat(str));
}

function getColorTokenNameByValue(value: any) {
	let designToken = null;
	// eslint-disable-next-line array-callback-return
	Object.entries(tokens.colors).some(([k, v]) => {
		if (typeof v === 'object' && v !== null) {
			const match = Object.entries(v).find(([kn, vn]) => isNumeric(kn) && vn === value);
			if (match) {
				designToken = `${k}[${match[0]}]`;
			}
		}
	});
	return designToken || 'there is no design token used here!';
}

const normalizeColorToken = (v: any) => (typeof v === 'string' ? v : v[500]);

const SToken = styled.div``;
const STokenName = styled.div``;
const STokenValue = styled.div``;

const SColorTokenSVG = styled.svg`
	flex-shrink: 0;
	margin: ${tokens.space.m};
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(255, 255, 255, 0.1);
	border-radius: ${tokens.radii.circleRadius};
`;

const SColorTokenDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const SColorToken = styled(SToken)`
	flex: 1;
	display: flex;
	align-items: center;
	font-family: 'Inconsolata', monospace;
`;

const SAliasItem = styled.div`
	display: flex;
	align-items: center;
	height: 7rem;
`;

const SAliasHeader = styled(SAliasItem)`
	height: 6rem;
	font-weight: 600;
`;
const SAliasNameHeader = styled(SAliasHeader)``;
const SAliasValueHeader = styled(SAliasHeader)`
	justify-content: center;
`;

const SAliasName = styled(SAliasItem)`
	display: flex;
	align-items: center;
	font-weight: normal;
	height: 100%;
	width: 100%;
	border-top: 1px solid ${tokens.colors.gray[50]};
`;
const SAliasValue = styled(SAliasItem)`
	justify-content: center;
`;

const SAlias = styled(Grid)`
	gap: 1rem;

	${SAliasItem} +
	${SAliasItem} {
		color: ${tokens.colors.gray[400]};
		background: ${tokens.colors.gray[50]};

		${SToken} {
			margin: 0 ${tokens.space.m};
			border-top: 1px solid ${tokens.colors.gray[75]};
		}
	}

	${SAliasHeader} +
	${SAliasHeader} {
		color: ${tokens.colors.gray[900]};
	}

	${SAliasItem} +
	${SAliasItem} +
	${SAliasItem} {
		color: ${tokens.colors.gray[0]};
		background: #323e48;

		${SToken} {
			border-top: 1px solid ${tokens.colors.gray[500]};
		}
	}
`;

const SAliasCategoryName = styled.h2.attrs({
	className: 'sbdocs sbdocs-h2',
})`
	margin: 20px 0 8px;
	padding-bottom: 4px;
`;

const SAliasCategoryValues = styled.div`
	${SAlias}:first-child ${SAliasHeader} {
		border-radius: 4px 4px 0 0;
	}

	${SAlias}:last-child ${SAliasValue} {
		border-radius: 0 0 4px 4px;
	}
`;

const SAliasCategory = styled.article``;

const previewWidth = 40;

const ColorToken = ({ name, theme }: { name: string; theme: DefaultTheme }) => {
	const colorName = theme.colors[name as keyof DefaultTheme['colors']];
	const normalizedColorName = normalizeColorToken(colorName);
	return (
		<SColorToken>
			<SColorTokenSVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${previewWidth} ${previewWidth}`}
				height={previewWidth}
				width={previewWidth}
			>
				<circle
					cx={previewWidth / 2}
					cy={previewWidth / 2}
					r={previewWidth / 2}
					fill={normalizedColorName}
				/>
			</SColorTokenSVG>
			<SColorTokenDetails>
				<STokenName>{getColorTokenNameByValue(normalizedColorName)}</STokenName>
				<STokenValue>{normalizedColorName}</STokenValue>
			</SColorTokenDetails>
		</SColorToken>
	);
};

const Themes = ({ themes }: { themes: DefaultTheme[] }) => {
	const categories = React.useMemo(() => {
		const keys = Object.keys(themes[0].colors);
		const newCategories: { name: string; keys: string[] }[] = [{ name: 'Semantic', keys: [] }];
		(keys as string[]).forEach((key: string) => {
			const categoryNameArr = key.split(/(?=[A-Z])/);
			const categoryName = categoryNameArr[0];
			if (
				categoryNameArr.length <= 2 &&
				keys.filter(k => k.startsWith(categoryName)).length === 1
			) {
				newCategories[0].keys.push(key);
			} else {
				const categoryFound = newCategories.find(category =>
					category.name.toLocaleLowerCase().includes(categoryName.toLocaleLowerCase()),
				);
				if (!categoryFound) {
					newCategories.push({
						name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
						keys: [key],
					});
				} else {
					categoryFound.keys.push(key);
				}
			}
		});
		return newCategories;
	}, [themes]);

	return categories.map(({ name: categoryName, keys: categoryValues }, i) => (
		<SAliasCategory key={i}>
			<SAliasCategoryName id={categoryName}>{categoryName} colors</SAliasCategoryName>
			<SAliasCategoryValues>
				<SAlias key={categoryName}>
					<SAliasNameHeader>Alias</SAliasNameHeader>
					<SAliasValueHeader>☀️ Light Theme</SAliasValueHeader>
					<SAliasValueHeader>🌙 Dark Theme</SAliasValueHeader>
				</SAlias>
				{categoryValues.map((key, j) => (
					<SAlias key={j}>
						<SAliasName>{key}</SAliasName>
						{themes.map((theme, k) => (
							<SAliasValue key={k}>
								<ColorToken theme={theme} name={key} />
							</SAliasValue>
						))}
					</SAlias>
				))}
			</SAliasCategoryValues>
		</SAliasCategory>
	));
};

export default Themes;
