import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SimpleTextKeyValue } from '../../Text';
import { TreeBranchIcon } from '../../Icons';
import theme from '../ModelViewer.scss';

function getBranchDisplayKey(union, hasSemanticAwareness, getDisplayKey, value) {
	if (union) {
		return '({...})';
	} else if (hasSemanticAwareness) {
		return `${getDisplayKey(value)}`;
	}
	return '';
}

/**
 * Render Model branch.
 * All the stuff about managing the special union case that needs to be expanded by default,
 * will be improve later on.
 * This is the workaround to make it work for now.
 */
export default class ModelViewerBranch extends React.Component {
	static propTypes = {
		dataKey: PropTypes.string,
		getChilds: PropTypes.func,
		getDisplayKey: PropTypes.func,
		getDisplayValue: PropTypes.func,
		hasSemanticAwareness: PropTypes.bool,
		index: PropTypes.number,
		isUnion: PropTypes.func,
		jsonpath: PropTypes.string,
		jsonPathSelection: PropTypes.string,
		level: PropTypes.number,
		onToggle: PropTypes.func,
		opened: PropTypes.bool,
		recursive: PropTypes.func,
		type: PropTypes.string,
		value: PropTypes.object,
	};

	/*
		We made this state props to keep track
		of the first click on a branch.
		It is used for the union case that needs
		to be expand by default.
	*/
	state = {
		firstClickUnion: true,
	};

	/*
		Union have to be expanded by default.
		So for the first click we have to change the state of the component,
		to keep the state that it has been clicked.
		We don't keep the track in others cases, no need for free render.
	 */
	onClickLeafBranch = event => {
		const options = {
			jsonpath: this.props.jsonpath,
			opened: this.props.opened,
			value: this.props.value,
		};
		const union = this.props.isUnion(this.props.value);
		if (this.state.firstClickUnion && union) {
			this.setState(
				{ firstClickUnion: false },
				this.props.onToggle(event, { ...options, firstClickUnion: true }, this.props.index),
			);
		} else {
			this.props.onToggle(event, options, this.props.index);
		}
	};

	render() {
		const { dataKey, index, jsonpath, jsonPathSelection, level, opened, type, value } = this.props;
		const union = this.props.isUnion(value);
		const displayKey = getBranchDisplayKey(
			union,
			this.props.hasSemanticAwareness,
			this.props.getDisplayKey,
			value,
		);
		const customOpened = union && this.state.firstClickUnion ? true : opened;
		return (
			<div
				className={classNames(theme['tc-model-branch'], 'tc-model-branch', {
					[theme['tc-model-branch-padding-left']]: level > 0,
					'tc-model-branch-padding-left': level > 0,
				})}
			>
				<span className={classNames(theme['tc-model-branch-content'], 'tc-model-branch-content')}>
					<button
						className={classNames(theme['tc-model-branch-button'], 'tc-model-branch-button', {
							[theme['tc-model-branch-button-highlighted']]: jsonpath === jsonPathSelection,
							'tc-model-branch-button-highlighted': jsonpath === jsonPathSelection,
						})}
						onClick={this.onClickLeafBranch}
					/>
					<TreeBranchIcon
						dataKey={dataKey}
						index={index}
						opened={customOpened}
						jsonpath={jsonpath}
						onToggle={this.onClickLeafBranch}
						value={value}
						className={classNames(theme['tc-model-branch-icon'], 'tc-model-branch-icon')}
					/>
					<SimpleTextKeyValue
						formattedKey={this.props.getDisplayValue(value)}
						formattedValue={displayKey}
						separator=" "
					/>
				</span>
				{customOpened && this.props.recursive({ type, value: this.props.getChilds(value) })}
			</div>
		);
	}
}
