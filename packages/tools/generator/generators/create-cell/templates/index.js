import <%= props.name %> from './<%= props.name %>.component';

export const cellType = '<%= props.type %>';

export default {
	cellRenderer: <%= props.name %>,
};
