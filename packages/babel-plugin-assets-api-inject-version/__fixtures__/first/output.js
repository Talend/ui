/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable import/no-extraneous-dependencies */
import assetsAPI from '@talend/assets-api';

assetsAPI.getURL('/', 'react', '16.14.0');
assetsAPI.getJSON('/foo.json', 'react', '16.14.0');
assetsAPI.getUMD('react', '16.14.0', 'React', '/umd/react.production.min.js');
