import styles from './Trial.module.scss';

export function Trial({ children }: { children: string }) {
	return <div className={styles.trial}>{children}</div>;
}
