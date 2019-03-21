# Developer guide

## Principle

Let's take this jsx that represents what we want to write

```javascript
<List.Manager
    id="my-list"
    collection={ [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]}
>
    <List.Toolbar>
        <List.DisplayMode id="my-list-displayMode"  />
        <List.SortBy id="my-list-sortBy" />
    </List.Toolbar>

    <List.VList>
       <List.VList.Content label="Id" dataKey="id" />
       <List.VList.Content label="Name" dataKey="name" />
   </List.VList>
</List.Container>
```

In this example we have 2 features: display mode and sort selection. In those 2 features we need to share info.

For display mode
* VList display mode must reflect DisplayMode widget value
* DisplayMode widget must propagate changes
* There is synchronisation

For sort
* In Table mode
  * VList displays the sort caret in the header
  * VList must propagate sort new values on header click
* In Large mode
  * VList must display the Sort widget value
  * Sort widget must propagate changes
* The switch between each mode must keep the sort values. So there is synchronisation.

TL;DR: This synchronisation will be through React context.

![DisplayMode, SortBy and VList are subcomponents that receive the synchronized information from Manager via React context](./img/jsx-to-schema.gif "JSX to schema principle")

Let's see how we can add a feature, with shared info between List widgets that fits this system.


## Manager

ListManager hold the state as the single source of truth in uncontrolled mode.

Any synchronized value and its setter are exposed via React context.

```diff
import React, { useState } from 'react';
import ListContext from '../context';

function ListManager(props) {
    // existing states

+   // 1 - Add the new state
+   const [displayMode, setDisplayMode] = useState();

    const contextValue = {
        // other state and setters

+       // 2 - Add the new state and setter in context value
+       displayMode,
+       setDisplayMode,
    };

    return <ListContext.Provider value={contextValue}>{props.children}</ListContext.Provider>;
}
```


## List widgets

The widgets use the context to get the values and setters they need.

```javascript
import React, { useContext } from 'react';
import ListContext from '../context';

function ListDisplayMode(props) {
    const { displayMode, setDisplayMode } = useContext(ListContext);

    // do whatever we want, including
    // * set displayMode as selected display mode
    // * call setDisplayMode on change
}
```

Even simpler for widgets that only need to use the synchronized value.

```javascript
import React, { useContext } from 'react';
import ListContext from '../context';

function VList(props) {
    const { displayMode } = useContext(ListContext);

    // use the displayMode
}
```

![ListDisplayMode set value in ListManager, that propagates it to ListDisplayMode and VList](./img/compound-set.gif "Context propagation")

**Rule**

It's important to keep the api that concern the feature in the feature's widget. Avoid passing all the things to ListManager props.
For example, any prop to manage the DisplayMode must be set in ListDisplayMode.

**Why ?**

Simply to avoid the apropcalypse we have today with the List component.
Scoping the api of the feature make it simpler to manage, and keep each widget api minimalist.

**Example**

```diff
<List.Manager
    id="my-list"
    collection={collection}
-   initialDisplayMode="table"
>
    <List.Toolbar>
        <List.DisplayMode
            id="my-list-displayMode"
+           initialDisplayMode="table"
         />
    </List.Toolbar>

    <List.VList></List.VList>
</List.Container>
```

Let's see how.


### Uncontrolled mode

By default, using only the ListManager context as only value and setter makes your component work in uncontrolled mode.
Writing minimal code makes it work internally.

```javascript
<List.Manager id="my-list" collection={collection}>
    <List.Toolbar>
        <List.DisplayMode id="my-list-displayMode"  />
    </List.Toolbar>

    <List.VList></List.VList>
</List.Container>
```

In this example, any change in ListDisplayMode propagates via the ListManager, and the 2 widgets (ListDisplayMode and VList) use the same value from context.


Now let's add the possibility to set an initial value. As seen before, we must keep the api in ListDisplayMode to avoid a ListManager apropcalypse.
What we need to do is propagate this initial value to synchronize it to other components.

```javascript
import React, { useContext } from 'react';
import ListContext from '../context';

function ListDisplayMode(props) {
    const { displayMode, setDisplayMode } = useContext(ListContext);

    useEffect(() => {
        setDisplayMode(props.initialDisplayMode);
    }, []);
}
```


### Controlled mode


