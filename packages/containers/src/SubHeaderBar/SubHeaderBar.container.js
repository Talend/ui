import React from 'react';

const viewSubHeader = {
	iconFile: 'talend-file-csv-o',
	title: 'Marketing',
	subTitle: 'Creator John Doe',
};

const returnArrowProps = {
	id: 'returnArrow',
	icon: 'talend-arrow-left',
	onClick: () => console.log('return arrown left'),
};

class SubHeaderBar extends React.Component {
	render() {
		return <Component {...viewSubHeader} returnAction={returnArrowProps} />;
	}
}

export default SubHeaderBar;
