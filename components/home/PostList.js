import styles from './PostList.module.scss';
import AudioPlayer from './AudioPlayer';

export default function PostList({ posts }) {
    return (
        <ul className={styles.list}>
            {posts.map((post) => {
                return (
                    <li key={post.id}>
                        <AudioPlayer post={post} />
                    </li>
                );
            })}
        </ul>
    );
}
