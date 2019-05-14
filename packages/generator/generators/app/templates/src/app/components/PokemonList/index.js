import { connect } from 'react-redux';
import PokemonList from './PokemonList.component';
import PokemonService from '../../services/pokemon';

function mapStateToProps(state) {
	return {
		pokemons: PokemonService.selectors.getPokemons(state),
		isFetching: PokemonService.selectors.getIsFetching(state),
	};
}

const mapDispatchToProps = {
	fetchPokemons: PokemonService.actionCreators.fetchPokemons,
	removePokemon: PokemonService.actionCreators.removePokemon,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PokemonList);
