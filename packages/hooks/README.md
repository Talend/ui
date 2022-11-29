# @talend/react-hooks

This packages exposes react-hooks.

## Getting started

Add the library to the dependencies of your project

```sh
npm i @talend/react-hooks
```

or

```sh
yarn add @talend/react-hooks
```

## Usage

```javascript
import { useCopyToClipboard } from '@talend/react-hooks';

function MyComponent(props) {
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    return (
        <button type="button" onClick={() => copyToClipboard('content')}>Copy me<button>
    );
}
```
