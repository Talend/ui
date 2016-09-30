const phantomcss = require('phantomcss');

const { url, viewport, mapping } = require('./../phantomcss.config.json');

casper.test.begin('Screenshots', mapping.length, () => {
    phantomcss.init({
        // Rebase is useful when you want to create new baseline
        // images without manually deleting the files
        // casperjs demo/test.js --rebase
        rebase: casper.cli.get('rebase'),
        //
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        //
        casper: casper,
        //
        // Remove results directory tree after run.  Use in conjunction
        // with failedComparisonsRoot to see failed comparisons.
        cleanupComparisonImages: true,
        //
        // libraryRoot: '/phantomcss',
        //
        // Change the output screenshot filenames for your specific
        // integration
        // fileNameGetter: function(root,filename){
        //     // globally override output filename
        //     // files must exist under root
        //     // and use the .diff convention
        //     var name = root+'/somewhere/'+filename;
        //     if(fs.isFile(name+'.png')){
        //         return name+'.diff.png';
        //     } else {
        //         return name+'.png';
        //     }
        // },
        //
        // Don't add count number to images. If set to false, a filename is
        // required when capturing screenshots.
        addIteratorToImage: false,
        //
        // Don't add label to generated failure image
        // addLabelToFailedImage: false,
        //
        // Mismatch tolerance defaults to  0.05%. Increasing this value
        // will decrease test coverage
        // mismatchTolerance: 0.05,
        //
        // onPass: function passCallback(){},
        // onFail: function failCallback(){},
        // onTimeout: function timeoutCallback(){},
        // onComplete: function completeCallback(){},
        // hideElements: '#thing.selector',
        // addLabelToFailedImage: true,
        //
        // Prefix the screenshot number to the filename, instead of suffixing it
        // prefixCount: true,

        // Output styles for image failure outputs genrated by
        // Resemble.js
        outputSettings: {
            errorColor: {
                red: 255,
                green: 55,
                blue: 255,
            },
            // errorType: 'movement',
            // transparency: 0.3
        }
    });

    //
    // Turn off CSS transitions and jQuery animations
    //
    // phantomcss.turnOffAnimations();

    casper
        .start(url)
        .then(() => {
            if (viewport) {
                casper.viewport(viewport.width, viewport.height);
            }
            // Take a screenshot of each UI component
            mapping.forEach(({selector, name}) => {
                phantomcss.screenshot(selector, name)
            });
        })
        .then(() => {
            // Compare screenshots
            phantomcss.compareAll();
        })
        .run();
});
