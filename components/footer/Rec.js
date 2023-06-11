import { useRouter } from 'next/router';
import { useContext } from 'react';

import styles from './Rec.module.scss';
import { AppContext } from '@/lib/contexts/AppContext';

import { parseCookies } from 'nookies';

export default function Rec() {
    const router = useRouter();
    const { recordingStep, setRecordingStep, setStopHomeSounds } =
        useContext(AppContext);

    function handleClickHome() {
        setStopHomeSounds(true);

        // parse token
        const cookies = parseCookies();
        const token = cookies.token;

        if (token) {
            router.push('/record');
        } else {
            router.push('/login');
        }
    }

    function nextStep() {
        setRecordingStep(recordingStep + 1);
    }

    return (
        <>
            {recordingStep == 0 && (
                <a
                    className={`${styles.rec} ${styles.disabled}`}
                    onClick={handleClickHome}
                ></a>
            )}
            {recordingStep == 1 && (
                <a className={styles.rec} onClick={nextStep}></a>
            )}
            {recordingStep == 2 && (
                <a
                    className={`${styles.rec} ${styles.active}`}
                    onClick={nextStep}
                ></a>
            )}
        </>
    );
}
