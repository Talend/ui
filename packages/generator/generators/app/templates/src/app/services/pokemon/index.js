import {
	reducer,
	fetchPokemons,
	getPokemons,
	getIsFetching,
	removePokemon,
} from './pokemon.service';

export const pokemonModule = { id: 'myapp-pokemon', reducer };

export default {
	actionCreators: {
		fetchPokemons,
		removePokemon,
	},
	selectors: {
		getPokemons,
		getIsFetching,
	},
};
