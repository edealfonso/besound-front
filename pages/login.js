import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Container from '@/components/common/Container';

import { getLoginPageAPI } from '@/lib/api';
import { AppContext } from '@/lib/contexts/AppContext';
import { useContext } from 'react';

export async function getServerSideProps() {
    const page = await getLoginPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function Login({ page }) {
    const { setIsAuthenticated } = useContext(AppContext);

    const handleLogin = () => {
        // Perform authentication logic
        console.log('auth');
        setIsAuthenticated(true);
    };

    return (
        <Layout>
            <Info>{page.instruction}</Info>
            <button onClick={handleLogin}>{page.button}</button>
        </Layout>
    );
}
