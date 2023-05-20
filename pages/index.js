import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import { getHomePageAPI, getPostsListAPI } from '@/lib/api';
import Splash from '@/components/home/Splash';
import PostList from '@/components/home/PostList';
import Container from '@/components/common/Container';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import Footer from '@/components/footer/Footer';
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

export default function Home({ posts, page }) {
    const { setRecordingStep } = useContext(AppContext);

    useEffect(() => {
        setRecordingStep(0);
    }, []);

    return (
        <Layout noPaddings>
            <Search />
            <Splash motto={page.motto} />
            <Container onlyHorizontal>
                <Info>{page.instruction}</Info>
            </Container>
            <PostList posts={posts} />
        </Layout>
    );
}
