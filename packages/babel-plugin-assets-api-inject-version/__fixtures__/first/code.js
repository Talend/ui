/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import assetsAPI from '@talend/assets-api';
import foo from 'lodash';

assetsAPI.getURL('/', 'react');
assetsAPI.getJSON('/foo.json', 'react');
assetsAPI.getUMD('react'); // should be transpiled to
// assetsAPI.getUMD('react', '16.14.0', 'React', '/umd/react.production.min.js');
