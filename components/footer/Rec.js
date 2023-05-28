import { useRouter } from 'next/router';
import { useContext } from 'react';

import styles from './Rec.module.scss';
import { AppContext } from '@/utils/contexts/AppContext';

export default function Rec() {
    const router = useRouter();
    const { recordingStep, setRecordingStep } = useContext(AppContext);

    function handleClickHome() {
        router.push('/record');
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
