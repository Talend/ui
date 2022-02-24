// eslint-disable-next-line import/no-extraneous-dependencies
import assetsAPI from '@talend/assets-api';

assetsAPI.getURL('/', 'react');
assetsAPI.getJSON('/foo.json', 'react');
assetsAPI.getUMD('react'); // should be transpiled to
// assetsAPI.getUMD('react', '16.14.0', 'React', '/umd/react.production.min.js');
