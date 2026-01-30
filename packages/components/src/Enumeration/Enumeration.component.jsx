import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import theme from './Enumeration.module.css';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { HeaderEnumeration } from './Header/HeaderEnumeration.component';
import { ItemsEnumeration } from './Items/ItemsEnumeration.component';
import {
	DISPLAY_MODE_ADD,
	DISPLAY_MODE_DEFAULT,
	DISPLAY_MODE_EDIT,
	DISPLAY_MODE_SEARCH,
	DISPLAY_MODE_SELECTED,
} from './displayModes';
import { propTypes } from './Enumeration.propTypes';

export function EnumerationComponent(props) {
	return (
		<div
			id={props.id}
			className={classNames(
				{
					[theme['tc-enumeration']]: true,
					'tc-enumeration': true,
				},
				props.className,
			)}
		>
			<HeaderEnumeration {...props} />
			<ItemsEnumeration {...props} />
		</div>
	);
}

EnumerationComponent.displayName = 'Enumeration';

EnumerationComponent.defaultProps = {
	id: 'tc-enumeration',
};
EnumerationComponent.propTypes = propTypes;

EnumerationComponent.DISPLAY_MODE_DEFAULT = DISPLAY_MODE_DEFAULT;
EnumerationComponent.DISPLAY_MODE_ADD = DISPLAY_MODE_ADD;
EnumerationComponent.DISPLAY_MODE_SEARCH = DISPLAY_MODE_SEARCH;
EnumerationComponent.DISPLAY_MODE_EDIT = DISPLAY_MODE_EDIT;
EnumerationComponent.DISPLAY_MODE_SELECTED = DISPLAY_MODE_SELECTED;

/** @type Function */
const EnumerationComponentWithTranslation =
	withTranslation(I18N_DOMAIN_COMPONENTS)(EnumerationComponent);
export default EnumerationComponentWithTranslation;
