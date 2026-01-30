import styles from './Trial.module.css';

export function Trial({ children }: { children: string }) {
	return <div className={styles.trial}>{children}</div>;
}
