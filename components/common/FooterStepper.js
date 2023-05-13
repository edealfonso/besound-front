import styles from './FooterStepper.module.scss';
import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

export default function FooterStepper() {
    const { recordingStep, setRecordingStep } = useContext(AppContext);

    return <>Hola {recordingStep}</>;
}
