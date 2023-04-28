import styles from './Trial.module.scss';

function Trial({ children }: { children: string }) {
	return <div className={styles.trial}>{children}</div>;
}

export default Trial;
