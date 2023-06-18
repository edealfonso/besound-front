import { useState, useContext } from 'react';
import { TextField } from '@mui/material';

import { AppContext } from '@/lib/contexts/AppContext';
import { RecordContext } from '@/lib/contexts/RecordContext';

import Info from '../common/Info';

// import styles from './Step4.module.scss';

export default function Step4_Title() {
    const { recordPageStaticData, setIsFormOK } = useContext(AppContext);
    const { setTitle } = useContext(RecordContext);

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const input_pattern = /^[a-zA-Z0-9!@^*()_+\-=\[\]{};:\\|,.\/]*$/;

    function handleInputChange(e) {
        const val = e.target.value;

        // replace spaces by dashes to avoid frustration
        if (val.substr(-1) == ' ') {
            e.target.value = val.slice(0, -1) + '-';
            handleInputChange(e);
            return;
        }

        // check max length
        if (val.length > 40) {
            setIsFormOK(false);
            setError(true);
            setMessage('Titles cannot exceed 40 characters');

            // check pattern
        } else if (!input_pattern.test(val)) {
            setIsFormOK(false);
            setError(true);
            setMessage(
                'Titles can only use letters, numbers and !@^*()_+-=[]{};:|,./'
            );

            // check empty required
        } else if (!val) {
            setIsFormOK(false);
            setError(true);
            setMessage('This field is required');

            // no error
        } else {
            setIsFormOK(true);
            setError(false);
            setMessage('');
            setTitle(val);
        }
    }

    return (
        <>
            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: recordPageStaticData.step4_instruction
                    }}
                />
            </Info>
            <Info large>
                <TextField
                    name="title"
                    error={error}
                    helperText={message}
                    autoFocus
                    required
                    variant="standard"
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <>#</>
                    }}
                    fullWidth
                    inputProps={{
                        'aria-label': 'Post title'
                    }}
                />
            </Info>
        </>
    );
}
