import React from 'react';

/**
 * @param {object} props react props
 * @example
<Home name="Hello world"></Home>
 */
function Home(props) {
	return (<div>{props.name}</div>);
}

Home.propTypes = {
	name: React.PropTypes.string,
};

export default Home;
