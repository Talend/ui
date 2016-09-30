# Talend Bootstrap Theme

STATUS: this is a Work In Progress.

[![Build Status](https://travis-ci.org/Talend/bootstrap-theme.svg?branch=travis)](https://travis-ci.org/Talend/bootstrap-theme)
[![dependencies Status](https://david-dm.org/Talend/bootstrap-theme/status.svg)](https://david-dm.org/Talend/bootstrap-theme)

This theme is a base theme free of colors that must be configured to be used.

It provides layout that follow Talend Style Guidelines.

Note: The example has been taken from the excellent project Bootstwatch.
But we have decided to rewrite the build using webpack and bootstrap-sass.

# Docs & Help
* [Example page](https://talend.github.io/bootstrap-theme)
* [Sass Api](https://talend.github.io/bootstrap-theme/sassdoc)

<!---* Frontify (soon &trade;))-->

# How to use

## Install dependency

```bash
npm install --save bootstrap-tlnd-theme
```

## Define your color set

Create your `_colors.scss` file and fill it with your own color set.

```sass
/// My primary App color
///
/// @type Color
$lizard:    #112A2D;
```

## Fork bootstrap-sass variables

Open [this file](https://github.com/Talend/bootstrap-theme/blob/master/src/theme/_variables.scss) in order to override what you need to a `_variables.scss` file.

```sass
$brand-primary:         $lizard;
```

## Set up Talend bootstrap theme

Edit your Sass entry file.

```sass
@import 'colors';
@import 'variables';
@import '~bootstrap-tlnd-theme/src/theme/bootstrap';
```

You can now add [Bootstrap](http://getbootstrap.com/) markup!

# How to contribute

```bash
npm install
npm start
```
Open [http://localhost:8080/](http://localhost:8080/) to see your changes.
