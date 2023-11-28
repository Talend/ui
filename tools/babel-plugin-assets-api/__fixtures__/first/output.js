/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import assetsAPI from '@talend/assets-api';

assetsAPI.getURL('/', 'react', '18.2.0');
assetsAPI.getURL('/', 'react', '16.13.0');
assetsAPI.getJSON('/foo.json', 'react', '18.2.0');
assetsAPI.getJSON('/foo.json', 'react', '16.13.0');
assetsAPI.getUMD('react', '18.2.0', 'React', '/umd/react.production.min.js');
assetsAPI.getUMD('react', '16.13.0', 'ReactWrong', '/umd/react.production.min.js');
