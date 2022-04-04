# Documentation template

Use the following template when creating a new `ComponentName.stories.mdx` page.

```markdown
import { Meta, Story } from '@storybook/addon-docs';
import { FigmaImage, FigmaLink, Use } from '../../docs';

<Meta
    title="Components/Title"
    parameters={{
		status: { figma: 'wip', storybook: 'wip', react: 'wip', i18n: 'na' },
		figmaLink: 'https://www.figma.com/file/????',
	}}
/>

# Title

Description

## Zoning

<FigmaImage
    src=""
    alt="zoning image"
/>

## Style

### Variations

## States

## Interactions

## Content

## Usage

## Accessibility
```
