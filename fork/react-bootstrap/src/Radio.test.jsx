import { screen, render } from '@testing-library/react';

import Radio from './Radio';

import { shouldWarn } from './helpers';

describe('<Radio>', () => {
	it('should render correctly', () => {
		render(
			<Radio name="foo" checked className="my-radio">
				My label
			</Radio>,
		);

		expect(document.querySelector('div.radio.my-radio')).toBeVisible();
		expect(document.querySelector('input[type="radio"][name="foo"][checked]')).toBeVisible();

		expect(screen.getByText('My label')).toBeInTheDocument();
	});

	// xit('should support inline', () => {
	//   const wrapper = shallow(
	//     <Radio inline name="foo" className="my-radio">
	//       My label
	//     </Radio>
	//   );

	//   wrapper
	//     .assertSingle('label.radio-inline.my-radio')
	//     .assertSingle('input[type="radio"][name="foo"]');

	//   wrapper.assertSingle('label').text().should.equal('My label');
	// });

	// xit('should support validation state', () => {
	//   shallow(<Radio validationState="success" />).assertSingle('.has-success');
	// });

	// xit('should not support validation state when inline', () => {
	//   shouldWarn('ignored');

	//   shallow(<Radio inline validationState="success" />)
	//     .find('.has-success')
	//     .should.have.length(0);
	// });

	// xit('should support inputRef', () => {
	//   class Container extends React.Component {
	//     render() {
	//       return (
	//         <Radio
	//           inputRef={(ref) => {
	//             this.input = ref;
	//           }}
	//         />
	//       );
	//     }
	//   }

	//   const instance = mount(<Container />).instance();

	//   expect(instance.input.tagName).to.equal('INPUT');
	// });
});
