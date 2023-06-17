import { useEffect, useRef, useState, useMemo } from 'react';

import { TextField, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import countryList from 'react-select-country-list';

import { getRegisterPageAPI, registerUserAPI } from '@/lib/api';

import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Link from 'next/link';
import UserConfirmation from '@/components/user/UserConfirmation';
import Head from 'next/head';
import { useKeyPress } from '@/lib/hooks/useKeyPress';

export async function getStaticProps() {
    const page = await getRegisterPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function RegisterPage({ page }) {
    const submitButton = useRef();
    const countries = useMemo(() => countryList().getData(), []);

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        nationality: '',
        birth_date: '',
        password: '',
        password_confirm: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [formError, setFormError] = useState(false);
    const [datePickerError, setDatePickerError] = useState(null);
    const [userCreatedOK, setUserCreatedOK] = useState(false);

    useKeyPress((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitButton.current.focus();
            submitButton.current.click();
        }
    });

    const handleChange = (name, value) => {
        // update data state
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // update touched state
        // short delay to avoid visual glitch
        setTimeout(() => {
            setTouched((prev) => ({
                ...prev,
                [name]: true
            }));
        }, 500);
    };

    const handleTextFieldChange = (e) => {
        // default values for TextField can be taken from event data
        handleChange(e.target.name, e.target.value);
    };

    // re-run validation on each form data change
    useEffect(() => {
        setFormError(false);

        const errors = {};

        // source https://regexr.com/3e48o
        const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        // source: https://www.section.io/engineering-education/password-strength-checker-javascript/
        const password_pattern =
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

        // Validate email
        if (!formData.email) {
            errors.email = 'This field is required';
        } else if (!email_pattern.test(formData.email)) {
            errors.email = 'Enter a valid email';
        }

        // Validate first_name
        if (!formData.first_name) {
            errors.first_name = 'This field is required';
        } else if (formData.first_name.length > 40) {
            errors.first_name = `This field can't exceed 40 characters`;
        }

        // Validate last_name
        if (!formData.last_name) {
            errors.last_name = 'This field is required';
        } else if (formData.last_name.length > 40) {
            errors.last_name = `This field can't exceed 40 characters`;
        }

        // Validate nationality
        if (!formData.nationality) {
            errors.nationality = 'This field is required';
        }

        // Validate birth_date
        if (!formData.birth_date) {
            errors.birth_date = 'This field is required';
        } else if (datePickerError == 'invalidDate') {
            errors.birth_date = 'Date is not valid';
        } else if (datePickerError == 'disableFuture') {
            errors.birth_date = 'You need to be already born';
        }

        // Validate password
        if (!formData.password) {
            errors.password = 'This field is required';
        } else if (formData.password.length < 8) {
            errors.password = `This field must be at least 8 characters`;
        } else if (formData.password.length > 40) {
            errors.password = `This field can't exceed 40 characters`;
        } else if (!password_pattern.test(formData.password)) {
            errors.password =
                'Password must have at least one of each: uppercase letter, lowercase letter, digit, special character';
        }

        // Validate password_confirm
        if (!formData.password_confirm) {
            errors.password_confirm = 'This field is required';
        } else if (formData.password_confirm.length > 40) {
            errors.password_confirm = `This field can't exceed 40 characters`;
        } else if (formData.password !== formData.password_confirm) {
            errors.password_confirm = 'Passwords do not match';
        }

        setErrors(errors);
    }, [formData, datePickerError]);

    const isFieldTouched = (name) => {
        return touched[name];
    };

    const isFieldValid = (name) => {
        return !errors[name] || !isFieldTouched(name);
    };

    async function handleRegister(e) {
        // Stop the form from submitting and refreshing the page.
        e.preventDefault();

        // If form is valid, send request
        if (Object.keys(errors).length === 0) {
            // Append form data
            let reqFormData = new FormData();
            reqFormData.append('email', formData.email);
            reqFormData.append('password', formData.password);
            reqFormData.append('first_name', formData.first_name);
            reqFormData.append('last_name', formData.last_name);
            reqFormData.append('nationality', formData.nationality);
            // date must be processed to be accepted by API
            reqFormData.append(
                'birth_date',
                formData.birth_date.toISOString().split('T')[0]
            );

            // fetch API request
            const responseData = await registerUserAPI(reqFormData);

            // Catch errors
            if (responseData.status == '201') {
                setUserCreatedOK(true);
            } else if (
                responseData.body.email ==
                'custom user with this email already exists.'
            ) {
                setFormError(`This email address is already registered.`);
            } else {
                setFormError(
                    `There was an unknown error in your request. Please try again.`
                );
            }
        } else {
            setFormError(`Please, check invalid fields.`);
        }
    }

    if (userCreatedOK) {
        return <UserConfirmation page={page} email={formData.email} />;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Layout userPages>
                <Head>
                    <title>besound · REGISTER</title>
                </Head>
                <Info box>
                    {page.login_text}
                    <br />
                    <Link href="/register">{page.login_link}</Link>
                </Info>
                <form onSubmit={handleRegister} method="post">
                    <Info box highlight>
                        {page.text_part1}
                    </Info>
                    <Info desktop_box large flex>
                        <TextField
                            name="first_name"
                            type="text"
                            error={!isFieldValid('first_name')}
                            helperText={
                                isFieldValid('first_name')
                                    ? ''
                                    : errors.first_name
                            }
                            autoFocus
                            required
                            variant="standard"
                            onChange={handleTextFieldChange}
                            fullWidth
                            label="First name"
                            autoComplete="given-name"
                        />
                        <TextField
                            name="last_name"
                            type="text"
                            error={!isFieldValid('last_name')}
                            helperText={
                                isFieldValid('last_name')
                                    ? ''
                                    : errors.last_name
                            }
                            required
                            variant="standard"
                            onChange={handleTextFieldChange}
                            fullWidth
                            label="Last name"
                            autoComplete="family-name"
                        />
                        <DatePicker
                            disableFuture
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    error: !isFieldValid('birth_date'),
                                    helperText: isFieldValid('birth_date')
                                        ? ''
                                        : errors.birth_date,
                                    required: true,
                                    label: 'Birth date',
                                    autoComplete: 'bday'
                                }
                            }}
                            onChange={(value) =>
                                handleChange('birth_date', value)
                            }
                            onError={(newError) => setDatePickerError(newError)}
                        />
                        <Autocomplete
                            options={countries}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="nationality"
                                    label="Nationality"
                                    variant="standard"
                                    required
                                    error={!isFieldValid('nationality')}
                                    helperText={
                                        isFieldValid('nationality')
                                            ? ''
                                            : errors.nationality
                                    }
                                    autoComplete="country"
                                />
                            )}
                            onChange={(event, value) => {
                                handleChange('nationality', value?.value);
                            }}
                        />
                    </Info>
                    <Info box highlight top>
                        {page.text_part2}
                    </Info>
                    <Info desktop_box large flex>
                        <TextField
                            name="email"
                            type="email"
                            required
                            variant="standard"
                            onChange={handleTextFieldChange}
                            fullWidth
                            label="Email"
                            error={!isFieldValid('email')}
                            helperText={
                                isFieldValid('email') ? '' : errors.email
                            }
                            autoComplete="email"
                        />
                        <TextField
                            name="password"
                            type="password"
                            error={!isFieldValid('password')}
                            helperText={
                                isFieldValid('password') ? '' : errors.password
                            }
                            required
                            variant="standard"
                            onChange={handleTextFieldChange}
                            fullWidth
                            label="Password"
                        />
                        <TextField
                            name="password_confirm"
                            type="password"
                            error={!isFieldValid('password_confirm')}
                            helperText={
                                isFieldValid('password_confirm')
                                    ? ''
                                    : errors.password_confirm
                            }
                            required
                            variant="standard"
                            onChange={handleTextFieldChange}
                            fullWidth
                            label="Password confirm"
                        />
                    </Info>
                    <Info box>
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
