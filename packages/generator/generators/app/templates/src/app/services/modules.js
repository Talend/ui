import { homeModule } from './home';
import { pokemonModule } from './pokemon';
<%- props.cmf ? `
import { connectionModule } from './connection';` : ''
%>

export default [
	homeModule,
	pokemonModule,<%-
props.cmf ? `
	connectionModule,` : ''
%>
];
