# Model viewer

## Concept

This is based on the generic viewer.  
You can see the customisation [here](./genericViewer.configuration.js). Comments explain things.

## Menus

The menu is a configuration props that renders a menu in the button overlay.

Same for the pie chart icons menus.  

## Accessibility

Alternative text have been provided in non text elements. Example : `Open menu` on the menu button.

On the menus: focus is managed to set it on the menu when the menu button is clicked, and set back on the menu button when the overlay is closed

## TODO

* The menus are the same for all nodes. You might want to change that if you have the need to have different menus per node.
* Code duplication: to manage focus accessibility in menus, we had to implement some code in Item menu (that use Action) and in QualityCircles (that use PieChartButton). The code is the same but in 2 places, let's try to remove this duplication
* missing (don't have the model): cardinality. This should be added in the `getDisplayKey()` result.
