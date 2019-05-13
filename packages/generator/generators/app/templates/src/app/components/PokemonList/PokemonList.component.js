import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Loader from '@talend/react-components/lib/Loader';
import VirtualizedList from '@talend/react-components/lib/VirtualizedList';
import CellTitle from '@talend/react-components/lib/VirtualizedList/CellTitle';

import theme from './PokemonList.scss';

function PokemonList({ pokemons, fetchPokemons, isFetching, removePokemon }) {
	useEffect(fetchPokemons, []);

	const collection = useMemo(
		() => {
			if (!pokemons) {
				return pokemons;
			}
			return pokemons.map(item => ({
				...item,
				actions: [
					{
						label: `Remove ${item.label}`,
						icon: 'talend-trash',
						onClick: () => removePokemon(item),
					},
				],
			}));
		},
		[pokemons],
	);

	if (isFetching || !collection) {
		return <Loader className={theme.loader} size="large" />;
	}

	return (
		<React.Fragment>
			<h1>Pokemons list</h1>
			<div className={theme['pokemon-list']}>
				<VirtualizedList collection={collection} id="pokemon-list">
					<VirtualizedList.Content label="Id" dataKey="id" width={-1} />
					<VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={{ actionsKey: 'actions' }}
						width={-1}
						{...CellTitle}
					/>
					<VirtualizedList.Content label="Height" dataKey="height" width={-1} />
					<VirtualizedList.Content label="Weight" dataKey="weight" width={-1} />
				</VirtualizedList>
			</div>
		</React.Fragment>
	);
}
PokemonList.propTypes = {
	pokemons: PropTypes.array,
	fetchPokemons: PropTypes.func.isRequired,
	isFetching: PropTypes.bool,
	removePokemon: PropTypes.func.isRequired,
};

export default PokemonList;
