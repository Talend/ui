# Build CDN scripts

Let's download UMD files from https://unpkg.com and/or build your own custom UMDs!


## Getting started

To use this CLI you just have to add `@talend/scripts-build-cdn` in your project.

Once installed this package add the command `talend-cdn` to the node_modules/.bin folder.

An example of usage is available at [github/Talend/cdn-content](https://github.com/Talend/cdn-content)


## Context

You should not let your app rely on unpkg which is provided for free. As a company, you want to master your toolchain and your produced content. This script has been created for this reason: **build your own CDN**.

Up to you to rely on whatever distribution network service like Netlify or CloudFlare or any other option.

# How to use

talend-cdn command accepts two subcommands:

* download
* build

Both have their options

```bash
$> talend-cdn download -d -e ';@angular;' --versions ../../../ui/versions/dependencies.json
```

| command | option  | default | description |
| -- | -- | -- | -- |
| download | -e --exclude | '' | exclude patterns from the global list |
| download | --versions | '' | path to a dependencies.json file containing the minimum version you want |
| download | -v --verbose | false | display more information in the output |
