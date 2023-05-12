import styles from './Container.module.scss';

export default function Container({ onlyHorizontal, children }) {
    return (
        <div
            className={`${styles.container} ${
                onlyHorizontal ? styles.onlyHorizontal : ''
            }`}
        >
            {children}
        </div>
    );
}
