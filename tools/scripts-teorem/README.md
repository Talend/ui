# Teorem (versions of dependencies)

This package contains a CLI to accumulate all the dependencies used across a set of repositories

## Getting started

First, you need to provide `GITHUB_TOKEN` either by using the .env file or by passing it using OS env arguments.

Then you can use the CLI: `teorem all --config ./config.json -v -o output.json`.

First argument is the sub command. You have the following commands:

- ingest: only download the files from the config
- merge: merge the lock files into a datastructure
- all: do both commands

Configuration example:

```json
{
    "repository": {
        "Talend": {
            "design-system": [
                "/package.json",
                "/yarn.lock"
            ],
            "ui": [
                "/package.json",
                "/yarn.lock"
            ]
        }
    }
```

Your GitHub token must be validated across the organization or the scripts will not be able to fetch the data on it. To do that you can use the button 'Enable SSO' in the security panel on your GitHub token page.

## How to get list of repository with javascript

https://github.com/Talend?q=&type=&language=javascript

```
JSON.stringify(Array.from(document.querySelectorAll('[data-hovercard-type="repository"]')).map(e => e.text.replace(/\n/g, '').replace(/ /g, '')))
```
