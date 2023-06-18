import { useContext, useState } from 'react';
import Image from 'next/image';

import { TextField } from '@mui/material';

import { HomeContext } from '@/lib/contexts/HomeContext';

import styles from './Search.module.scss';

export default function Search() {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const { setSearchString, isSearchOpen, setIsSearchOpen } =
        useContext(HomeContext);

    const input_pattern = /^[a-zA-Z0-9!@^*()_+\-=\[\]{};:\\|,.\/]*$/;

    function handleSearchChange(e) {
        const val = e.target.value;

        // replace spaces by dashes to avoid frustration
        if (val.substr(-1) == ' ') {
            e.target.value = val.slice(0, -1) + '-';
            handleSearchChange(e);
            return;
        }

        // check max length
        if (val.length > 40) {
            setError(true);
            setMessage('Titles cannot exceed 40 characters');

            // check pattern
        } else if (!input_pattern.test(val)) {
            setError(true);
            setMessage(
                'Titles can only use letters, numbers and !@^*()_+-=[]{};:|,./'
            );

            // no error
        } else {
            setError(false);
            setMessage('');
            setSearchString(val);
        }
    }

    return (
        <div className={`${styles.search} ${isSearchOpen ? styles.open : ''}`}>
            <Image
                src="icon-search.svg"
                width={24}
                height={24}
                alt="Search"
                onClick={() => {
                    setSearchString('');
                    setIsSearchOpen(false);
                }}
                style={{ cursor: 'pointer' }}
            />
            <TextField
                name="search"
                error={error}
                helperText={message}
                variant="standard"
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: <>#</>
                }}
                // inputProps={{
                //     'aria-label': 'Search bar'
                // }}
                fullWidth
                label="Search"
            />
        </div>
    );
}
