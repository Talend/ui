# Contributing

Please use this template in order to add a new Design System element documentation.

Each new element should have this hierarchy

```
├── Component.style.ts
├── Component.test.js
├── Component.tsx
├── docs
│   └── Component.stories.mdx
├── index.ts
└── variations
    ├── Component.a.tsx
    └── Component.b.tsx
```

## Documentation

```markdown
import { Meta, Story } from '@storybook/addon-docs/blocks';
import { FigmaImage, FigmaLink, Use } from '../../../docs';

<Meta title="Components/Title"/>

# Title

Description 

## Zoning

<FigmaImage
    src=""
    alt="zoning image"
/>

## Style

### Sizes 

### Variations

## States

## Interactions

## Content 

## Usage

## Accessibility

```
