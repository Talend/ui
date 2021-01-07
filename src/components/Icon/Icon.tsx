import React from 'react';
import styled, { StyledProps } from 'styled-components';
import classnames from 'classnames';

import tokens from '../../tokens';
import { IconsProvider } from '../IconsProvider';

/**
 * to update this list just use the following command within a React page with the IconsProvider instanciated
 * Array.from(document.querySelectorAll('symbol')).map(i => i.id).filter(Boolean).map(id => `| '${id}'`).join('\n')
 * */
export type IconName =
	| 'talend-activemq'
	| 'talend-apache'
	| 'talend-aws-kinesis'
	| 'talend-azure-cosmosDB'
	| 'talend-azure-dynamics'
	| 'talend-azure'
	| 'talend-beam'
	| 'talend-cassandra'
	| 'talend-cloudstorage'
	| 'talend-couchbase'
	| 'talend-dynamodb'
	| 'talend-elastic'
	| 'talend-flink-o'
	| 'talend-flink'
	| 'talend-google-dataflow'
	| 'talend-hadoop'
	| 'talend-jms'
	| 'talend-kafka'
	| 'talend-marketo'
	| 'talend-mongodb'
	| 'talend-neo4j'
	| 'talend-netsuite'
	| 'talend-postgresql'
	| 'talend-pubsub'
	| 'talend-pulsar'
	| 'talend-python'
	| 'talend-rabbitmq'
	| 'talend-snowflake'
	| 'talend-spark'
	| 'talend-thoughtspot'
	| 'talend-workday'
	| 'talend-calendar-move'
	| 'talend-column-chooser'
	| 'talend-datagrid'
	| 'talend-drag-and-drop'
	| 'talend-drag'
	| 'talend-empty-calendar'
	| 'talend-empty-cell'
	| 'talend-empty-char'
	| 'talend-empty-space'
	| 'talend-raw-data'
	| 'talend-rest'
	| 'talend-abc'
	| 'talend-activity'
	| 'talend-arrow-left'
	| 'talend-arrow-right'
	| 'talend-badge-outline'
	| 'talend-badge'
	| 'talend-bell-notification'
	| 'talend-bell'
	| 'talend-block'
	| 'talend-board'
	| 'talend-boolean'
	| 'talend-broom'
	| 'talend-bubbles'
	| 'talend-burger'
	| 'talend-campaigns'
	| 'talend-caret-down'
	| 'talend-carriage-return'
	| 'talend-chain'
	| 'talend-character'
	| 'talend-charts'
	| 'talend-check-circle'
	| 'talend-check-plus'
	| 'talend-check'
	| 'talend-chevron-end'
	| 'talend-chevron-left'
	| 'talend-classify'
	| 'talend-clock'
	| 'talend-cloud-engine'
	| 'talend-cloud-upgrade'
	| 'talend-cluster'
	| 'talend-cog'
	| 'talend-collapse'
	| 'talend-comment'
	| 'talend-component-negative'
	| 'talend-component-positive'
	| 'talend-connections'
	| 'talend-conversion'
	| 'talend-credits-engine'
	| 'talend-cross-circle'
	| 'talend-cross'
	| 'talend-crosshairs'
	| 'talend-cut'
	| 'talend-data-models'
	| 'talend-data-services'
	| 'talend-datasets'
	| 'talend-datastore'
	| 'talend-download'
	| 'talend-dropper'
	| 'talend-ellipsis'
	| 'talend-environment'
	| 'talend-error'
	| 'talend-expanded'
	| 'talend-export-history'
	| 'talend-export'
	| 'talend-eye-slash'
	| 'talend-eye'
	| 'talend-fieldglass'
	| 'talend-filter'
	| 'talend-flag'
	| 'talend-folder-closed'
	| 'talend-folder-shared-owner'
	| 'talend-folder-shared-user'
	| 'talend-folder-shared'
	| 'talend-folder'
	| 'talend-format'
	| 'talend-fullscreen'
	| 'talend-group-circle'
	| 'talend-group'
	| 'talend-grouping'
	| 'talend-hand-pointer'
	| 'talend-hierarchical-view'
	| 'talend-history'
	| 'talend-home'
	| 'talend-import'
	| 'talend-info-circle'
	| 'talend-launch'
	| 'talend-launcher'
	| 'talend-license'
	| 'talend-line-charts'
	| 'talend-link'
	| 'talend-list'
	| 'talend-local-storage'
	| 'talend-lock'
	| 'talend-locked'
	| 'talend-mask'
	| 'talend-maths'
	| 'talend-merge'
	| 'talend-minus-circle'
	| 'talend-most-trusted'
	| 'talend-network'
	| 'talend-note'
	| 'talend-numbers'
	| 'talend-opener'
	| 'talend-overview'
	| 'talend-panel-opener-bottom'
	| 'talend-panel-opener-right'
	| 'talend-pause'
	| 'talend-pencil'
	| 'talend-phone'
	| 'talend-pie-charts'
	| 'talend-pin'
	| 'talend-placeholder'
	| 'talend-play'
	| 'talend-plus-circle'
	| 'talend-plus'
	| 'talend-power-off'
	| 'talend-projects'
	| 'talend-promotion-pipelines'
	| 'talend-question-circle'
	| 'talend-quotes'
	| 'talend-re-cluster'
	| 'talend-redo'
	| 'talend-refresh'
	| 'talend-remote-engine'
	| 'talend-replicate'
	| 'talend-roles'
	| 'talend-routes'
	| 'talend-rules'
	| 'talend-sample'
	| 'talend-scheduler'
	| 'talend-search'
	| 'talend-semantic'
	| 'talend-send'
	| 'talend-share-alt'
	| 'talend-sharing-default'
	| 'talend-sharing-owner'
	| 'talend-sharing-user'
	| 'talend-shield-full-check'
	| 'talend-shield-full'
	| 'talend-shield'
	| 'talend-show_unassigned_tasks'
	| 'talend-sliders'
	| 'talend-smiley-angry'
	| 'talend-smiley-enthusiast'
	| 'talend-smiley-neutral'
	| 'talend-smiley-satisfied'
	| 'talend-smiley-sleep'
	| 'talend-smiley-unhappy'
	| 'talend-sort-19'
	| 'talend-sort-91'
	| 'talend-sort-asc'
	| 'talend-sort-az'
	| 'talend-sort-desc'
	| 'talend-sort-za'
	| 'talend-sort'
	| 'talend-star'
	| 'talend-stop'
	| 'talend-streams'
	| 'talend-table'
	| 'talend-tags'
	| 'talend-tasks'
	| 'talend-text'
	| 'talend-tiles'
	| 'talend-trash'
	| 'talend-undo'
	| 'talend-ungroup'
	| 'talend-union'
	| 'talend-unlocked'
	| 'talend-upload'
	| 'talend-user-circle'
	| 'talend-variable'
	| 'talend-versioning'
	| 'talend-warning'
	| 'talend-webhook'
	| 'talend-word'
	| 'talend-workspaces'
	| 'talend-world'
	| 'talend-wrench'
	| 'talend-zoomin'
	| 'talend-zoomout'
	| 'talend-file-cog'
	| 'talend-file-compressed'
	| 'talend-file-connect-o'
	| 'talend-file-csv-o'
	| 'talend-file-database-o'
	| 'talend-file-hdfs-o'
	| 'talend-file-job-o'
	| 'talend-file-json-o'
	| 'talend-file-move'
	| 'talend-file-o'
	| 'talend-file-s3-o'
	| 'talend-file-salesforce'
	| 'talend-file-txt-o'
	| 'talend-file-xls-o'
	| 'talend-file-xlsx-o'
	| 'talend-file-xml-o'
	| 'talend-files-o'
	| 'talend-flow-o'
	| 'talend-flow-source-o'
	| 'talend-flow-source-target'
	| 'talend-flow-step-o'
	| 'talend-flow-target-o'
	| 'talend-flow-under-plan'
	| 'talend-flow-unfinished'
	| 'talend-flow'
	| 'talend-between'
	| 'talend-contains'
	| 'talend-ends-with'
	| 'talend-equal'
	| 'talend-greater-than-equal'
	| 'talend-greater-than'
	| 'talend-less-than-equal'
	| 'talend-less-than'
	| 'talend-not-contains'
	| 'talend-not-equal'
	| 'talend-regex'
	| 'talend-starts-with'
	| 'talend-aggregate'
	| 'talend-azure-blob'
	| 'talend-azure-datalake'
	| 'talend-azure-event-hubs'
	| 'talend-bigquery'
	| 'talend-concatenate'
	| 'talend-db-input'
	| 'talend-delete-field'
	| 'talend-field-selector'
	| 'talend-filter-column'
	| 'talend-filter-row'
	| 'talend-ftp'
	| 'talend-hash-knife'
	| 'talend-normalize'
	| 'talend-semantic-filter'
	| 'talend-transformer-window'
	| 'talend-type-converter'
	| 'talend-window'
	| 'talend-api-designer-colored'
	| 'talend-api-designer-negative'
	| 'talend-api-designer-positive'
	| 'talend-api-tester-colored'
	| 'talend-api-tester-negative'
	| 'talend-api-tester-positive'
	| 'talend-component-kit-colored'
	| 'talend-component-kit-negative'
	| 'talend-component-kit-positive'
	| 'talend-data-fabric-colored'
	| 'talend-data-fabric-negative'
	| 'talend-data-fabric-positive'
	| 'talend-datacatalog-colored'
	| 'talend-datacatalog-negative'
	| 'talend-datacatalog-positive'
	| 'talend-dataprep'
	| 'talend-datastreams-colored'
	| 'talend-datastreams-negative'
	| 'talend-datastreams-positive'
	| 'talend-logo-colored'
	| 'talend-logo-square'
	| 'talend-logo'
	| 'talend-mdm-colored'
	| 'talend-mdm-negative'
	| 'talend-mdm-positive'
	| 'talend-studio-colored'
	| 'talend-studio-negative'
	| 'talend-studio-positive'
	| 'talend-tdc-colored'
	| 'talend-tdc-negative'
	| 'talend-tdc-positive'
	| 'talend-tdp-colored'
	| 'talend-tdp-negative'
	| 'talend-tdp-positive'
	| 'talend-tds-colored'
	| 'talend-tds-negative'
	| 'talend-tds-positive'
	| 'talend-tic-colored'
	| 'talend-tic-negative'
	| 'talend-tic-positive'
	| 'talend-tmc-colored'
	| 'talend-tmc-negative'
	| 'talend-tmc-positive'
	| string;

