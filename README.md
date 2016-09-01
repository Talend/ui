# Talend Bootstrap Theme

STATUS: this is a Work In Progress.

[![devdependencies][devdependencies-image] ][devdependencies-url]

[devdependencies-image]: https://david-dm.org/jmfrancois/bootstrap-theme/dev-status.png
[devdependencies-url]: https://david-dm.org/jmfrancois/bootstrap-theme#info=devDependencies

This theme is a base theme free of colors that must be configured to be used.

It provides layout that follow Talend Style Guidelines.

Note: The example has been taken from the excellent project Bootstwatch.
But we have decided to rewrite the build using webpack and bootstrap-sass.

# How to use

## Install dependency

```bash
npm install --save bootstrap-tlnd-theme
```

## Define your color set

Create your `_colors.scss` file and fill it with your own color set.

```sass
/// Primary color, mostly used for the selected elements and to draw attention to the important elements of interaction.
///
/// @type Color
$st-tropaz:             #266092;

/// Secondary color
///
/// @type Color
$rio-grande:            #C3D600;

/// Contextual color for informational alert messages
///
/// @type Color
$scooter:               #3DB0D6;

/// Linked to valid/validated/validation elements.
///
/// @type Color
$limeade:               #8ABC00;

/// Used to notify unvalid elements or warning information.
///
/// @type Color
$lightning-yellow:      #FEB914;

// Used for errors.
///
/// @type Color
$chestnut-rose:         #CE6464;
```

## Fork bootstrap-sass variables

Fork [this file](https://github.com/Talend/bootstrap-theme/blob/master/src/theme/_variables.scss) in order to override what you want and then save it to `_variables.scss`.
```sass
$brand-primary:         $st-tropaz;
$brand-success:         $limeade;
$brand-info:            $scooter;
$brand-warning:         $lightning-yellow;
$brand-danger:          $chestnut-rose;
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
