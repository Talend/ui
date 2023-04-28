import { render, screen } from '@testing-library/react';
import Action from './Action.component';

jest.unmock('@talend/design-system');

const MyActionButton = jest.fn(() => <div>mock</div>);
MyActionButton.displayName = 'MyActionButton';
const MyActionSplitDropdown = jest.fn(() => <div>mock split</div>);
MyActionSplitDropdown.displayName = 'MyActionSplitDropdown';
const MyActionDropdown = jest.fn(() => <div>mock dropdown</div>);
MyActionDropdown.displayName = 'MyActionDropdown';
const MyActionFile = jest.fn(() => <div>I am a file</div>);
MyActionFile.displayName = 'MyActionFile';
const MyActionIconToggle = jest.fn(() => <div>icon toggle</div>);
MyActionIconToggle.displayName = 'MyActionIconToggle';
const renderers = {
	ActionButton: MyActionButton,
	ActionFile: MyActionFile,
	ActionSplitDropdown: MyActionSplitDropdown,
	ActionDropdown: MyActionDropdown,
	ActionIconToggle: MyActionIconToggle,
};
const getComponent = key => renderers[key];

describe('Action', () => {
	it('should render a button', () => {
		render(<Action label="hello world" />);
		expect(screen.getByText('hello world')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
	it('should render MyActionButton', () => {
		render(<Action label="hello world" getComponent={getComponent} />);
		expect(MyActionButton).toHaveBeenCalled();
	});
	it('should render ActionFile', () => {
		render(<Action label="hello world" displayMode="file" />);
		const input = screen.getByLabelText('hello world');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'file');
	});
	it('should render MyActionFile', () => {
		render(<Action label="hello world" displayMode="file" getComponent={getComponent} />);
		expect(screen.getByText('I am a file')).toBeInTheDocument();
		expect(screen.queryByText('hello world')).not.toBeInTheDocument();
	});
	it('should render ActionSplitDropdown', () => {
		render(<Action label="hello world" displayMode="splitDropdown" />);
		const btns = screen.getAllByRole('button');
		expect(btns[0]).toHaveClass('theme-tc-split-dropdown');
		expect(btns[0]).toHaveTextContent('hello world');
		expect(btns[1]).toHaveClass('dropdown-toggle');
	});
	it('should render MyActionSplitDropdown', () => {
		render(<Action label="hello world" displayMode="splitDropdown" getComponent={getComponent} />);
		expect(screen.getByText('mock split')).toBeInTheDocument();
	});
	it('should render ActionDropdown', () => {
		render(<Action label="hello world" displayMode="dropdown" />);
		expect(screen.getByText('hello world')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveClass('dropdown-toggle');
	});
	it('should render MyActionDropdown', () => {
		render(<Action label="hello world" displayMode="dropdown" getComponent={getComponent} />);
		expect(screen.getByText('mock dropdown')).toBeInTheDocument();
	});
	it('should render ActionIconToggle', () => {
		render(<Action label="hello world" displayMode="iconToggle" icon="foo" />);
		expect(screen.queryByText('hello world')).not.toBeInTheDocument();
		expect(screen.getByLabelText('hello world')).toBeInTheDocument();
		expect(screen.getByLabelText('hello world').childNodes[0]).toHaveAttribute('name', 'foo');
	});
	it('should render MyActionIconToggle ', () => {
		render(<Action label="hello world" displayMode="iconToggle" getComponent={getComponent} />);
		expect(screen.getByText('icon toggle')).toBeInTheDocument();
	});
});
