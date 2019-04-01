---
id: core-expressions
title: Expressions
---

Expressions has been created to be used in the settings to express the value of a props.

It is just a selector with a different API, a function registered in CMF and used to map state to one props.
It is called during the mapStateToProps react-redux life cycle.

The first usecase was the available props in our Action component so the Action is displayed or not based on the user permission.

cmfConnect HOC will parse the first level of props looking for a props name which ends with `Expression` and call all of them to get their value.

[Read more on it here](https://github.com/Talend/ui/tree/master/packages/cmf/src/expression.md)
