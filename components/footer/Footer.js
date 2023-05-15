import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { AppContext } from '@/lib/contexts/AppContext';

import styles from './Footer.module.scss';
import Rec from './Rec';
import FooterStepper from './FooterStepper';

export default function Footer() {
    const router = useRouter();
    const { recordingStep, setRecordingStep } = useContext(AppContext);

    useEffect(() => {
        if (router.pathname == '/') {
            console.log('Home');
            setRecordingStep(0);
        } else if (router.pathname == '/record') {
            console.log('Record');
            setRecordingStep(1);
        }
    }, []);

    return (
        <footer className={styles.footer}>
            {recordingStep >= 0 && recordingStep < 3 && <Rec />}
            {recordingStep >= 3 && <FooterStepper />}
        </footer>
    );
}
