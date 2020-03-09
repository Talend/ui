import DefaultIntCellRenderer from '../src/components/DefaultIntCellRenderer';
import DefaultHeaderRenderer from '../src/components/DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from '../src/components/DefaultPinHeaderRenderer';
import DefaultCellRenderer from '../src/components/DefaultCellRenderer';
import DefaultRenderer from '../src/components/DefaultCellRenderer/DefaultRenderer.component';

export default function getComponent(component) {
	switch (component) {
		case 'DefaultIntCellRenderer':
			return DefaultIntCellRenderer;
		case 'DefaultHeaderRenderer':
			return DefaultHeaderRenderer;
		case 'DefaultPinHeaderRenderer':
			return DefaultPinHeaderRenderer;
		case 'DefaultCellRenderer':
			return DefaultCellRenderer;
		case 'DefaultStringCellRenderer':
			return DefaultRenderer;
		default:
			return DefaultRenderer;
	}
}
