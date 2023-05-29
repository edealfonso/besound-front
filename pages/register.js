import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import { TextField, Select, MenuItem, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import countryList from 'react-select-country-list';

import { getRegisterPageAPI, registerUserAPI } from '@/utils/api';

import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Link from 'next/link';

export async function getServerSideProps() {
    const page = await getRegisterPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function RegisterPage({ page }) {
    const router = useRouter();
    const submitButton = useRef();
    const [selectedCountry, setSelectedCountry] = useState('');
    const countries = useMemo(() => countryList().getData(), []);
    const [formError, setFormError] = useState(false);
    const [errors, setErrors] = useState({
        email: null,
        password: null
    });

    const selectCountryHandler = (value) => setSelectedCountry(value);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitButton.current.focus();
            submitButton.current.click();
        }
    }

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

    function handleTextInputChange(e) {
        const el = e.target;
        const val = el.value;
        setFormError(false);

        console.log('handleTextInputChange', el, val);
        // check max length
        if (val.length > 5) {
            el.errors = true;
            el.helperText = 'This field must be less than 40 characters';
        } else {
            el.errors = false;
        }
    }

    function handleRequiredInputChange(e) {
        console.log('handleRequiredInputChange');
        const el = e.target;
        const val = el.value;
        setFormError(false);

        // required
        if (val.length == 0) {
            el.errors = true;
            el.helperText = 'Please fill this field.';
        } else {
            el.errors = false;
        }
    }

    async function handleRegister(e) {
        // Stop the form from submitting and refreshing the page.
        e.preventDefault();

        if (
            !errors.email &&
            !errors.first_name &&
            !errors.last_name &&
            !errors.nationality &&
            !errors.birth_date &&
            !errors.password
        ) {
            // Append form data
            let formData = new FormData();
            formData.append('email', e.target.email.value);
            formData.append('first_name', e.target.first_name.value);
            formData.append('last_name', e.target.last_name.value);
            formData.append('nationality', e.target.nationality.value);
            formData.append('birth_date', e.target.birth_date.value);
            formData.append('password', e.target.password.value);

            // fetch API request
            const responseData = await registerUserAPI(formData);

            // Catch errors
            if (responseData.status == '201') {
                router.push('/login');
            } else if (responseData.status == '201') {
                if (
                    responseData.body.email ==
                    'custom user with this email already exists.'
                ) {
                    setFormError(`This email address is already registered.`);
                } else {
                    setFormError(
                        `There was an unknown error in your request. Please review al fields and try again.`
                    );
                }
            } else {
                setFormError(
                    `There was an unknown error in your request. Please try again.`
                );
            }
        } else {
            setFormError(`Please, check invalid fields.`);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Layout>
                <Info box>
                    {page.login_text}
                    <br />
                    <Link href="/register">{page.login_link}</Link>
                </Info>
                <form onSubmit={handleRegister} method="post">
                    <Info box highlight>
                        {page.text_part1}
                    </Info>
                    <Info box large flex>
                        <TextField
                            name="first_name"
                            type="text"
                            autoFocus
                            required
                            variant="standard"
                            onChange={handleTextInputChange}
                            fullWidth
                            label="First name"
                        />
                        <TextField
                            name="last_name"
                            type="text"
                            // errors={errors.last_name}
                            // helperText={errors.last_name}
                            autoFocus
                            required
                            variant="standard"
                            onChange={handleTextInputChange}
                            fullWidth
                            label="Last name"
                        />
                        <DatePicker
                            label="Birth date *"
                            name="birth_date"
                            slotProps={{ textField: { variant: 'standard' } }}
                            onChange={handleRequiredInputChange}
                        />
                        <Autocomplete
                            disablePortal
                            id="nationality"
                            options={countries}
                            slotProps={{ textField: { variant: 'standard' } }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nationality *"
                                    variant="standard"
                                />
                            )}
                            required
                        />
                    </Info>
                    <Info box highlight top>
                        {page.text_part2}
                    </Info>
                    <Info box large flex>
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
                        <TextField
                            name="password_confirm"
                            type="password"
                            errors={errors.password_confirm}
                            helperText={errors.password_confirm}
                            required
                            variant="standard"
                            onChange={handlePasswordChange}
                            fullWidth
                            label="Password confirm"
                        />
                    </Info>
                    <Info>
                        <button type="submit" ref={submitButton}>
                            {page.button_end}
                        </button>
                        {formError && <Info warning>{formError}</Info>}
                    </Info>
                </form>
            </Layout>
        </LocalizationProvider>
    );
}
