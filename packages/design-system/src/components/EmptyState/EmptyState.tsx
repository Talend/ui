import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import { IconName } from '@talend/icons';
import { StackVertical } from '../Stack';

import styles from './EmptyState.module.scss';
import Link from '../Link';
import { ButtonPrimary } from '../Button';

type IconIllustration = {
	variant: 'icon';
	callback?: never;
};

type SpotIllustration = {
	variant: 'spot';
	callback?: {
		label: string;
		action: () => void;
		icon?: IconName;
	};
};

type EmptyStateProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> & {
	title: string;
	description: string;
	docLinkURL?: string;
} & (SpotIllustration | IconIllustration);

const EmptyState = forwardRef((props: EmptyStateProps, ref: Ref<HTMLElement>) => {
	const { title, description, docLinkURL, variant, callback, ...commonProps } = props;

	return (
		<>
			<svg className={styles.symbol} xmlns="http://www.w3.org/2000/svg">
				<symbol id="activity" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M38.983 20.771c.011-.255.017-.513.017-.771 0-9.941-8.06-18-18-18-9.941 0-18 8.059-18 18 0 .258.005.516.016.771h3.752a.5.5 0 0 0 .483-.367L8.268 16.7c.642-2.337 3.899-2.485 4.75-.217l4.164 11.085 6.542-19.017c.8-2.325 4.124-2.22 4.775.151l3.214 11.7a.5.5 0 0 0 .483.368h6.788Zm-.379 3h-6.408a3.5 3.5 0 0 1-3.375-2.573l-2.786-10.14-6.468 18.802c-.762 2.216-3.88 2.26-4.704.066l-4.11-10.944-.61 2.216a3.5 3.5 0 0 1-3.375 2.573H3.395C5.13 31.901 12.352 38 21 38c8.647 0 15.87-6.098 17.604-14.229Z"
						fill="#FF7878"
					/>
					<path
						d="M1.642 22.27a1 1 0 1 1 0-2v2Zm31.483-2a1 1 0 0 1 0 2v-2ZM7.697 19.8l-.964-.264.964.265Zm1.017-3.702.965.265-.965-.265Zm1.9-.087-.935.352.936-.352Zm4.653 12.387-.936.351.936-.351Zm14-8.597.965-.265-.965.265Zm-.964.265-3.215-11.7 1.93-.53 3.213 11.7-1.928.53ZM9.679 16.363 8.66 20.066l-1.928-.53 1.017-3.703 1.929.53Zm-3.91 5.908H1.642v-2H5.77v2Zm25.427-2h1.929v2h-1.93v-2ZM14.33 28.749 9.679 16.363l1.872-.704 4.652 12.387-1.872.703ZM25.089 8.365l-6.995 20.331-1.89-.65 6.993-20.331 1.892.65ZM8.66 20.065a3 3 0 0 1-2.892 2.206v-2a1 1 0 0 0 .964-.735l1.928.53Zm-.91-4.232c.513-1.87 3.119-1.988 3.8-.174l-1.872.704-1.929-.53Zm8.452 12.213 1.891.65c-.61 1.773-3.104 1.808-3.763.053l1.872-.703Zm8.886-19.68-1.892-.651c.64-1.86 3.299-1.776 3.82.12l-1.928.53Zm5.143 11.17a1 1 0 0 0 .964.735v2a3 3 0 0 1-2.893-2.206l1.928-.53Z"
						fill="#080713"
					/>
					<circle cx="36.438" cy="21.313" r="1" fill="#080713" />
				</symbol>
				<symbol id="chart" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M31.809 4.277a2.666 2.666 0 0 0-2.66 2.674v26.732a2.666 2.666 0 0 0 2.66 2.673h2.659a2.666 2.666 0 0 0 2.659-2.673V6.951a2.666 2.666 0 0 0-2.66-2.674H31.81Zm-14.625 8.02a2.666 2.666 0 0 1 2.659-2.673h2.659a2.666 2.666 0 0 1 2.659 2.673v21.386a2.666 2.666 0 0 1-2.66 2.673h-2.658a2.666 2.666 0 0 1-2.66-2.673V12.297ZM5.218 22.99a2.666 2.666 0 0 1 2.659-2.673h2.659a2.666 2.666 0 0 1 2.659 2.673v10.693a2.666 2.666 0 0 1-2.659 2.673h-2.66a2.666 2.666 0 0 1-2.658-2.673V22.99Z"
						fill="#FF7878"
					/>
					<circle cx="15.398" cy="28.455" r="1" fill="#080713" />
					<circle cx="35.227" cy="13.317" r="1" fill="#080713" />
					<circle cx="35.227" cy="16.317" r="1" fill="#080713" />
					<circle cx="35.227" cy="19.317" r="1" fill="#080713" />
					<path
						d="M4.47 33.968a2.633 2.633 0 0 0 1.674.598h2.644a2.644 2.644 0 0 0 2.644-2.644V21.346a2.644 2.644 0 0 0-2.644-2.644H6.144A2.644 2.644 0 0 0 3.5 21.346v8.637M15.398 31.924a2.644 2.644 0 0 0 2.644 2.644h2.643a2.644 2.644 0 0 0 2.644-2.644V10.772a2.644 2.644 0 0 0-2.643-2.644h-2.644a2.644 2.644 0 0 0-2.644 2.644v13.915M35.227 10.063v-4.58a2.644 2.644 0 0 0-2.644-2.643H29.94a2.644 2.644 0 0 0-2.644 2.644v26.439a2.644 2.644 0 0 0 2.644 2.644h2.644a2.644 2.644 0 0 0 2.644-2.644v-8.86"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</symbol>
				<symbol id="chat" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10.507 4.27a5.899 5.899 0 0 0-5.899 5.898v17.696a5.9 5.9 0 0 0 4.867 5.809c.541.095.988.533.988 1.082v3.73a1 1 0 0 0 1.614.789l6.815-5.3a1 1 0 0 1 .614-.211h14.596A5.899 5.899 0 0 0 40 27.864V10.168a5.899 5.899 0 0 0-5.898-5.898H10.507Z"
						fill="#7DAFC9"
					/>
					<path
						d="M7.416 31.782h1.278c.109 0 .197.088.197.197v6.775c0 .163.188.255.317.155l9.11-7.085a.197.197 0 0 1 .12-.042h12.573a5.899 5.899 0 0 0 5.899-5.898V8.188a5.89 5.89 0 0 0-2.36-4.72M3.386 30.19a5.882 5.882 0 0 1-1.867-4.306V8.188a5.899 5.899 0 0 1 5.898-5.899h16.771"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M7.031 16.08c0-1.657 1.377-3 3.074-3 1.698 0 3.074 1.343 3.074 3s-1.376 3-3.074 3c-1.697 0-3.074-1.343-3.074-3Zm9.222 0c0-1.657 1.377-3 3.074-3 1.698 0 3.074 1.343 3.074 3s-1.376 3-3.074 3-3.074-1.343-3.074-3Zm12.296-3c-1.698 0-3.074 1.343-3.074 3s1.376 3 3.074 3 3.074-1.343 3.074-3-1.376-3-3.074-3Z"
						fill="#153C73"
					/>
					<path
						d="M28.635 2.29a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM31.936 2.29a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
						fill="#080713"
					/>
				</symbol>
				<symbol id="dataprep" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="m7.342 31.984 4.409-5.859h19.312l4.952 5.86c2.382 3.1.172 7.585-3.738 7.585H11.08c-3.91 0-6.12-4.485-3.738-7.586ZM25.001 29a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
						fill="#FF7878"
					/>
					<path
						d="M14.192 18.826a1 1 0 0 0 1.586 1.219l-1.586-1.219ZM5.664 30.268l-.758-.652-.018.02-.017.023.793.609Zm28.672 0 .794-.61-.017-.021-.019-.021-.758.652Zm-9.321-10.832-.793.609.017.022.018.021.758-.652ZM13.03 9.063l.197-.98a1 1 0 0 0-.484 1.937l.287-.957Zm14.058 0 .287.957a1 1 0 0 0-.478-1.94l.19.982ZM20 10.313l.004-1-.005 1ZM9.515 27.325A1 1 0 0 0 8 26.021l1.516 1.304Zm6.771-11.718h1V11.141h-2V15.607h1Zm-.508 4.438a7.285 7.285 0 0 0 1.508-4.438h-2a5.285 5.285 0 0 1-1.094 3.22l1.586 1.218ZM9.401 36.853c-3.08 0-4.82-3.533-2.944-5.976L4.87 29.66c-2.887 3.758-.208 9.194 4.53 9.194v-2Zm21.198 0H9.4v2H30.6v-2Zm2.945-5.976c1.876 2.443.135 5.976-2.945 5.976v2c4.738 0 7.418-5.437 4.53-9.194l-1.585 1.218Zm-9.287-10.789 9.321 10.832 1.516-1.304-9.321-10.833-1.516 1.305Zm-1.543-4.481c0 1.605.53 3.165 1.508 4.438l1.586-1.219a5.285 5.285 0 0 1-1.094-3.22h-2Zm-5.428-4.464c0-.77-.444-1.331-.858-1.686-.418-.36-.933-.622-1.383-.811a10.3 10.3 0 0 0-1.802-.56l-.01-.003h-.006l-.197.98-.198.98h.003a3.89 3.89 0 0 1 .108.025 8.794 8.794 0 0 1 1.328.422c.365.153.664.32.856.485.196.17.16.225.16.168h2Zm9.802-2.08-.191-.982h-.005a1.786 1.786 0 0 0-.046.01l-.122.027a11.484 11.484 0 0 0-1.699.523c-.462.188-.992.449-1.422.805-.421.349-.89.912-.89 1.697h2c0 .071-.046.018.165-.157.203-.167.517-.337.898-.491a8.9 8.9 0 0 1 1.477-.446l.022-.004h.004v-.001l-.191-.982Zm-2.374 6.544v-4.464h-2v4.464h2ZM13.03 9.063l-.287.957h.001l.003.002.01.003.039.011a36.719 36.719 0 0 0 .663.186c.442.119 1.061.277 1.772.436 1.402.315 3.231.648 4.764.655l.01-2c-1.309-.006-2.965-.299-4.337-.606a41.44 41.44 0 0 1-2.31-.59l-.032-.01a.592.592 0 0 0-.008-.002h-.001l-.287.957Zm6.965 2.25c1.559.007 3.42-.327 4.848-.644a42.872 42.872 0 0 0 2.479-.633l.038-.011.011-.004h.004l-.287-.959-.288-.957h-.002l-.007.003a9.248 9.248 0 0 1-.165.047 40.78 40.78 0 0 1-2.218.561c-1.396.311-3.078.603-4.404.597l-.01 2ZM6.422 30.92l3.093-3.595L8 26.021l-3.093 3.595 1.516 1.304Z"
						fill="#080713"
					/>
					<circle cx="10.915" cy="24.458" r="1" fill="#080713" />
					<circle cx="13" cy="22" r="1" fill="#080713" />
					<path
						d="M26.02 3.693a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM17 5.193a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
						fill="#FF7878"
					/>
					<path
						d="M23.5 29.402a3 3 0 1 0 4.098 1.098"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</symbol>
				<symbol id="overview" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9.618 21.984c0-1.537 1.278-2.783 2.855-2.783h5.71c1.576 0 2.854 1.246 2.854 2.783v8.348c0 1.536-1.278 2.782-2.855 2.782h-5.71c-1.576 0-2.854-1.246-2.854-2.782v-8.348Z"
						fill="#7DAFC9"
					/>
					<path
						d="M19.073 29.88a3.12 3.12 0 0 1-2.75 1.617h-6.22c-1.717 0-3.109-1.357-3.109-3.03v-9.092c0-1.674 1.392-3.031 3.11-3.031h6.218c1.718 0 3.11 1.357 3.11 3.03v7.274"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M24.648 19.46c0-.829.674-1.5 1.505-1.5h6.018c.831 0 1.505.671 1.505 1.5 0 .828-.674 1.5-1.505 1.5h-6.018c-.83 0-1.505-.672-1.505-1.5ZM24.648 25.52c0-.828.674-1.5 1.505-1.5h6.018c.831 0 1.505.672 1.505 1.5 0 .829-.674 1.5-1.505 1.5h-6.018c-.83 0-1.505-.671-1.505-1.5ZM24.648 31.583c0-.828.674-1.5 1.505-1.5h3.01c.83 0 1.504.672 1.504 1.5s-.674 1.5-1.505 1.5h-3.009c-.83 0-1.505-.672-1.505-1.5Z"
						fill="#FF7878"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M1.98 14.825v-4.55c0-3.426 2.758-6.204 6.16-6.204h24.64c3.402 0 6.16 2.778 6.16 6.204v4.55H1.98Zm7.512-7.183a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm4.514 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm3.014-1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
						fill="#FF7878"
					/>
					<path
						d="M1.979 9.07c0-3.347 2.694-6.061 6.018-6.061H32.07c3.324 0 6.018 2.714 6.018 6.061v21.215c0 1.652-.656 3.15-1.72 4.243m-10.43 1.818H7.997c-3.324 0-6.018-2.714-6.018-6.061V14.826"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<circle cx="24.221" cy="18.164" r="1" fill="#080713" />
					<circle cx="27.657" cy="18.164" r="1" fill="#080713" />
					<circle cx="29.666" cy="36.346" r="1" fill="#080713" />
					<circle cx="33.332" cy="35.945" r="1" fill="#080713" />
					<path
						d="M30.531 18.163h2.643m-1.805 6.162h-7.523m0 6.163h4.212"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</symbol>
				<symbol id="search" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M5.976 14.974c0 5.371 4.354 9.725 9.725 9.725 5.37 0 9.725-4.354 9.725-9.725 0-5.37-4.354-9.725-9.725-9.725-5.371 0-9.725 4.354-9.725 9.725Z"
						fill="#7DAFC9"
					/>
					<path
						d="M25.426 14.974a9.696 9.696 0 0 1-2.914 6.942A9.694 9.694 0 0 1 15.7 24.7a9.693 9.693 0 0 1-6.745-2.718 9.697 9.697 0 0 1-2.98-7.007 9.694 9.694 0 0 1 2.783-6.81A9.696 9.696 0 0 1 15.7 5.248a9.697 9.697 0 0 1 7.006 2.98"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M10.051 12.017a8.448 8.448 0 0 1 5.301-3.988"
						stroke="#FAF8F7"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M22.656 31.093c-1.337-1.337-1.356-3.485-.043-4.798l1.19-1.189c1.312-1.313 3.46-1.294 4.797.043l8.58 8.579c1.336 1.337 1.355 3.485.042 4.798l-1.189 1.189c-1.313 1.313-3.461 1.294-4.798-.043l-8.58-8.579Z"
						fill="#153C73"
					/>
					<path
						d="M15.7 28.57c2.75 0 5.31-.816 7.45-2.22-.044.826.25 1.666.88 2.297l7.573 7.573a3.021 3.021 0 0 0 4.273 0l1.068-1.068a3.021 3.021 0 0 0 0-4.273l-7.573-7.573a3.013 3.013 0 0 0-2.296-.88 13.532 13.532 0 0 0 2.222-7.452c0-7.509-6.088-13.596-13.596-13.596-7.51 0-13.597 6.087-13.597 13.596 0 3.782 1.545 7.204 4.037 9.668"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<circle cx="8.813" cy="26.688" r="1" fill="#080713" />
					<circle cx="12.188" cy="28.125" r="1" fill="#080713" />
				</symbol>
				<symbol id="settings" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M19.601 2.87a3.094 3.094 0 0 0-3.094 3.094c0 3.303-3.576 5.367-6.436 3.715a3.094 3.094 0 0 0-4.227 1.133l-1.547 2.68a3.094 3.094 0 0 0 1.133 4.226c2.86 1.652 2.86 5.78 0 7.432a3.094 3.094 0 0 0-1.133 4.227l1.547 2.68a3.094 3.094 0 0 0 4.227 1.132c2.86-1.651 6.436.413 6.436 3.716A3.094 3.094 0 0 0 19.601 40h3.095a3.094 3.094 0 0 0 3.094-3.094c0-3.303 3.575-5.367 6.436-3.716a3.094 3.094 0 0 0 4.227-1.132L38 29.377a3.094 3.094 0 0 0-1.133-4.227c-2.86-1.651-2.86-5.78 0-7.432A3.094 3.094 0 0 0 38 13.492l-1.547-2.68a3.094 3.094 0 0 0-4.227-1.133c-2.86 1.652-6.436-.412-6.436-3.715a3.094 3.094 0 0 0-3.095-3.095h-3.094Zm-.666 7.196a9.282 9.282 0 1 0 0 18.565 9.282 9.282 0 0 0 0-18.565Z"
						fill="#FF7878"
					/>
					<path
						d="M15.947 20.999a4.641 4.641 0 1 1 9.283 0 4.641 4.641 0 0 1-9.283 0Z"
						fill="#FF7878"
					/>
					<path
						d="M24.054 35.233a3.094 3.094 0 0 1-3.094 3.094h-3.094a3.094 3.094 0 0 1-3.094-3.094c0-3.303-3.576-5.368-6.437-3.716a3.094 3.094 0 0 1-4.226-1.133l-1.547-2.68a3.094 3.094 0 0 1 1.132-4.226c2.86-1.652 2.86-5.78 0-7.432a3.094 3.094 0 0 1-1.132-4.226l1.547-2.68a3.094 3.094 0 0 1 4.226-1.133c2.86 1.652 6.437-.413 6.437-3.716a3.094 3.094 0 0 1 3.094-3.094h3.094a3.094 3.094 0 0 1 3.094 3.094c0 3.303 3.576 5.368 6.436 3.716a3.094 3.094 0 0 1 4.227 1.133l1.547 2.68a3.094 3.094 0 0 1-1.133 4.226c-2.86 1.652-2.86 5.78 0 7.432a3.094 3.094 0 0 1 1.133 4.227l-1.547 2.68a3.094 3.094 0 0 1-4.227 1.132 4.25 4.25 0 0 0-4.29 0"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M10.13 19.763a9.282 9.282 0 1 0 9.283-9.283"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M19.41 24.402a4.641 4.641 0 1 1 4.095-2.454"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M16.448 11.025a.92.92 0 1 1-1.84 0 .92.92 0 0 1 1.84 0Zm-2.971 2.065a.92.92 0 1 1-1.84 0 .92.92 0 0 1 1.84 0ZM10.8 17.102a.92.92 0 1 0 0-1.84.92.92 0 0 0 0 1.84Z"
						fill="#080713"
					/>
				</symbol>
				<symbol id="user" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M20.998 4.153a6.956 6.956 0 1 0 0 13.911 6.956 6.956 0 0 0 0-13.91ZM5.22 32.383c2.263-6.536 8.473-11.23 15.779-11.23 7.305 0 13.515 4.694 15.778 11.23 1.006 2.904-1.576 5.464-4.65 5.464H9.871c-3.074 0-5.656-2.56-4.65-5.464Z"
						fill="#FF7878"
					/>
					<circle cx="7.25" cy="23.847" r="1" fill="#080713" />
					<circle cx="4.75" cy="26.847" r="1" fill="#080713" />
					<path
						d="M18.75 16.064a6.956 6.956 0 1 1 5-2.12M2.97 30.383c-1.005 2.904 1.577 5.463 4.65 5.463h22.258c3.073 0 5.655-2.56 4.65-5.463-2.263-6.536-8.473-11.23-15.779-11.23-3.1 0-6.001.845-8.489 2.317"
						stroke="#080713"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</symbol>
			</svg>
			<svg className={styles.symbol} xmlns="http://www.w3.org/2000/svg">
				<symbol
					id="spot-default"
					width="320"
					height="220"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M72.214 128.437c14.588 11.928 34.185 22.27 56.783 29.003 54.68 16.291 106.222 5.278 115.124-24.598 8.901-29.876-28.209-67.303-82.889-83.594C106.553 32.956 55.01 43.969 46.108 73.846c-3.037 10.194-.717 21.266 5.829 32.079M30 73.521c11.226-37.68 76.23-51.569 145.19-31.023 47.777 14.235 84.918 41.264 99.494 69.056m-85.959 76.721c-17.112-.722-35.505-3.761-54.189-9.328C79.496 162.548 38.571 129.169 30 97.204m201.197 87.525c25.024-5.875 43.09-18.547 48.529-36.804M81.976 82.054c-4.27 14.328 13.528 32.277 39.751 40.09 26.223 7.812 50.942 2.531 55.211-11.797 4.269-14.328-13.529-32.277-39.752-40.09-26.223-7.813-50.942-2.532-55.21 11.797Zm-18.06-4.464c-6.442 21.623 20.416 48.709 59.989 60.5 39.573 11.79 76.875 3.82 83.317-17.802 6.443-21.623-20.415-48.71-59.988-60.5s-76.876-3.82-83.318 17.802Z"
						stroke="#7DAFC9"
						strokeWidth="6"
						strokeLinecap="round"
					/>
					<circle cx="49.873" cy="66.361" r="8" fill="#FF7878" />
					<circle cx="280.75" cy="127.547" r="10" fill="#FF7878" />
					<circle cx="108.568" cy="168.869" r="10" fill="#FF7878" />
					<circle cx="202.627" cy="187.555" r="3" fill="#7DAFC9" />
					<circle cx="77.154" cy="171.156" r="3" fill="#7DAFC9" />
					<circle cx="66.824" cy="164.27" r="3" fill="#7DAFC9" />
					<circle cx="60.824" cy="118.27" r="3" fill="#7DAFC9" />
					<circle cx="217.551" cy="186.406" r="3" fill="#7DAFC9" />
					<path
						d="M249.073 114.633a5.755 5.755 0 0 1-1.219 4.342 5.766 5.766 0 0 1-3.98 2.129L89.058 139.961a7.728 7.728 0 0 1-5.168-1.328 7.714 7.714 0 0 1-3.072-4.358L60.792 52.573l-4.267-17.39-.31-1.271c-.891-3.547.917-11.553 6.741-12.753a.616.616 0 0 1 .205-.054l107.38-9.392 45.553-3.975a7.73 7.73 0 0 1 5.168 1.329 7.714 7.714 0 0 1 3.072 4.358l.505 2.071 24.097 98.292c.076.276.121.559.137.845Z"
						fill="#30255C"
					/>
					<path
						d="M249.074 114.632a6.366 6.366 0 0 1-2.349.772L91.909 134.262a7.734 7.734 0 0 1-5.168-1.328 7.712 7.712 0 0 1-3.072-4.359L64.714 51.284l-5.336-21.758-.002-.042-.31-1.271a5.742 5.742 0 0 1 .502-4.322 5.753 5.753 0 0 1 3.389-2.733.616.616 0 0 1 .205-.055c.315-.1.638-.17.967-.206L172.042 7.744l46.903-5.705a7.73 7.73 0 0 1 5.168 1.328 7.712 7.712 0 0 1 3.071 4.359l.31 1.271 24.294 99.091a5.738 5.738 0 0 1-2.714 6.544Z"
						fill="#FAF8F7"
					/>
					<path
						d="M224.84 15.495a6.322 6.322 0 0 1-2.408.818l-52.84 6.433L67.615 35.17a7.765 7.765 0 0 1-5.149-1.322 7.75 7.75 0 0 1-3.088-4.322l-.002-.042-.31-1.271a5.742 5.742 0 0 1 .502-4.322 5.753 5.753 0 0 1 3.389-2.733.616.616 0 0 1 .205-.055c.315-.1.638-.17.967-.206L172.042 7.744l46.903-5.705a7.718 7.718 0 0 1 8.24 5.686l.309 1.272a5.708 5.708 0 0 1-2.654 6.498Z"
						fill="#30255C"
					/>
					<path
						d="M106.786 78.013a17.013 17.013 0 0 1-11.357-2.924 16.978 16.978 0 0 1-6.758-9.574l-7.095.885a25.21 25.21 0 0 0 10.038 14.21 25.261 25.261 0 0 0 16.861 4.336l-1.689-6.933Zm-8.703-35.456 1.708 6.91a17.053 17.053 0 0 1 11.35 2.934 17.025 17.025 0 0 1 6.765 9.564l7.096-.863a25.198 25.198 0 0 0-10.044-14.22 25.247 25.247 0 0 0-16.875-4.325Z"
						fill="#153C73"
					/>
					<path
						d="M125.002 61.102a18.914 18.914 0 0 1-8.708 21.337 18.965 18.965 0 0 1-7.809 2.506l-5.196-21.198 21.713-2.645Z"
						fill="#30255C"
					/>
					<path
						d="m98.093 42.547 1.699 6.93a12.774 12.774 0 0 0-9.3 5.439 12.742 12.742 0 0 0-1.818 10.61l-7.098.865a18.903 18.903 0 0 1 2.692-15.77 18.937 18.937 0 0 1 13.825-8.074ZM151.95 41.681l-18.157 2.212-.883-3.597 18.159-2.212.881 3.597Z"
						fill="#FF7878"
					/>
					<path
						d="m171.244 50.18-34.869 4.248-.883-3.597 34.869-4.249.883 3.597ZM167.839 58.402l-29.605 3.606-.882-3.597 29.606-3.606.881 3.597ZM174.961 65.337l-34.872 4.247-.88-3.597 34.869-4.247.883 3.597Z"
						fill="#7DAFC9"
					/>
					<path d="m203.465 35.404-18.157 2.213-.882-3.597 18.159-2.211.88 3.595Z" fill="#FF7878" />
					<path
						d="m222.76 43.902-34.87 4.247-.882-3.598 34.869-4.246.883 3.597ZM219.352 52.123l-29.606 3.605-.881-3.594 29.607-3.609.88 3.598ZM226.477 59.064l-34.872 4.249-.88-3.597 34.869-4.25.883 3.598Z"
						fill="#7DAFC9"
					/>
					<path d="m99.82 124.238-3.949.479-4.74-19.333 3.95-.482 4.739 19.336Z" fill="#153C73" />
					<path
						d="m105.725 123.519-3.951.482-3.74-15.266 3.948-.479 3.743 15.263Z"
						fill="#FF7878"
					/>
					<path d="m111.695 122.79-3.951.479-7.191-29.34 3.951-.482 7.191 29.343Z" fill="#153C73" />
					<path d="m117.6 122.071-3.95.482-6.132-25.017 3.95-.481 6.132 25.016Z" fill="#FF7878" />
					<path
						d="m123.575 121.341-3.951.482-3.595-14.671 3.949-.482 3.597 14.671Z"
						fill="#153C73"
					/>
					<path
						d="m129.476 120.622-3.949.482-5.654-23.066 3.951-.481 5.652 23.065Z"
						fill="#FF7878"
					/>
					<path d="m135.448 119.898-3.949.482-7.399-30.19 3.948-.481 7.4 30.189Z" fill="#153C73" />
					<path
						d="m141.352 119.18-3.948.479-5.384-21.963 3.95-.481 5.382 21.965ZM159.483 92.59a5.818 5.818 0 0 1-5.08 7.333 7.766 7.766 0 0 1-5.188-1.332 7.748 7.748 0 0 1-3.087-4.373 5.818 5.818 0 0 1 5.079-7.333 7.77 7.77 0 0 1 5.189 1.333 7.752 7.752 0 0 1 3.087 4.373Z"
						fill="#FF7878"
					/>
					<path
						d="m183.147 102.058-33.67 4.104-.735-2.994 33.671-4.104.734 2.994ZM177.836 108.716l-26.926 3.282-.734-2.992 26.928-3.281.732 2.991ZM186.012 113.736l-33.67 4.103-.735-2.994 33.671-4.101.734 2.992Z"
						fill="#7DAFC9"
					/>
					<path
						d="M211.395 86.269a5.818 5.818 0 0 1-5.079 7.333 7.769 7.769 0 0 1-5.189-1.333 7.752 7.752 0 0 1-3.087-4.373 5.82 5.82 0 0 1 5.08-7.333 7.767 7.767 0 0 1 5.188 1.333 7.753 7.753 0 0 1 3.087 4.373Z"
						fill="#153C73"
					/>
					<path
						d="m235.057 95.736-33.67 4.101-.735-2.992 33.673-4.103.732 2.994ZM229.744 102.394l-26.928 3.281-.734-2.994 26.928-3.279.734 2.992ZM237.92 107.412l-33.67 4.101-.734-2.992 33.672-4.103.732 2.994Z"
						fill="#7DAFC9"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M204.846 47.943a10.605 10.605 0 0 0-4.369-6.272 16.134 16.134 0 0 0-5.919-2.528c-.862-.352-1.111-.054-.748.896 1.218.92 2.478 1.833 3.78 2.739-1.001.583-1.405 1.775-1.214 3.575a7.915 7.915 0 0 0 5.852 3.749l2.618-2.159Z"
						fill="#B27F64"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M250.141 76.06a40.497 40.497 0 0 1-3.72 4.211 32.213 32.213 0 0 1-6.395 5.026c-9.214-.262-16.248-2.527-21.044-6.74a78.89 78.89 0 0 1-11.772-17.544c-1.832-3.427-3.692-7.233-5.581-11.416l3.284-1.83 20.086 22.483 25.142 5.81Z"
						fill="#FF7878"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M246.422 80.272a32.21 32.21 0 0 1-6.394 5.025c-9.215-.261-16.249-2.527-21.045-6.739a78.891 78.891 0 0 1-11.772-17.544c6.743 9.76 14.562 16.353 19.678 16.527 5.755.204 16.51-1.016 19.533 2.73Z"
						fill="#000"
						fillOpacity=".1"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M243.165 211.015c-.03.959-.03 1.917-.059 2.876l-4.302-.029h-1.773c-.174-1.452-.349-2.905-.494-4.357-3.604-32.94-2.18-63.788-1.86-93.097l8.836.145 9.185.175c6.453 31.574-8.196 43.077-9.533 94.287Z"
						fill="#30255C"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M243.515 215.632c-1.453.146-2.848.291-4.186.407a94.425 94.425 0 0 1-12.382.349c-.465-3.573 7.557-3.312 9.447-6.943.058.029.087.058.145.058a7.158 7.158 0 0 0 1.773.727c1.52.529 3.14.708 4.738.523a1 1 0 0 1 .116.261 4.91 4.91 0 0 1 .349 4.618Z"
						fill="#FF7878"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M239.475 172.44c-.436 12.2-2.093 27.595-1.163 37.791a39.72 39.72 0 0 0 .494 3.631c.134.735.308 1.463.523 2.178a94.251 94.251 0 0 1-12.382.349c-.465-3.573 7.557-3.312 9.447-6.942.058.029.087.058.145.058-3.604-32.94-2.18-63.788-1.86-93.097l8.836.145c3.052 23.616-3.546 42.061-4.04 55.887Z"
						fill="#000"
						fillOpacity=".1"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="m260.578 212.61-1.424.697-3.488 1.743c-.785-.988-1.54-1.975-2.267-2.934-22.265-28.524-33.543-44.761-35.026-53.679-.261-11.851 4.535-26.782 15.261-41.044 1.511-1.946 3.081-3.921 4.795-5.838l8.604 4.531c.436 11.561-1.947 25.475-14.01 40.87 5.93 8.83 15.58 26.636 26.044 51.936.494 1.22 1.017 2.469 1.511 3.718Z"
						fill="#30255C"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M262.002 213.453c-.439.463-.905.9-1.396 1.307a16.876 16.876 0 0 1-6.693 3.629c-2.478.685-5.08.795-7.607.321-.175-4.182 7.644-1.684 7.092-6.593v-.116a6.595 6.595 0 0 0 2.616-.756 9.644 9.644 0 0 0 2.994-2.382c.029.03.029.03.058.03a6.993 6.993 0 0 1 2.936 4.56Z"
						fill="#FF7878"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M260.607 214.759a16.894 16.894 0 0 1-14.3 3.951c-.175-4.183 7.644-1.685 7.092-6.594-22.265-28.525-33.543-44.762-35.026-53.68-.261-11.851 4.535-26.781 15.261-41.043a5.93 5.93 0 0 1 1.191.464c7.529 3.951 3.488 8.54 3.488 8.54-12.469 18.91-18.05 27.915-9.795 42.09 7.586 13.071 17.352 34.857 27.497 42.757.787.65 1.634 1.224 2.529 1.714.21.104.414.22.61.349a5.285 5.285 0 0 1 1.453 1.452Z"
						fill="#000"
						fillOpacity=".1"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M255.604 128.171a44.646 44.646 0 0 1-9.563 3.573 24.69 24.69 0 0 1-22.207-4.357c6.744-11.939 5.087-19.781 4.592-30.035a93.167 93.167 0 0 1-.058-6.42c.095-2.743.357-5.479.785-8.19.088-.407.175-.814.262-1.192 3.488-13.042 20.899-12.316 23.806-3.05 4.505 11.822 5.299 28.379 2.383 49.671Z"
						fill="#FF7878"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M247.243 73.823c-1.421 2.94-4.417 3.416-8.989 1.43 2.586-2.251 1.464-4.434 1.503-7.04l5.93-.4a5.81 5.81 0 0 0 1.556 6.01Z"
						fill="#B27F64"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="m250.003 57.67-2.088 12.202c-5.585 2.743-9.125 3.055-10.621.935-1.901-3.118-1.835-8.474.198-16.067l12.511 2.93Z"
						fill="#B27F64"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M240.334 61.16a10.096 10.096 0 0 1-9.969.22c-2.086-1.783-4.525-3.518-2.99-8.552 2.754-7.457 11.005-3.67 13.981-1.016a4.756 4.756 0 0 1 6.347 2.07c1.366-1.058 5.831 2.105 4.724 5.638-1.106 3.532-2.293 3.04-1.613 4.774 1.826 4.635-2.063 6.742-4.462 7.348a6.143 6.143 0 0 1-5.178-.37c-.845-2.966 1.257-3.745 2.357-4.716 1.1-.97.809-3.767-.62-2.906-1.668 1.917-2.44 3.72-3.77 2.06a4.975 4.975 0 0 0 1.193-4.55Z"
						fill="#080713"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M233.625 90.067c-.134.3-.287.592-.458.874a18.095 18.095 0 0 1-2.206 2.88c-4.255 4.797-10.558 8.247-15.02 11.08-3.583 2.275-12.199 1.08-25.848-3.585a435.48 435.48 0 0 1-3.699-1.31l1.134-4.067 22.984.462 13.301-14.439a12.762 12.762 0 0 1 3.376-3.519c5.649-3.65 8.753 6.275 6.436 11.624Z"
						fill="#FF7878"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M187.536 95.937c-2.964-3.595-4.798-2.735-3.951-1.176.722 1.329-2.836-3.159-4.04-1.67a4.971 4.971 0 0 0 1.309 6.404 8.556 8.556 0 0 0 5.549.492l1.133-4.05Z"
						fill="#B27F64"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M246.044 131.744a24.689 24.689 0 0 1-22.207-4.357c6.744-11.939 5.029-20.799 4.535-31.052-4.745 3.55-11.848 9.283-14.307 9.283-4.099 1.103-13.114 0-27.321-5.734 15.846 2.73 20.874 2.522 28.024-.731a92.334 92.334 0 0 0 13.604-8.22c2.557-1.802 4.243-3.109 4.243-3.109s-.319 2.847-.523 6.74a67.38 67.38 0 0 0 .523 15.569c1.657 7.929-1.395 17.98 7.151 20.42 2.046.61 4.15 1.009 6.278 1.191Z"
						fill="#000"
						fillOpacity=".1"
					/>
				</symbol>
			</svg>
			<article {...commonProps} ref={ref} className={styles.emptyState}>
				<StackVertical gap="M" justify="center" align="center">
					{variant === 'icon' && (
						<svg className={styles.illustration_icon}>
							<use xlinkHref="#overview" />
						</svg>
					)}
					{variant === 'spot' && (
						<svg className={styles.illustration_spot}>
							<use xlinkHref="#spot-default" />
						</svg>
					)}
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>{description}</p>
					{callback && (
						<ButtonPrimary icon={callback.icon} onClick={callback.action}>
							{callback.label}
						</ButtonPrimary>
					)}
					{docLinkURL && (
						<Link href={docLinkURL} target="_blank">
							Learn more
						</Link>
					)}
				</StackVertical>
			</article>
		</>
	);
});

export default EmptyState;
