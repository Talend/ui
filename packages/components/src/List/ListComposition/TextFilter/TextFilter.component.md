# TextFilter component

## Description

Input component used to filter the data in the collection.
It can work both in controlled and uncontrolled modes.

## Props

| Name             | Type     | Required | Default value | Description                                                                                                |
| ---------------- | -------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| docked           | Boolean  |          |               | Docked status of the filter (shown or not)                                                                 |
| onChange         | Function |          |               | Called when the text filter's value changes                                                                |
| onToggle         | Function |          |               | Called when the toggle button is clicked                                                                   |
| initialDocked    | Boolean  |          | true          | Wether to dock or not the text filter (useful to set its initial state but preserve the uncontrolled mode) |
	