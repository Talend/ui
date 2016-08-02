import { createSelector } from 'reselect';

const getPorts = state => state.flowDesigner.ports;
const getLinks = state => state.flowDesigner.links;
