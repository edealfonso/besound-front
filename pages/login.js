import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';

import { getLoginPageAPI, loginUserAPI } from '@/lib/api';
import { useKeyPress } from '@/lib/hooks/useKeyPress';

import nookies from 'nookies';

import Link from 'next/link';
import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Head from 'next/head';

export async function getStaticProps() {
    const page = await getLoginPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function LoginPage({ page }) {
    const router = useRouter();
    const submitButton = useRef();
    const [formError, setFormError] = useState(false);
    const [errors, setErrors] = useState({
        email: null,
        password: null
    });

    useKeyPress((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitButton.current.focus();
            submitButton.current.click();
        }
    });

    // from https://regexr.com/3e48o
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    function handleEmailChange(e) {
        const val = e.target.value;
        setFormError(false);

        // check valid mail
        if (!email_pattern.test(val)) {
            setErrors({
                ...errors,
                email: 'Please enter valid email'
            });
        } else {
            setErrors({
                ...errors,
                email: null
            });
        }
    }

    function handlePasswordChange(e) {
        const val = e.target.value;
        setFormError(false);

        // check max length
        if (val.length > 40) {
            setErrors({
                ...errors,
                password: 'Password must be less than 40 characters'
            });
        } else {
            setErrors({
                ...errors,
                password: null
            });
        }
    }

    async function handleLogin(e) {
        // Stop the form from submitting and refreshing the page.
        e.preventDefault();

        if (!errors.email && !errors.password) {
            // Append form data
            let formData = new FormData();
            formData.append('username', e.target.email.value);
            formData.append('password', e.target.password.value);

            // fetch API request
            const responseData = await loginUserAPI(formData);

            // If server returns token, that means the form works.
            const token = responseData.token;
            if (token) {
                nookies.set(null, 'token', token);
                router.push('/record');
            } else {
                setFormError(`Email and password don't match.`);
            }
        } else {
            setFormError(`Please, check invalid fields.`);
        }
    }

    return (
        <Layout userPages>
            <Head>
                <title>besound · LOGIN</title>
            </Head>
            <Info highlight>{page.intro}</Info>
            <Info box>{page.instruction}</Info>
            <form onSubmit={handleLogin} method="post">
                <Info desktop_box flex large>
                    <TextField
                        name="email"
                        type="email"
                        errors={errors.email}
                        helperText={errors.email}
                        autoFocus
                        required
                        variant="standard"
                        onChange={handleEmailChange}
                        fullWidth
                        label="Email"
                    />
                    <TextField
                        name="password"
                        type="password"
                        errors={errors.password}
                        helperText={errors.password}
                        required
                        variant="standard"
                        onChange={handlePasswordChange}
                        fullWidth
                        label="Password"
                    />
                </Info>
                <Info box>
                    <button type="submit" ref={submitButton}>
                        {page.button}
                    </button>
                    {formError && <Info warning>{formError}</Info>}
                </Info>
            </form>
            <Info box>
                {page.signup_intro}
                <br />
                <Link href="/register">{page.signup_link}</Link>
            </Info>
        </Layout>
    );
}
