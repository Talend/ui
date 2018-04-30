require('babel-polyfill');
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-15');

configure({ adapter: new Adapter() });
