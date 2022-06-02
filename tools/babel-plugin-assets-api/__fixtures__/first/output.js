/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable import/no-extraneous-dependencies */
import assetsAPI from '@talend/assets-api';
import React from 'react';
assetsAPI.getURL('/', 'react', '17.0.2');
assetsAPI.getURL('/', 'react', '16.13.0');
assetsAPI.getJSON('/foo.json', 'react', '17.0.2');
assetsAPI.getJSON('/foo.json', 'react', '16.13.0');
assetsAPI.getUMD('react', '17.0.2', 'React', '/umd/react.production.min.js');
assetsAPI.getUMD('react', '16.13.0', 'ReactWrong', '/umd/react.production.min.js');
