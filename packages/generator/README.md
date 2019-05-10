# Talend's JavaScript Library Generator

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[npm-icon]: https://nodei.co/npm/generator-talend.png?downloads=true
[npm-url]: https://npmjs.org/package/generator-talend
[travis-ci-image]: https://travis-ci.org/Talend/generator-talend.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/generator-talend
[dependencies-image]: https://david-dm.org/Talend/generator-talend.png
[dependencies-url]: https://david-dm.org/Talend/generator-talend
[devdependencies-image]: https://david-dm.org/Talend/generator-talend/dev-status.png
[devdependencies-url]: https://david-dm.org/Talend/generator-talend#info=devDependencies
[quality-badge]: http://npm.packagequality.com/shield/generator-talend.svg
[quality-url]: http://packagequality.com/#?package=generator-talend

## Installation

You'll first need to install [yeoman](http://yeoman.io/) then install
[generator-talend](https://github.com/Talend/generator-talend).

```bash
npm install -g yo
npm install -g generator-talend
```

## Usage

This generator has multiple subgenerators, so you use one of the following:

* `yo talend` -> javascript library
* `yo talend:react-cmf` -> create a project based on react-cmf
* `yo talend:react-component` -> add a react component
* `yo talend:create-cell` -> add a custom cell for the virtualized list ( components )

Running `yo talend` will launch the library creation wizard.
It will do the following:

* Fetch and Install the configuration files from Talend's tools repository
* Create a simple README
* Add the Apache-2 LICENSE file
* Setup a default .gitignore file and make the initial git commit
* Run the initial `npm install`

You can use yarn by adding --yarn option or the classic --skip-install if you just want to escape install step.

## License

Copyright (c) 2006-2016 Talend

Licensed under the Apache V2 License
