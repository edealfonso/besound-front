import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HomeContext } from '@/lib/contexts/HomeContext';

import AudioPlayer from '../common/AudioPlayer';

import styles from './PostList.module.scss';

export default function PostList({ posts }) {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const { searchString } = useContext(HomeContext);

    useEffect(() => {
        const path = router.asPath;
        const timer = setTimeout(() => {
            if (path.includes('#')) {
                // take id from URL
                const id = path.split('#')[1];

                // locate dom element and index
                const postElement = document.getElementById(id);
                const postIndex = posts.findIndex((post) => post.id === id);

                // scroll into view
                postElement.scrollIntoView({ behavior: 'smooth' });

                // once scrolled, start playing
                setTimeout(() => {
                    setSelected(postIndex);
                }, 400);
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [posts]);

    // update posts according to search string
    useEffect(() => {
        posts.forEach((post) => {
            const isVisible = post.title
                .toLowerCase()
                .includes(searchString ? searchString.toLowerCase() : '');
            document
                .getElementById(post.id)
                .parentNode.classList.toggle('hidden', !isVisible);
        });
    }, [searchString, posts]);

    return (
        <ul className={styles.list}>
            {posts.map((post, i) => (
                <li key={post.id}>
                    <div className={styles.anchor} id={post.id}></div>
                    <AudioPlayer
                        post={post}
                        selected={i === selected}
                        index={i}
                        emitClick={setSelected}
                    />
                </li>
            ))}
        </ul>
    );
}
