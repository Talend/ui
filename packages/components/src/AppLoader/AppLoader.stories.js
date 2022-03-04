/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';

import AppLoader from './AppLoader.component';
import APP_LOADER from './constant';

export default {
	title: 'Design Principles/Loading Feedback/AppLoader',
};

const AppSpecificLoader = ({ icon }) => (
	<div>
		<style>
			{APP_LOADER.getLoaderStyle(`url(${require(`@talend/icons/src/svg/products/${icon}.svg`)})`)}
		</style>
		<AppLoader />
	</div>
);

export const Default = () => <AppSpecificLoader icon="logo-square" />;

export const ApiDesigner = () => <AppSpecificLoader icon="api-designer-positive" />;

export const ApiTester = () => <AppSpecificLoader icon="api-tester-positive" />;

export const ComponentKit = () => <AppSpecificLoader icon="component-kit-positive" />;

export const MasterDataManagement = () => <AppSpecificLoader icon="mdm-positive" />;

export const DataCatalog = () => <AppSpecificLoader icon="datacatalog-positive" />;

export const DataInventory = () => <AppSpecificLoader icon="tdc-positive" />;

export const DataPreparation = () => <AppSpecificLoader icon="tdp-positive" />;

export const DataStewardship = () => <AppSpecificLoader icon="tds-positive" />;

export const ManagementConsole = () => <AppSpecificLoader icon="tmc-positive" />;

export const PipelineDesigner = () => <AppSpecificLoader icon="datastreams-positive" />;
