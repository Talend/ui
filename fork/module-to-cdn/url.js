function unpkg(info) {
    return `https://unpkg.com/${info.name}@${info.version}${info.path}`;
}

const cache = {
    fn: unpkg
};

/**
 * This function is used to return the url from the modules information
 */
function getURL(info) {
    return cache.fn(info);
}

/**
 * This function let you create your own getURL.
 * @param {function} fn the future getURL used
 */
function setURL(fn) {
    cache.fn = fn;
}

module.exports = {
    getURL,
    unpkg,
    setURL
};
