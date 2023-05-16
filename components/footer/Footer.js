import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

import styles from './Footer.module.scss';
import Rec from './Rec';
import FooterStepper from './FooterStepper';

export default function Footer() {
    const { recordingStep } = useContext(AppContext);

    return (
        <footer className={styles.footer}>
            {recordingStep >= 0 && recordingStep < 3 && <Rec />}
            {recordingStep >= 3 && <FooterStepper />}
        </footer>
    );
}
