# React CMF

### Pre-requisite

This documentation is using jekyll.
To contribute on this, you need to install [Jekyll](https://jekyllrb.com/).

### Serve the documentation

```bash
jekyll serve
```

The app is served on [http://localhost:4000/ui/](http://localhost:4000/ui/) 

For more advanced commands, see the official [documentation](https://jekyllrb.com/docs/usage/)

### Add a post

There are `categories` defined in `_config.yml`. Posts (pages) are added in one of the categories. 

To creating a new post:

```bash
ruby bin/jekyll-page "<page-title>" <category>
```

It will appear in the navigation on the left once recompiled.

### Edit a page

Pages are added in `/_posts` folder.
Find your page and open it. The files are markdown files.
While serving the documentation, any edit will regenerate the site.
