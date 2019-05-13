import { homeModule } from './home';
import { pokemonModule } from './pokemon';
<%- props.i18n ? `
import { datasetModule } from './dataset';` : ''
%><%- props.cmf ? `
import { connectionModule } from './connection';` : ''
%>
export default [
	homeModule,
	pokemonModule,
];
