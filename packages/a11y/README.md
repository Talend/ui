# React a11y package

This package holds some utility to add accessibility support to any react components.

At the moment it supports The following gesture with keyboard:

- Tree
- Calendar
- List

# Calendar

HOC API:

```javascript
import { Gesture } from '@talend/react-a11y';

function MyCalendar(props) {
	//...
}

export default Gesture.withCalendarGesture(MyCalendar);
```

## props and html structure

In the upper example the HOC will inject onKeyDown props. It manage the focus on the correct day and is able to call `props.goToPreviousMonth(cb)` or `props.goToNextMonth(cb)` if needed.

Lookup of item in the dom is based on the following selector: `td > button[data-value]`

# Tree

HOC API:

```javascript
import { Gesture } from '@talend/react-a11y';

function MyTree(props) {
	//...
}

export default Gesture.withTreeGesture(MyTree);
```

## props and html structure

props:

- onSelect(event, item) [enter, space]
- onToggle(event, item) [left, right]
- onToggleAllSiblings(event, siblings) [*]

selectors:

- root selector: `ref.closest('ul[role="tree"]')`
- node selector: `root.querySelector('li[role="treeitem"]')`

# List

HOC API:

```javascript
import { Gesture } from '@talend/react-a11y';

function MyList(props) {
	//...
}

export default Gesture.withListGesture(MyList);
```

## props and html structure

No props on this one but the following selectors:

- root selector: `ref.closest('ul[role="list"]')`
- node selector: `root.querySelector('li[role="listitem"]')`
