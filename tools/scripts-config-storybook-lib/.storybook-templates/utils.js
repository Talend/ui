// Temporary fixes until Storybook handles well Windows path
// Waiting for a release https://github.com/storybookjs/storybook/pull/17641
function fixWindowsPath(path) {
    return process.platform === 'win32' ? path.replace(/\\/g, '/') : path;
}

function fixWindowsPaths(paths){
    return paths.map(fixWindowsPath);
}

module.exports = { fixWindowsPath, fixWindowsPaths };
