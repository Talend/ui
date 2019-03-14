import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichLayout from '../../../../RichTooltip/RichLayout';
import theme from './ColumnChooser.scss';
import { useColumnChooserManager } from '../hooks';
import Footer from './Footer';
import Header from './Header';
import Body from './Body';
import { columnChooserContext } from './columnChooser.context';

export default function ColumnChooserContent({ columns, id, lockedLeftItems, onClose, submit, t }) {
	const {
		onChangeVisibility,
		onBlurInputTextOrder,
		onKeyPressInputTextOrder,
		onSelectAll,
		stateColumnChooser,
		onSubmitColumnChooser,
	} = useColumnChooserManager(columns, submit, lockedLeftItems);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and developpement of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, [id]);

	const { Provider } = columnChooserContext;
	const onSubmit = event => {
		onSubmitColumnChooser(event);
		onClose();
		event.preventDefault();
		// if (customClose) {
		// allow specific behavior on close
		// customClose(event);
		// }
	};
	return (
		<Provider
			value={{
				id,
				onBlurOrder: onBlurInputTextOrder,
				onChangeVisibility,
				onClose,
				onKeyPressOrder: onKeyPressInputTextOrder,
				onSelectAll,
				onSubmitColumnChooser,
				stateColumnChooser,
				t,
			}}
		>
			<form
				id={`${id}-column-chooser-content`}
				className={classNames(theme['tc-column-chooser'], 'tc-column-chooser')}
				onSubmit={event => onSubmit(event)}
			>
				{/*
				<RichLayout
					Header={<Header default />}
					Content={<Body default />}
					Footer={<Footer default />}
				/>
				 */}
				<RichLayout
					Header={
						<Header>
							<Header.Title value="Hello world" />
							<button>My Button</button>
						</Header>
					}
					Content={<Body>{hookColumns => <Body.ColumnChooserTable columns={hookColumns} />}</Body>}
					Footer={<Footer default />}
				/>
			</form>
		</Provider>
	);
}

ColumnChooserContent.Footer = Footer;

ColumnChooserContent.propTypes = {
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	lockedLeftItems: PropTypes.number,
	onClose: PropTypes.func,
	submit: PropTypes.func.isRequired,
	t: PropTypes.func,
};
