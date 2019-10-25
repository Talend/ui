const MIN_NUMBER_OF_PARENTS = 500;
const MAX_NUMBER_OF_CHILDREN = 10;
const MAX_DEEPNESS = 3;

let ids = {};

const getUniqueId = () => {
	const candidateId = Math.round(Math.random() * 1000000000);

	if (ids[candidateId]) {
		return getUniqueId();
	}

	ids[candidateId] = true;

	return candidateId;
};
var nbCall = 0;
export const constructTree = (maxDeepness, maxNumberOfChildren, minNumOfNodes, deepness = 1) => {
	nbCall = nbCall + 1;
	console.log('nbCall', nbCall);
	return new Array(minNumOfNodes).fill(deepness).map((si, i) => {
		const id = getUniqueId();
		const numberOfChildren =
			deepness === maxDeepness ? 0 : Math.round(Math.random() * maxNumberOfChildren);

		return {
			id,
			name: `Leaf ${id}`,
			children: numberOfChildren
				? constructTree(maxDeepness, maxNumberOfChildren, numberOfChildren, deepness + 1)
				: [],
			state: {
				expanded: numberOfChildren ? Boolean(Math.round(Math.random())) : false,
				favorite: Boolean(Math.round(Math.random())),
				deletable: Boolean(Math.round(Math.random())),
			},
		};
	});
};

const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);
export default Nodes;
