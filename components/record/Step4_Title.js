import { useRef, useState, use, useContext, useEffect } from 'react';
import Info from '../common/Info';
import { TextField } from '@mui/material';
import { AppContext } from '@/lib/contexts/AppContext';
// import styles from './Step4.module.scss';
import { API_URL } from '@/lib/constants';

export default function Step4_Title({ page, blob }) {
    const titleInput = useRef();
    const fileInput = useRef();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const { setIsFormOK } = useContext(AppContext);

    const formUrl = API_URL + 'posts/new';

    // const styles = {
    //     input: {
    //         '&:invalid': {
    //             border: 'red solid 2px'
    //         }
    //     }
    // };

    function handleInputChange(e) {
        const pattern = /^[a-zA-Z0-9!@^*()_+\-=\[\]{};:\\|,.\/]*$/;
        const val = e.target.value;

        // check max length
        if (val.length > 40) {
            setIsFormOK(false);
            setError(true);
            setMessage('You cannot exceed 40 characters.');

            // check pattern
        } else if (!pattern.test(val)) {
            setIsFormOK(false);
            setError(true);
            setMessage(
                'You can only use numbers, letters and the following characters: !@^*()_+-=[]{};:|,./'
            );

            // check empty required
        } else if (!val) {
            setIsFormOK(false);
            setError(true);
            setMessage('This field is required.');

            // no error
        } else {
            setIsFormOK(true);
            setError(false);
            setMessage('');
        }
    }

    return (
        <>
            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.step4_instruction
                    }}
                />
            </Info>
            <Info large>
                <form id="post-create-form">
                    <TextField
                        name="title"
                        error={error}
                        helperText={message}
                        autoFocus
                        required
                        variant="standard"
                        onChange={handleInputChange}
                        ref={titleInput}
                        InputProps={{
                            startAdornment: <>#</>
                        }}
                        fullWidth
                    />
                </form>
            </Info>
        </>
    );
}
