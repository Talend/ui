// eslint-disable-next-line import/no-extraneous-dependencies
import assetsAPI from '@talend/assets-api';

assetsAPI.getURL('/', 'react', '16.14.0');
assetsAPI.getJSON('/foo.json', 'react', '16.14.0');
assetsAPI.getUMD('react'); // should be transpiled to
// assetsAPI.getUMD('react', '16.14.0', 'React', '/umd/react.production.min.js');
