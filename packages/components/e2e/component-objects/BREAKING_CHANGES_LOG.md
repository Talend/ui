This document aims to ease the migration from a version to another by providing intels about what to do to migrate.

## v0.97.0

* PR #634 [feat(VirtualizedList): adapt and enhance component objects]

List component object has entirely changed.

### list.getItems()

Before
```java
list.getItems(); // this returns all buttons in the table title cells
```

After
```java
List<WebElement> titles = list
    .getTable(optional_id)              // get the table display component object
    .getItems()                         // get all the items rows
    .stream()
    .map(Item::getTitle)                // get the title button of each items
    .collect(Collectors.toList());

// no simple way, must take all items, map them to all titles, map them to all actions...
List<WebElement> actions = list
    .getTable(optional_id)                                  // get the table display component object
    .getItems()                                             // get all the items rows
    .stream()
    .map(item -> item.getCell(columnKey).getActions())      // get the title cell
    .flatMap(List::stream)                                  // flatten
    .collect(Collectors.toList());
```

Explanation : getting all title buttons and actions is not a real use case. There are more api method to do more precise things.

### list.getItemActionButton(String label, String listType, String action)

Before
```java
final WebElement actionButton = list.getItemActionButton(label, listType, action);

// move mouse to button to trigger mouseover and click
final Actions action = new Actions(driver);
action.moveToElement(actionButton).click().build().perform();
```

After
```java
final Item item = list
    .getTable(optional_id)      // get the table display component object
    .getItem(titleLabel);       // get item row that fit the provided title label

// if you need to get the title button
final WebElement titleButton = item.getTitle();

// if you need to click on title button
item.clickOnTitle();

// if you need to get an item action
final WebElement actionButton = item.getAction(part_of_id_to_match); // the id was "listType:action" before

// if you need to click on an action
item.clickOnAction(part_of_id_to_match); // the id was "listType:action" before
```

Explanation :
 * the buttons should have ids or part of ids that are similar
 * listType and action parameters are specific to a project. They are used to create the id.


### list.hasItem(String name)

Before
```java
final boolean exists = list.hasItem(titleLabel);
```

After
```java
final boolean exists = list.getTable().hasItem(titleLabel);
```

Explanation :
 * the buttons should have ids or part of ids that are similar
 * listType and action parameters are specific to a project. They are used to create the id.
