import { useContext, useEffect } from 'react';

import { HomeProvider } from '@/lib/contexts/HomeContext';
import { AppContext } from '@/lib/contexts/AppContext';
import { getHomePageAPI, getPostsListAPI } from '@/lib/api';

import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Splash from '@/components/home/Splash';
import PostList from '@/components/home/PostList';
import Container from '@/components/common/Container';
import Search from '@/components/home/Search';

export async function getServerSideProps() {
    const page = await getHomePageAPI();
    const posts = await getPostsListAPI();
    return {
        props: {
            page,
            posts
        }
    };
}

export default function HomePage({ posts, page }) {
    const { setRecordingStep } = useContext(AppContext);

    useEffect(() => {
        setRecordingStep(0);
    }, []);

    if (posts == null || page.error) {
        return (
            <Container>
                <Info warning>{page.error}</Info>
            </Container>
        );
    } else {
        return (
            <HomeProvider>
                <Layout noPaddings homePage>
                    <Search />
                    <Splash motto={page.motto} />
                    <Container onlyHorizontal>
                        <Info>{page.instruction}</Info>
                    </Container>
                    <PostList posts={posts} />
                </Layout>
            </HomeProvider>
        );
    }
}
