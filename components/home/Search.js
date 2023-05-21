import { useContext, useState } from 'react';
import Image from 'next/image';

import styles from './Search.module.scss';
import { TextField } from '@mui/material';
import { HomeContext } from '@/lib/contexts/HomeContext';

export default function Search() {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const { setSearchString } = useContext(HomeContext);

    const input_pattern = /^[a-zA-Z0-9!@^*()_+\-=\[\]{};:\\|,.\/]*$/;

    function handleSearch(e) {
        const val = e.target.value;

        // replace spaces by dashes to avoid frustration
        if (val.substr(-1) == ' ') {
            e.target.value = val.slice(0, -1) + '-';
            handleInputChange(e);
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
        <div className={styles.search}>
            <Image src="icon-search.svg" width={24} height={24} alt="Search" />
            <TextField
                classes={{ notchedOutline: styles.dashed }}
                name="search"
                error={error}
                helperText={message}
                variant="standard"
                onChange={handleSearch}
                InputProps={{
                    startAdornment: <>#</>
                }}
                fullWidth
            />
        </div>
    );
}
