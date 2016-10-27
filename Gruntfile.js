var fs = require("fs")
var path = require("path")

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    cssnano: {
      options: {},
      dist: {
        files: {
          'build/talendicons.min.css': 'build/talendicons.css'
        }
      }
    },

    svgmin: {
      dist: {
        options: {
          plugins: [
            {removeTitle: true},
            {removeStyleElement: true},
            {removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] }},
            {removeEmptyContainers: true},
            {sortAttrs: true},
            {removeUselessDefs: true},
            {removeEmptyText: true},
            {removeEditorsNSData: true},
            {removeEmptyAttrs: true},
            {removeHiddenElems: true}
          ]
        },
        files: [{
          expand: true,
          cwd: 'lib/svg',
          src: ['*.svg'],
          dest: 'build/svg'
        }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        inheritviewbox: true,
        includedemo: function(arg) {
          var talendicons = require("./index.js")

          var icons = function() {
            var result = []
            Object.keys(talendicons).forEach(function(key){
              result.push("<div style=\"width: 10%;min-width: 100px;flex: 0 0 auto;box-sizing:border-box;padding:1em;text-align:center;\">" + talendicons[key].toSVGUse({ height: 32 }) + "<div>" + key + "</div></div>")
            })
            return result.join("\n")
          }

          return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Talendicons Spritesheet test</title>
    <link rel="stylesheet" href="./talendicons.css" media="screen" title="no title">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #222;
        font-size: 15px;
      }
    </style>
  </head>
  <body>
    ${arg.svg}
    <div style="font-size: 2.2em;padding-left: 20px;">Talend icons SVG Spritesheet demo</div>
    <div style="font-size: 1.2em;margin: 1em 0;padding-left: 20px;">All the icons rendered below use the svg spriteheet located in the <code>/build/</code> directory.</div>
    <div style="flex: 0 1 auto;display:flex;flex-wrap: wrap; flex-direction: row;">
      ${icons()}
    </div>
  </body>
</html>
`
        }
      },
      default: {
        files: {
          "build/sprite.talendicons.svg": ['build/svg/*.svg']
        }
      },
    },

    clean: {
      build: [
        'build/*'
      ]
    },

    copy: {
      css: {
        src: "lib/talendicons.css",
        dest: "build/talendicons.css"
      },
      'docs-demo': {
        src: "build/sprite.talendicons-demo.html",
        dest: "docs/index.html"
      },
      'docs-css': {
        src: "build/talendicons.css",
        dest: "docs/talendicons.css"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-cssnano');

  // build tasks
  grunt.registerTask('css',  ['copy', 'cssnano']);
  grunt.registerTask('svg', ['clean', 'svgmin']);

  // default task, build /dist/
  grunt.registerTask('default', [ 'svg', 'css', 'json:svg', 'svgstore']);

  grunt.registerTask('json:svg', 'add svg string to data.json build', function() {
    var files = fs.readdirSync("./build/svg/")
    var data = JSON.parse(fs.readFileSync("./lib/data.json"))
 
    files.forEach(function(file) {
      console.log('add svg file', file);
 
      var svg = fs.readFileSync(path.resolve("./build/svg", file))
      var key = path.basename(file, ".svg")
      if (data[key]) {
        var raw = svg.toString()
        data[key].path = /<path.+\/>/g.exec(raw)[0]
        data[key].height = /height="(\d+)"/g.exec(raw)[1]
        data[key].width = /width="(\d+)"/g.exec(raw)[1]
      }
      console.log('done', file);
    })

    fs.writeFileSync("build/data.json", JSON.stringify(data));
    writeReactTalendComponentIconSet(data);
  });
  grunt.registerTask('docs', ['copy:docs-demo', 'copy:docs-css'])
};

function writeReactTalendComponentIconSet(data) {
  console.log('data', data);
  const buff = Object.keys(data).map((key) => {
    const i = data[key];
    return `Icon.register('${key}', (<svg viewBox="0 0 ${i.width} ${i.height}">${i.path}</svg>));`;
  });
  buff.unshift("");
  buff.unshift("import { Icon } from 'react-talend-components'");
  fs.writeFileSync("react.js", buff.join('\n'));
}