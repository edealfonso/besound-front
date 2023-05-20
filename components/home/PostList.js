import styles from './PostList.module.scss';
import AudioPlayer from '../common/AudioPlayer';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

export default function PostList({ posts }) {
    const [selected, setSelected] = useState(null);
    const { searchString } = useContext(AppContext);

    useEffect(() => {
        handleSearch(searchString);
    }, [searchString]);

    const handleClick = async (i) => {
        setSelected(i);
    };

    const handleSearch = (str) => {
        console.log(posts);
        posts.forEach((post) => {
            const isVisible = post.title
                .toLowerCase()
                .includes(str.toLowerCase());
            document
                .getElementById(post.id)
                .classList.toggle('hidden', !isVisible);
        });
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
