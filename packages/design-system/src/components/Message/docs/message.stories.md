# Documentation template

Use the following template when creating a new `ComponentName.stories.mdx` page.

```markdown
import { Meta, Story } from '@storybook/addon-docs';
import { FigmaImage, FigmaLink, Use } from '~docs';

<Meta
    title="Components/Message"
    parameters={{
		status: { figma: 'wip', storybook: 'wip', react: 'wip', i18n: 'na' },
		figmaLink: 'https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/?node-id=122%3A42331',
	}}
/>

# Message

Use Message when a information about action in the page needs to displayed. It can be informative, success, warning or error.


Text is mandatory. Other elements are optional. Hyperlink element are only available on message

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=252%3A45189"
    alt="Message"
/>

### TextBehavior

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=234%3A44382"
    alt="MessageTextBehavior"
/>


## Variants

### MessageError

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=231%3A45330"
    alt="MessageError"
/>


### MessageWarning

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=231%3A45282"
    alt="MessageWarning"
/>


### MessageSuccess

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=231%3A45331"
    alt="MessageSuccess"
/>


### MessageInformative

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=231%3A45332"
    alt="MessageInfo"
/>



# MessageCollection

Use MessageCollection when multiple messages about the same event happens in the page. It can be informative, success, warning or error.

Title, Text and mainAction are mandatory elements.
Only one “mainAction” is available. All other actions must be in a dropdown. This is true for collections and regular messages. 
Decorative elements in the background do not count in the Message’s box size. Use absolute elements or shadows to replicate.

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=252%3A44927"
    alt="MessageCollection"
/>

## Variants

### MessageCollectionError

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=230%3A47778"
    alt="MessageCollectionError"
/>

### MessageCollectionWarning

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=230%3A47774"
    alt="MessageCollectionWarning"
/>


### MessageCollectionSuccess

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=230%3A47782"
    alt="MessageCollectionSuccess"
/>

### MessageCollectionInfo

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=230%3A47800"
    alt="MessageCollectionInfo"
/>

## Style

Coral support 2 styles of Message: Collection & Message.

### Variations

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=261%3A45804"
    alt="MessageCollection"
/>

## States

### Message action behavior

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=243%3A45449"
    alt="MessageActionBehavior"
/>

### MessageCollection action behavior

<FigmaImage
    src="https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=243%3A44883"
    alt="MessageCollectionActionBehavior"
/>


## Content

## Usage

## Accessibility
```
