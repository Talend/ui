#  CSS Modules

## Composition vs closed component APIs

## Problems and definitions

**Composition** is what we do when we assemble HTML or JSX elements to build a cohesive whole. For instance:

```tsx
<ul>
	<li>This list</li>
	<li>Exemplifies <a href="https://talend.com">composition</a></li>
</ul>

```

The combination of `ul`, `li` and `a` gives us an unordered list with one of its items containing a hyperlink anchor. This is familiar, flexible and commonplace.

A **closed component API model** does not rely on consumers performing the composition, but on them using  input / output parameters to achieve the same result. For instance:

```tsx
<ExampleList
    entries=[
        'This list',
        <>Exemplifies <a href="https://talend.com">a closed API</a></>,
    ]
/>

---
// Where...
type entry = string | React.ReactElement;

type ListProps = {
  entries: entry[];
};
```

This would achieve the same unordered list with a hyperlink anchor.

### Composition

**Pros**

Composition is familiar to anybody who's ever built raw HTML. It's the basic building methodology for layout.

It's flexible and agnostic. Given the right building blocks, one can compose nearly anything.

**Cons**

It's flexible and agnostic. You can do whatever you want with it.

```tsx
<ul>
	<p>I really should not be here</p>
</ul>
```

This won't break your app.

```tsx
<a href="#" onClick={() => performSomePageAction()}>I'm a button, LOL</a>
```

This would also work, despite being semantically wrong and an accessibility faux-pas.

Now let's consider the composition of non-native HTML tags such as React components.

```tsx
<List>
	<ListEntry>This list</ListEntry> // This is fine
	<input type="text" name="name" /> // This is not
	<InlineMessage>exemplifies compositionnal pitfalls</InlineMessage> // Neither is this
</List>
```

Sure, we can provide more opinionated components (`List` and `ListEntry` here would have specific styles and behaviours), but we cannot limit composition: `children` are notoriously untypeable in a way that would only allow some other subset of React components. What's composable isn't "a little bit composable", it's either fully open (`children: React.ReactElement;`) or very closed (`children: string | number | ...`).

It's a major risk to a product's homogeneity of patterns and behaviours.

### Closed component APIs

**Pros**

It removes the need for tedious composition. Developers no longer need to concern themselves with the proper HTML semantics and intricacies of which HTML tag can legally be a child of such and such parent.

It enforces homogeneity. Closed typed APIs put hard limits to what a component can display and how it can behave. They become easier to predict and less prone to diverging when different developers implement them.

Closed APIs are also strongly typed with TS, providing a better dev experience and overall more reliable components. TS's compiler will break before any poorly-fed component goes online.

**Cons**

It's rigid, it doesn't allow for "slightly different" use cases. The component will do what its API requires, nothing more, nothing "a few pixels more to the left on this one page". Closed API components are specialised.

This can lead to two props-related pitfalls:

First, props proliferation:

```tsx
<List
	entries={[
		[
			'This list',
			'Actually',
			'is complex enough'
			'that even one of its props',
			'has multiple levels',
			...
		],
		[
			{
				label: 'like two kinds of lists',
				value: 20,
				onClick: () => RandomCalbackWithValue(20),
			},
			{
				label: 'with different interfaces',
				value: 10,
				onClick: () => RandomCalbackWithValue(10),
			},
			...
		],
	]}
    actionLeft={() => void}
	actionRight={() => void}
	offsetXStart={20}
	offsetXEnd={0}
	offsetYStart={10}
	offsetYEnd={0}
	headerActions={[
		{
			icon: 'talend-pen',
			label: t('TALEND-EDIT'),
			onClick: () => void,
		},
		...
	]}
	footerActions={[
		{
			icon: 'talend-pen',
			label: t('TALEND-EDIT'),
			onClick: () => void,
		},
		...
	]}
	filters={[
		{
			value: 'size',
			label: t('TALEND-SIZE'),
		}
		...
	]}
/>
```

This is complex to use, to maintain, to document. Contributors run the risk of "piling in" more props on top of the props-layer-cake just to achieve "one more thing" on top of it all.

The other issue is props drilling. In the above component, many of those theoretical surface props wouldn't actually be used by first-level components, but be passed down deeper to their intended hosts.

Closed component APIs can lead to poor developer experience.

### What do we need

It boils down to one question: "what is the design system trying to achieve?". It's trying to achieve a _cohesive, homogenous experience across all our products_.


## Solutions

In order to meet those needs, we need to ship components without opening them up for customization. They must work out of the box and preserve Talend's identity!

Our best option to deliver this is to **rely on *exporting* components with closed APIs** for most things (more on that later)**.** Internally, those components will of course rely on composition. Think of it this way: the design system uses the bricks to build the house, you only have to "import" the house and provide the furniture.

What do we mean when we say "most things" will be shipped with closed APIs? Let's dive in.

### Atoms

Atoms are often single-tag elements, direct equivalents to HTML's basic blocks. Very obvious ones are `Button` `Link` or `Input` elements.

These will offer props that are based on their HTML counterparts minus `className` and `style` since, again, we discourage customisation.

Additional props will be added only when it's necessary to ensure homogeneity. For instance, `Button` components may receive an `icon` prop: this enables the design system to enforce which icons can be used, how they are inserted in the button's layout and how they are displayed. Atoms must remain otherwise simple.

Composition *inside* atoms is highly unlikely. Expect them to only accept `string` children (thanks, TS!).

### Molecules and organisms

This is often the meat and the core value of a shared component library: interactive components that display things in a rich, interesting way, while enabling contextually relevant actions.

The whole point is that they are repetitively used. It would make no sense to offer them as kits that must be assembled by consumers. The design system must provide them already assembled and ready to be hydrated through their closed APIs.

If the organisms grow too complicated in props, the first solution would be to create a dedicated component for that subset of needed props (for instance, though there may be a `ContextualMenu` component, a `ContextualMenuWithSearch` declination may be created if the prop specificity requires it.)

### Templates or pages

These are often referred to as "layout blocks". Their goal is to arrange "where" things go, what are the basic necessary blocks in there, and then to let users build freely within those boundaries.

The more generic those templates are (agnostic of their contents, for instance, a template called `PageWithSubheader`), the more they will rely on composition with very little props on the component itself.

The more specific they are (for instance a template called `FormPage`), the less composition will be expected from the end-user.

**Composition is a tool we use when we can't document a set pattern**. If we can document it, then we can describe an API for it.

## Why don't you do it like Material / Atlassian / Adobe or other public libraries (Reakit...) out there?

Because we don't have to. Public component libraries use composition as a necessity: they are agnostic, built to cater to many products with unpredictable patterns.

We're not a sprawling corporation with hundreds of designers spread across the globe with unmanageably different aspirations. A single, strongly documented design language is accessible to us.

Those libraries do not rely on consumers perpetually rebuilding the same components over and over again either: they do expect us to use their blocks to create opinionated components that are then shared with consumers.

This is what we do. We use our own components (and some of theirs, cc Reakit) internally to compose the ones that our products need. That need is defined collectively as a design decision by Product Designers, PMs and developers alike. The design system documents and caters to that need in the shape of components.

## TL;DR

Components will be coded with a "closed public API" approach, using composition privately within the design system. This ensures we can easily compose components on one end (the library) while keeping things homogenous on the other (in the products).

Exceptions are expected to happen but must meet two criteria:

- Composition, in this case, is a necessity (ex: layout element, unpredictable content)
- No consensus can be found for a component's API. In this case, chances are the discussed component specificity is too high for a shared library. It becomes in the design system's interest to provide at least homogenous building blocks for that element.
