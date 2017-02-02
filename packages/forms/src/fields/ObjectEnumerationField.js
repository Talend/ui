import React from 'react';
import { Enumeration, IconsProvider } from 'react-talend-components';


class ObjectEnumerationField extends React.Component {
	constructor(props) {
		super(props);

		const onAddHandler = () => {
			this.setState({
				displayMode: 'DISPLAY_MODE_ADD',
			});
		}

		const onAbortHandler = () => {
			this.setState({
				displayMode: 'DISPLAY_MODE_DEFAULT',
			});
		}

		const onAddItem = (event, value) => {
			console.log('###onAddItem###')
			console.log('items', this.state.items);
			this.setState({
				displayMode: 'DISPLAY_MODE_DEFAULT',
				items: this.state.items.concat([{
					id: this.state.items.length++,
					label: value.value
				}])
			}, () => props.onChange(this.state.items))
		}

		this.state = {
				displayMode: 'DISPLAY_MODE_DEFAULT',

				headerDefault: [{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: onAddHandler,
				}],
				headerInput: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: onAddItem,
				}, {
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: onAbortHandler,
				}],
				items: props.formData.map((item) => {
					return {
						id: item.id,
						label: item.label,
					};
				}),
				onAddChange: function() {console.log('onAddChange')},
				onAddKeyUp: function() {console.log('onAddKeyUp')},
		};
	}

	render() {

		return (
			<div>
				<IconsProvider />
				<Enumeration
					{...this.state}
				/>
			</div>
		);
	}
}

export default ObjectEnumerationField;
