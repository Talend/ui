import PropTypes from 'prop-types';
import React from 'react';
import Badge from 'react-talend-components/lib/Badge';
import { MenuItem } from 'react-bootstrap';
import classNames from 'classnames';
import keycode from 'keycode';
import theme from './MultiSelectTagWidget.scss';

const ENTER = 'ENTER';
const LEAVE = 'LEAVE';

const INPUT_TEXT_INDENT = 7.5;
const INPUT_HEIGHT = 38;
const INPUT_MIN_WIDTH = 135;
const DROP_DOWN_ITEM_HEIGHT = 39;
const DROP_DOWN_PADDING = 10;

function mapValue2Label(enumOptions) {
	return enumOptions.reduce((map, option) => {
		map[option.value] = option.label; // eslint-disable-line no-param-reassign
		return map;
	}, {});
}

function DropDownOptions({
	options, onSelectOption, filterText, createIfNoneMatch, onCreateNew, onMouseEvent,
	selectedIndex, noAvailableMessage,
}) {
	const optionsToShow = options.map((item, index) => (
		<MenuItem active={selectedIndex === index} key={index} onClick={() => onSelectOption(item)}>
			{item.label}
		</MenuItem>
	));
	const NO_AVAILABLE = (
		<MenuItem onClick={() => onSelectOption()}>
			{noAvailableMessage}
		</MenuItem>
	);
	const NEW_OPTION = (
		<MenuItem active onClick={onCreateNew}>
			{filterText} (new)
		</MenuItem>
	);

	function renderOptions() {
		if (optionsToShow.length > 0) {
			return optionsToShow;
		} else if (createIfNoneMatch && filterText.length > 0) {
			return NEW_OPTION;
		}
		return NO_AVAILABLE;
	}

	return (
		<ul
			role="menu"
			className={classNames(theme['dropdown-menu'], 'dropdown-menu')}
			onMouseEnter={() => onMouseEvent(ENTER)}
			onMouseLeave={() => onMouseEvent(LEAVE)}
		>
			{renderOptions()}
		</ul>
	);
}

class MultiSelectTagWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDropDownOptions: false,
			selectedIndex: 0,
			filterText: '',
		};

		this.isMouseHoverOnOptions = false;

		this.toggleDropDownOptions = this.toggleDropDownOptions.bind(this);
		this.onCreateNewTag = this.onCreateNewTag.bind(this);
		this.onSelectTag = this.onSelectTag.bind(this);
		this.onMouseEvent = this.onMouseEvent.bind(this);
	}

	onFilterTextChange(event) {
		this.setState({
			filterText: event.target.value,
		});
	}

	onSelectTag(tag) {
		if (tag) {
			const { onChange, value } = this.props;
			const nextValue = value.concat(tag.value);
			onChange(nextValue);
		}
		this.input.focus();
	}

	onCreateNewTag() {
		const { onChange, value } = this.props;
		const nextValue = value.concat(this.state.filterText);
		this.setState({ filterText: '' });
		onChange(nextValue);
		this.input.focus();
	}

	onRemoveTag(tagValue) {
		const { onChange, value } = this.props;
		const nextValue = value.filter(val => val !== tagValue);
		onChange(nextValue);
	}

	onMouseEvent(event) {
		switch (event) {
		case ENTER: {
			this.isMouseHoverOnOptions = true;
			break;
		}
		default:
			this.isMouseHoverOnOptions = false;
		}
	}

	onInputMount(input) {
		this.input = input;
	}

	onComponentMount(component) {
		this.component = component;
	}

	onKeyDown(event) {
		const optionsToShow = this.getOptionsToShow();
		switch (event.which) {
		case keycode.codes.backspace: {
			if (this.state.filterText === '' && this.props.value.length > 0) {
				this.onRemoveTag(this.props.value[this.props.value.length - 1]);
			}
			break;
		}
		case keycode.codes.enter: {
			if (optionsToShow.length > 0) {
				this.onSelectTag(optionsToShow[this.state.selectedIndex]);
				this.setState({
					selectedIndex: 0,
				});
				this.scrollDropDownIfRequired(0, keycode.codes.up);
			} else if (this.state.filterText.length > 0) {
				const { schema } = this.props;
				if (schema.createIfNoneMatch) {
					this.onCreateNewTag();
				}
			}
			event.preventDefault();
			break;
		}
		case keycode.codes.up: {
			if (this.state.selectedIndex > 0) {
				this.setState({
					selectedIndex: this.state.selectedIndex - 1,
				});
				this.scrollDropDownIfRequired(this.state.selectedIndex - 1, keycode.codes.up);
			}
			break;
		}
		case keycode.codes.down: {
			if (this.state.selectedIndex < optionsToShow.length - 1) {
				this.setState({
					selectedIndex: this.state.selectedIndex + 1,
				});
				this.scrollDropDownIfRequired(this.state.selectedIndex + 1, keycode.codes.down);
			}
			break;
		}
		default: {
			this.setState({
				selectedIndex: 0,
			});
			break;
		}
		}
	}

	onTagsMount(tags) {
		if (tags && this.input) {
			const lastTag = tags.querySelector('div.tc-badge:last-child');
			const inputWidth = this.input.offsetWidth;
			let paddingTop = 0;
			let height = INPUT_HEIGHT;
			let paddingLeft = INPUT_TEXT_INDENT;

			if (lastTag) {
				const overflowCheck = lastTag.offsetLeft + lastTag.offsetWidth;

				if (tags.offsetHeight > INPUT_HEIGHT) {
					paddingTop = tags.offsetHeight - INPUT_HEIGHT;
				}
				if (inputWidth < INPUT_MIN_WIDTH + overflowCheck) {
					paddingTop += INPUT_HEIGHT;
				} else {
					paddingLeft += overflowCheck;
				}

				height += paddingTop;
			}

			this.input.style.paddingLeft = `${paddingLeft}px`;
			this.input.style.paddingTop = `${paddingTop}px`;
			this.input.style.height = `${height}px`;
		}
	}

	getOptionsToShow() {
		const { value, options } = this.props;
		return options.enumOptions.filter(
			option => value.indexOf(option.value) < 0,
		).filter(
			item => item.label.toUpperCase().indexOf(this.state.filterText.toUpperCase()) > -1,
		);
	}

	scrollDropDownIfRequired(selectedIndex, direction) {
		const dropDown = this.component.querySelector('.dropdown-menu');
		const scrollPosition = dropDown.scrollTop;
		const dropDownHeight = dropDown.clientHeight;
		const itemStart = (selectedIndex * DROP_DOWN_ITEM_HEIGHT) + DROP_DOWN_PADDING;
		const itemEnd = ((selectedIndex + 1) * DROP_DOWN_ITEM_HEIGHT) + DROP_DOWN_PADDING;

		if (direction === keycode.codes.down) {
			if (itemStart < scrollPosition) {
				dropDown.scrollTop = itemStart;
			}
			if (itemEnd > (scrollPosition + dropDownHeight)) {
				dropDown.scrollTop = ((itemEnd - dropDownHeight));
			}
		}
		if (direction === keycode.codes.up) {
			if (itemStart > scrollPosition + dropDownHeight) {
				dropDown.scrollTop = ((itemEnd - dropDownHeight));
			}
			if (itemStart < scrollPosition) {
				dropDown.scrollTop = itemStart;
			}
		}
	}

	toggleDropDownOptions(isOpen) {
		if (!isOpen && this.isMouseHoverOnOptions) {
			return;
		}
		this.setState({
			showDropDownOptions: isOpen,
		});
	}

	render() {
		const { value, readonly, schema, options } = this.props;
		const optionsToShow = this.getOptionsToShow();
		const value2Label = mapValue2Label(options.enumOptions);
		const className = classNames({
			[theme.dropdown]: true,
			dropdown: true,
			open: this.state.showDropDownOptions,
		});
		const badgeStyle = { display: 'inline-flex' };

		return (
			<div className={className} ref={component => this.onComponentMount(component)}>
				<input
					aria-label="Filter"
					value={this.state.filterText}
					disabled={readonly}
					className={classNames(theme['form-control'], 'form-control')}
					onChange={event => this.onFilterTextChange(event)}
					onFocus={() => this.toggleDropDownOptions(true)}
					onBlur={() => this.toggleDropDownOptions(false)}
					onKeyDown={event => this.onKeyDown(event)}
					ref={input => this.onInputMount(input)}
				/>
				<div className={classNames(theme['dropdown-toggle'], 'dropdown-toggle')}>
					<span className="caret" />
				</div>
				<div
					style={{ display: 'inline-block' }}
					className={classNames(theme['tags-container'], 'tags-container')}
					ref={tags => this.onTagsMount(tags)}
				>
					{
						value.map((val, index) => {
							const label = value2Label[val] || val;
							const BadgeProps = { label, key: index, style: badgeStyle };
							if (!readonly) {
								BadgeProps.onDelete = () => this.onRemoveTag(val);
							}
							return (
								<Badge {...BadgeProps} />
							);
						})
					}
				</div>
				{
					this.state.showDropDownOptions &&
					<DropDownOptions
						options={optionsToShow}
						onSelectOption={this.onSelectTag}
						filterText={this.state.filterText}
						createIfNoneMatch={schema.createIfNoneMatch}
						onCreateNew={this.onCreateNewTag}
						onMouseEvent={this.onMouseEvent}
						selectedIndex={this.state.selectedIndex}
						noAvailableMessage={schema.noAvailableMessage}
					/>
				}
			</div>
		);
	}
}

DropDownOptions.defaultProps = {
	noAvailableMessage: 'No Available',
};

if (process.env.NODE_ENV !== 'production') {
	const Tag = PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string,
	});

	DropDownOptions.propTypes = {
		options: PropTypes.arrayOf(Tag),
		onSelectOption: PropTypes.func.isRequired,
		filterText: PropTypes.string,
		createIfNoneMatch: PropTypes.bool,
		onCreateNew: PropTypes.func,
		onMouseEvent: PropTypes.func,
		selectedIndex: PropTypes.number,
		noAvailableMessage: PropTypes.string,
	};

	MultiSelectTagWidget.propTypes = {
		value: PropTypes.array, //eslint-disable-line
		options: PropTypes.shape({
			enumOptions: PropTypes.arrayOf(Tag),
		}),
		readonly: PropTypes.bool,
		onChange: PropTypes.func,
		schema: PropTypes.object.isRequired, //eslint-disable-line
	};
}

export default MultiSelectTagWidget;
