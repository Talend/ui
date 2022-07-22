function assertStyleVersionPatterns(config) {
    Object.keys(config)
        .filter(importPath => config[importPath].hasOwnProperty('style-versions'))
        .forEach((acc, importPath) => {
            const patterns = Object.keys(config[importPath].versions);
            const stylePatterns = Object.keys(config[importPath]['style-versions']);
            expect(patterns).toEqual(expect.arrayContaining(stylePatterns));
        }, true);
}

module.exports = {
    assertStyleVersionPatterns
};
