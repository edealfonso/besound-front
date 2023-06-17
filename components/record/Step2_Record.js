import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import { RecordContext } from '@/lib/contexts/RecordContext';

import Info from '../common/Info';

import { AUDIO_MAX_DURATION } from '@/lib/constants';

import styles from './Step2_Record.module.scss';

export default function Step2_Record() {
    const { setEffect } = useContext(RecordContext);
    const { recordPageStaticData, setRecordingStep } = useContext(AppContext);
    const [remainingTime, setRemainingTime] = useState(AUDIO_MAX_DURATION);
    const timer = useRef(null);
    const interval = useRef(null);

    useEffect(() => {
        // set initial effect whether user comes from  step 1 or has selected an effect in step 3
        setEffect(0);

        // set interval that decreases remaining time
        interval.current = setInterval(() => {
            setRemainingTime((current) => current - 1);
        }, 1000);

        // jump to next step on AUDIO_MAX_DURATION elapsed
        timer.current = setTimeout(() => {
            setRecordingStep(3);
        }, AUDIO_MAX_DURATION * 1000);

        return () => {
            clearTimeout(timer.current);
            clearInterval(interval.current);
        };
    }, []);

    return (
        <>
            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: recordPageStaticData.step2_instruction
                    }}
                />
            </Info>
            <div className={styles.remainingTime}>
                {remainingTime <= 6 ? remainingTime - 1 : ''}
            </div>
        </>
    );
}
