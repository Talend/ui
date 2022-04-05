/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable import/no-extraneous-dependencies */
import assetsAPI from '@talend/assets-api';
import React from 'react';
assetsAPI.getURL('/', 'react');
assetsAPI.getURL('/', 'react', '16.13.0');
assetsAPI.getJSON('/foo.json', 'react');
assetsAPI.getJSON('/foo.json', 'react', '16.13.0');
assetsAPI.getUMD('react');
assetsAPI.getUMD('react', '16.13.0', 'ReactWrong', '/umd/react.production.min.js');
