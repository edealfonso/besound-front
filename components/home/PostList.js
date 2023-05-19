import styles from './PostList.module.scss';
import AudioPlayer from '../common/AudioPlayer';
import { useState } from 'react';

export default function PostList({ posts }) {
    const [selected, setSelected] = useState(null);

    const handleClick = async (i) => {
        setSelected(i);
    };

    return (
        <ul className={styles.list}>
            {posts.map((post, i) => (
                <li key={post.id}>
                    <AudioPlayer
                        post={post}
                        selected={i === selected}
                        index={i}
                        emitClick={handleClick}
                    />
                </li>
            ))}
        </ul>
    );
}
