import { homeModule } from './home';
import { pokemonModule } from './pokemon';
<%- props.cmf ? `
import { datasetModule } from './dataset';` : ''
%>

export default [
	homeModule,
	pokemonModule,<%-
props.cmf ? `
	datasetModule,` : ''
%>
];
