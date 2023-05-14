import styles from './PostList.module.scss';
import AudioPlayer from '../common/AudioPlayer';

export default function PostList({ posts }) {
    return (
        <ul className={styles.list}>
            {posts.map((post) => (
                <li key={post.id}>
                    <AudioPlayer post={post} />
                </li>
            ))}
        </ul>
    );
}
