import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useGoToAnchoredPost(posts, setSelected) {
    const [postIndex, setPostIndex] = useState();
    const router = useRouter();
    const path = router.asPath;

    useEffect(() => {
        const goToPost = (id) => {
            // locate dom element and index
            const postElement = document.getElementById(id);
            setPostIndex(posts.findIndex((post) => post.id === id));

            setTimeout(() => {
                // once page loaded, scroll into view,
                postElement.scrollIntoView({ behavior: 'smooth' });

                // once scrolled, start playing
                setTimeout(() => {
                    setSelected(postIndex);
                }, 400);
            }, 500);
        };
        if (path.includes('#')) {
            // take id from URL
            const id = path.split('#')[1];
            goToPost(id);
        }
    }, [posts]);
}
