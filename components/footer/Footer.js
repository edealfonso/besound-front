import Rec from './Rec';
import FooterStepper from './FooterStepper';
import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

export default function Footer() {
    const { recordingStep } = useContext(AppContext);

    return (
        <footer>
            {recordingStep >= 0 && recordingStep < 3 && <Rec />}
            {recordingStep >= 3 && <FooterStepper />}
        </footer>
    );
}
