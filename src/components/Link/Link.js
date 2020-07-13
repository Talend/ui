import * as React from 'react';
import { Button } from 'reakit';

function Link(props) {
	return <Button as="a" {...props} />;
}

export default Link;
