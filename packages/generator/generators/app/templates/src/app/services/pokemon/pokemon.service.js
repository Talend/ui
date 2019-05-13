const POKEMON_REDUCER_KEY = 'pokemons';
const POKEMON_SET = 'POKEMON_SET';
const POKEMON_REMOVE = 'POKEMON_REMOVE';
const POKEMON_SET_FETCHING = 'POKEMON_SET_FETCHING';

function datasetReducer(state = {}, action) {
	switch (action.type) {
		case POKEMON_SET:
			return {
				...state,
				data: action.pokemons,
			};
		case POKEMON_REMOVE:
			return {
				...state,
				data: state.data.filter(ds => ds !== action.dataset),
			};
		case POKEMON_SET_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		default:
			return state;
	}
}

export const reducer = {
	[POKEMON_REDUCER_KEY]: datasetReducer,
};

export function fetchPokemons() {
	return dispatch => {
		dispatch({ type: POKEMON_SET_FETCHING, isFetching: true });
		setTimeout(() => {
			fetch('/pokemons.json')
				.then(res => res.json())
				.then(pokemons => {
					dispatch({
						type: POKEMON_SET,
						pokemons,
					});
				})
				.finally(() => {
					dispatch({ type: POKEMON_SET_FETCHING, isFetching: false });
				});
		}, 3000);
	};
}

export function removePokemon(pokemon) {
	return {
		type: POKEMON_REMOVE,
		pokemon,
	};
}

export function getPokemons(state) {
	return state[POKEMON_REDUCER_KEY].data;
}

export function getIsFetching(state) {
	return state[POKEMON_REDUCER_KEY].isFetching;
}
