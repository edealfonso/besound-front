import Layout from '@/components/common/Layout';
import Info from '@/components/common/Info';
import { getHomePageAPI, getPostsListAPI } from '@/lib/api';
import Splash from '@/components/home/Splash';
import PostList from '@/components/home/PostList';
import Container from '@/components/common/Container';

export async function getServerSideProps() {
    const posts = await getPostsListAPI();
    const page = await getHomePageAPI();
    return {
        props: {
            posts,
            page
        }
    };
}

export default function Home({ posts, page }) {
    return (
        <Layout noPaddings>
            <Splash motto={page.motto} />
            <Container onlyHorizontal>
                <Info>{page.instruction}</Info>
            </Container>
            <PostList posts={posts} />
        </Layout>
    );
}
