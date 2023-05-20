import styles from './PostList.module.scss';
import AudioPlayer from '../common/AudioPlayer';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HomeContext } from '@/lib/contexts/HomeContext';

export default function PostList({ posts }) {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const [isAnchor, setIsAnchor] = useState(null);
    const { searchString } = useContext(HomeContext);

    const path = router.asPath;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAnchor && path.includes('#')) {
                setIsAnchor(true);
                goToPost(path.split('#')[1]);
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        handleSearch(searchString);
    }, [searchString]);

    const goToPost = (id) => {
        // locate dom element and index
        const postElement = document.getElementById(id);
        const postIndex = posts.findIndex((post) => post.id === id);

        // scroll into view
        postElement.scrollIntoView({ behavior: 'smooth' });

        // once scrolled, start playing
        setTimeout(() => {
            setSelected(postIndex);
        }, 400);
    };

    const handleClick = async (i) => {
        setSelected(i);
    };

    const handleSearch = (str) => {
        posts.forEach((post) => {
            const isVisible = post.title
                .toLowerCase()
                .includes(str ? str.toLowerCase() : '');
            document
                .getElementById(post.id)
                .classList.toggle('hidden', !isVisible);
        });
    };

    return (
        <ul className={styles.list}>
            {posts.map((post, i) => (
                <li key={post.id} id={post.id}>
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
