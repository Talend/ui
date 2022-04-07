// see https://github.com/welldone-software/why-did-you-render#setup

if (process.env.NODE_ENV === 'development') {
    const React = require('react');
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
}
