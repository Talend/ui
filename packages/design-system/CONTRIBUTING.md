# Contributing
Congratulations on becoming a contributor to the design system! You are pushing the whole company upwards.

Here's what we expect our contributors to do when it comes to code.

We don't believe in giving you rigid steps to follow, we prefer guidance and a loose checklist. Always put people before processes.

## How do I know what I can do?
We have a [self-service Jira board set-up for this](https://jira.talendforge.org/secure/RapidBoard.jspa?projectKey=TUX&rapidView=1030). All the tasks in the TODO column are up for grabs!

Assign yourself to a ticket, it's all fair game.

You can also simply ask on Slack, channel #ask-designsystem.

## TL;WR
- Contribute to the design phase by offering browser-based know-how.
- You may need to write the initial Storybook PR for contributing designers.
- Get peer reviews on the API of your component before moving on to the implementation.
- Follow the basic structure of a component/layout folder in the repository and use the [provided template for doc pages](DOCTEMPLATE.md).
```
├── Component.tsx          # Component
├── Component.spec.tsx     # Cypress tests
├── Component.stories.mdx  # Documentation and call to `<Story>`
├── Component.stories.tsx  # Actual stories written explicitely in TSX
├── Component.module.scss  # Component styles (in BEM)
├── index.ts               # Clean component export
└── private                # Internal composition elements
    ├── ComponentBrick.A.tsx
    └── ComponentBrick.B.tsx
```
- Use design tokens with a burning passion.
- Explicitness > Implicitness, always and in all things.
- Don't let consumers easily override the styles or behaviours of the component.
- Let designers review your work (don't merge and release without a designer's OK).
- Let developers outside your team review your work.

## Contributing in the design phase

### What's the design phase?

No component arrives in the design system without being thoroughly discussed "as a pattern". How should it work? When should we use it? When should we not? How does it look like? How does it look like when it's disabled/hovered/active etc... That's the design phase.

We expect developers to bring as many questions as they can during that phase.

**Their goal is to provide designers with the necessary means to create a complete specification of the component.**

It's probably the most important part of the collaboration process. Ensure the specs are as thorough as possible. Don't assume you'll be the one coding the component (you may, but somebody else might as well).

**Things you need to contribute during design:**

- Feasibility feedback (browser vs Figma)
- State requirements ("how does it look when hovered?" etc...)
- Behaviour requirements ("how should I display in error in this case?" etc...)
- Human linting ("This text is not using a design token, I can't code it!" etc...)
- Token guidance. (ex: designers may expect an icon to be an image and would use background tokens where you would use text tokens.)
- Documentation: help the design time write down and distribute the specs for the component / layout / thing they are designing. This may involve creating the necessary Storybook PR for them.
- Peer review: at the end of the design contribution, a PR for a Storybook page documenting the design must be created. If you've helped during the design phase, your review is important!

## Contribution in the implementation phase

First and foremost, go read the repository's Architecture Decision Records (ADRs). All good? great. Let's begin.

Building a component for a company-wide audience is no small feat.

Since every front-end dev in the company is a potential consumer, we need to make sure we can somewhat universally agree about what we're building. To do that, we believe it's best to split development into two large categories.

Both can be done in one pull request, but ideally in very separate commits and separate files to enable maximum discussion.

### Designing the component's API

The goal is to outline the API, without necessarily coding the component itself.

It can be something like that:


```tsx
type Data = {
	name: string;
	values: number[];
	color: string;
};

type DataSet = Data[];

type ComponentProps = {
	isActive: boolean;
	dataset: DataSet;
}

export function Component(props: ComponentProps) {...}

---

import { Component} from '@talend/design-system'
import { tokens } from '@talend/design-tokens'

<Component
	isActive
	dataset=[{ name: "pouet", values: [1,4,8], color: tokens.coralColorChartPositive }]
/>
```

**Where do I document this API?**

Remember that Storybook page created by your friendly designer team? Once they've set this up, you can expand that component's documentation. That's where the API part comes up.

If they haven't created yet, you can use the [provided template for doc pages](DOCTEMPLATE.md).

Say you're working on a `Dropdown` component. Your friendly designer will have created a `src/components/Dropdown/Dropdown.stories.mdx` file already. Use the `## Usage` section to showcase your API!

**Should I keep this documentation once the component is ready?**

For simple APIs, not really. Your component's stories must be thorough enough to explain its API. For more stateful components or hooks / behaviours (ex: a toast library, a notification center) etc... then yes, absolutely.

### Implementing the component

Your API has been approved? It's time to build.

**Do**

- Name your variables explicitly (no `const v = 'toto'`)
- Use exclusively design tokens for styles (color, spacing, fonts, border-radiuses, box-shadows, border styles and sizes, breakpoints, transitions, backgrounds, text colors etc...)
- Write exhaustive explicit stories in TS to showcase actual use cases (in `ComponentName.stories.tsx`) and call those stories in the doc file (in `/ComponentName/ComponentName.stories.mdx`)
- Write tests with cypress for your component and its logic if it must have logic (`ComponentName.spec.tsx`)
- Make sure your component allows for `refs` passing through (`ForwardRef`)
- Make your component's types match the native HTML element it features (ie: it should able to support data attributes etc...)
- Make sure your component is exported in the index.ts to be available in the UMD

**Don't**

- Let consumers rely on `className` or `style` or `css` props. The library is there for homogeneity purposes across products. Overrides should be discouraged.

Your component needs at least one positive Codeowner review and one positive review from somebody outside your team (shared library = shared responsibilities). It also need to be approved by the lead designer working on that component (maybe not on Github since all designers don't have access). Once it does, it's up to you to merge and release.

## Contributing for maintenance or upgrades

The requirements are basically the same as they are for new implementations, but the required reviews are less strict. You need approval from a code owner and from the ticket's creator for most maintenance tasks.

However, if your upgrade involves API changes or design changes, you'll still need approval from an outside developer and a product designer.

