# Contributing

Please use this template in order to add a new Design System element documentation.

Each new element should have this hierarchy

```
├── Component.tsx
├── Component.spec.tsx     # if you need e2e tests
├── Component.stories.mdx
├── Component.stories.tsx
├── Component.style.tsx
├── Component.test.tsx     # if you need unit tests
├── index.ts
└── variations
    ├── Component.A.tsx
    └── Component.B.tsx
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

### Variations

## States

## Interactions

## Content 

## Usage

## Accessibility

```
