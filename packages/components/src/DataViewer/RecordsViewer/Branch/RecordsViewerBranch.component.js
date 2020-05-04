import React from 'react';
import get from 'lodash/get';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Skeleton from '../../../Skeleton';
import { LengthBadge } from '../../Badges';
import { TreeBranchIcon } from '../../Icons';
import theme from '../RecordsViewer.scss';

/**
 * Used with the lazy loading to allow the render of the skeleton.
 * @param {object} value
 */
export function isLoaded(value) {
	return get(value, 'loaded') !== false;
}

export class RecordsViewerBranch extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		getChilds: PropTypes.func,
		getChildsCount: PropTypes.func,
		getIcon: PropTypes.func,
		getObjectBranchDatakey: PropTypes.func.isRequired,
		index: PropTypes.number,
		jsonpath: PropTypes.string,
		level: PropTypes.number.isRequired,
		nodeHighlighted: PropTypes.bool,
		onToggle: PropTypes.func.isRequired,
		opened: PropTypes.bool,
		recursive: PropTypes.func,
		renderBranchAdditionalValue: PropTypes.func,
		sample: PropTypes.object,
		type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		value: PropTypes.object,
	};

	onKeyDown = event => {
		switch (event.keyCode) {
			case keycode.codes.enter:
			case keycode.codes.space:
				event.preventDefault(); // prevent scroll with space
				event.stopPropagation();
				this.onClickRecordsBranch(event);
				break;
			default:
				break;
		}
	};

	onClickRecordsBranch = event => {
		this.props.onToggle(
			event,
			{
				jsonpath: this.props.jsonpath,
				opened: this.props.opened,
				value: this.props.value,
			},
			this.props.index,
		);
	};

	render() {
		const { className, dataKey, nodeHighlighted, opened, level, type, value } = this.props;
		if (!isLoaded(value)) {
			return (
				<div
					className={classNames(
						theme['tc-records-viewer-skeleton'],
						'tc-records-viewer-skeleton',
						className,
					)}
				>
					<Skeleton />
				</div>
			);
		}
		return (
			<div
				className={classNames(
					theme['tc-records-viewer-branch'],
					'tc-records-viewer-branch',
					className,
				)}
			>
				<span
					className={classNames(
						theme['tc-records-viewer-branch-content'],
						'tc-records-viewer-branch-content',
						{
							[theme['tc-records-viewer-branch-highlighted']]: nodeHighlighted,
							'tc-records-viewer-branch-highlighted': nodeHighlighted,
						},
					)}
					onKeyDown={this.onKeyDown}
					onClick={this.onClickRecordsBranch}
					tabIndex="0"
					role="button"
				>
					<TreeBranchIcon
						dataKey={dataKey}
						getIcon={this.props.getIcon}
						index={this.props.index}
						jsonpath={this.props.jsonpath}
						onToggle={this.props.onToggle}
						opened={opened}
						useCustomIcon={type === 'object'}
						value={value}
					/>
					<span
						key="datakey"
						className={classNames(
							theme['tc-records-viewer-branch-text'],
							'tc-records-viewer-branch-text',
						)}
					>
						{this.props.getObjectBranchDatakey(dataKey, value)}
					</span>
					{level !== 0 && <LengthBadge lengthValue={this.props.getChildsCount(value)} />}
					{this.props.renderBranchAdditionalValue &&
						this.props.renderBranchAdditionalValue({ value, opened })}
				</span>
				{opened &&
					this.props.recursive({
						type,
						value: this.props.getChilds(
							value,
							get(value, 'schema', this.props.sample.schema),
							type,
						),
					})}
			</div>
		);
	}
}

export default RecordsViewerBranch;