export enum SVG_TRANSFORMS {
	Spin = 'spin',
	Rotate45 = 'rotate-45',
	Rotate90 = 'rotate-90',
	Rotate135 = 'rotate-135',
	Rotate180 = 'rotate-180',
	Rotate225 = 'rotate-225',
	Rotate270 = 'rotate-270',
	Rotate315 = 'rotate-315',
	FlipHorizontal = 'flip-horizontal',
	FlipVertical = 'flip-vertical',
}

export type IconProps = StyledProps<any> &
	SVGElement & {
		className: string;
		name: IconName;
		monochrome: boolean;
		transform: SVG_TRANSFORMS;
	};

const SVG = styled.svg<IconProps>`
	width: ${tokens.sizes.l};
	height: ${tokens.sizes.l};
	transform-origin: center;

	circle,
	path,
	polygon {
		${({ currentColor }) => currentColor && 'fill: currentColor;'}
	}

	.ti-background {
		${({ currentColor }) => currentColor && 'display: none;'}
	}

	&.link {
		cursor: pointer;
	}

	&.spin {
		animation-name: svg-spin;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	&.rotate-45 {
		transform: rotate(45deg);
	}
	&.rotate-90 {
		transform: rotate(90deg);
	}
	&.rotate-180 {
		transform: rotate(180deg);
	}
	&.rotate-270 {
		transform: rotate(270deg);
	}
	&.flip-vertical {
		transform: scaleY(-1);
	}
	&.flip-horizontal {
		transform: scaleX(-1);
	}
	@keyframes svg-spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

function getCurrent(ref: React.Ref<SVGElement>) {
	if (typeof ref === 'object' && ref !== null && ref.current) {
		return ref.current;
	}
	return null;
}

export const Icon = React.forwardRef((props: IconProps, ref: React.Ref<SVGElement>) => {
	const { className, name = 'talend-empty-space', transform, ...rest } = props;
	const safeRef = ref || React.createRef<SVGElement>();
	const isRemote = name.startsWith('remote-');
	const imgSrc = name.replace('remote-', '').replace('src-', '');
	const [content, setContent] = React.useState<string>();
	const isRemoteSVG = isRemote && content && content.includes('svg') && !content.includes('script');

	React.useEffect(() => {
		if (isRemote) {
			fetch(imgSrc, {
				headers: {
					Accept: 'image/svg+xml',
				},
			})
				.then(response => {
					if (response.status === 200 && response.ok) {
						response.text().then(data => {
							setContent(data);
						});
					} else {
						console.error(
							new Error(
								`IconResponseError: status=${response.status} ok=${response.ok} url=${imgSrc}`,
							),
						);
					}
				})
				.catch(error => {
					console.error('IconResponseError', imgSrc, error);
				});
		}
	}, [imgSrc, isRemote]);

	React.useEffect(() => {
		const current = getCurrent(safeRef);
		if (current && isRemoteSVG && content) {
			// eslint-disable-next-line no-param-reassign
			current.innerHTML = content;
		} else if (current && !isRemote) {
			IconsProvider.injectIcon(name, current);
		}
	}, [isRemoteSVG, safeRef, content, name, isRemote]);

	const accessibility = {
		focusable: 'false', // IE11
		'aria-hidden': 'true',
	};
	if (name.startsWith('src-')) {
		// @ts-ignore
		return <img className="tc-icon" src={name.substring(4)} alt="" aria-hidden {...rest} />;
	}

	const classname = classnames('tc-svg-icon', className, transform);

	let iconElement = <SVG {...rest} {...accessibility} className={classname} ref={safeRef} />;

	if (isRemote && content && !isRemoteSVG) {
		const classNames = classnames('tc-icon', className);
		iconElement = (
			<img
				alt=""
				src={name.replace('remote-', '')}
				className={classNames}
				{...accessibility}
				{...rest}
			/>
		);
	}
	return iconElement;
});

export const IconMemo = React.memo(Icon);
