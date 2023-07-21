import styles from './IconDefault.module.scss';

export function IconWarning() {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={styles.mediumIllustration}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.42831 37.5467C5.14847 37.5467 3.09226 34.0035 4.71952 31.1558L17.2929 9.1523C18.9328 6.28257 23.0707 6.28257 24.7105 9.1523L37.2839 31.1558C38.9112 34.0035 36.855 37.5467 33.5751 37.5467H8.42831ZM20 13C21.6149 13 22.885 14.3803 22.7509 15.9896L22.1661 23.0069C22.0722 24.1335 21.1305 25 20 25C18.8695 25 17.9278 24.1335 17.8339 23.0069L17.2491 15.9896C17.115 14.3803 18.3851 13 20 13ZM18 29C18 27.8954 18.8954 27 20 27C21.1046 27 22 27.8954 22 29C22 30.1046 21.1046 31 20 31C18.8954 31 18 30.1046 18 29Z"
				fill="var(--coral-color-illustration-color-03, hsla(0,100%,74%,1))"
			/>
			<path
				d="M12.0943 13.5L16.2929 6.15248C17.9328 3.28275 22.0707 3.28275 23.7105 6.15248L33.052 22.5L36.2839 28.156C37.9112 31.0037 35.855 34.5469 32.5751 34.5469H7.42831C4.14847 34.5469 2.09226 31.0037 3.71952 28.156L6.66578 23"
				stroke="var(--coral-color-illustration-color-02, hsla(215,69%,27%,1))"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M17.8347 24.0069L17.25 15.9896C17.1158 14.3803 18.3859 13 20.0008 13C21.6158 13 22.8858 14.3803 22.7517 15.9896L22.1669 24.0069M20.0008 31C18.8963 31 18.0008 30.1046 18.0008 29C18.0008 27.8954 18.8963 27 20.0008 27C21.1054 27 22.0008 27.8954 22.0008 29"
				stroke="var(--coral-color-illustration-color-02, hsla(215,69%,27%,1))"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<circle
				cx="10.2637"
				cy="16.5586"
				r="1"
				fill="var(--coral-color-illustration-color-02, hsla(215,69%,27%,1))"
			/>
			<circle
				cx="8.53906"
				cy="19.8359"
				r="1"
				fill="var(--coral-color-illustration-color-02, hsla(215,69%,27%,1))"
			/>
		</svg>
	);
}
