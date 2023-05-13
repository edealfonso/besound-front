import Layout from '@/components/common/Layout';
import Info from '@/components/common/Info';
import { getRecordPageAPI } from '@/lib/api';
import Container from '@/components/common/Container';

export async function getServerSideProps() {
    const page = await getRecordPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function Record({ page }) {
    return (
        <Layout>
            <Container onlyHorizontal>
                <Info>{page.instruction}</Info>
            </Container>
        </Layout>
    );
}
