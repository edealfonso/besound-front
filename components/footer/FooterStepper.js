import { useContext, useEffect } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import styles from './FooterStepper.module.scss';
import AlertDialog from '../record/AlertDialog';

export default function FooterStepper() {
    const {
        recordingStep,
        setRecordingStep,
        recordPageStaticData,
        isFormOK,
        isAlertOpen,
        setIsAlertOpen
    } = useContext(AppContext);

    useEffect(() => {
        setIsAlertOpen(false);

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [recordingStep]);

    function handleKeyPress(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            prevStep();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            nextStep();
        }
    }

    function nextStep() {
        setRecordingStep(recordingStep + 1);
    }

    function prevStep() {
        setRecordingStep(recordingStep - 1);
    }

    function formSubmit(e) {
        if (isFormOK) {
            setTimeout(() => {
                setRecordingStep(recordingStep + 1);
            }, 500);
        }
    }

    return (
        <>
            {recordingStep == 3 && (
                <nav className={styles.stepper}>
                    <a
                        className={styles.back}
                        onClick={() => {
                            setIsAlertOpen(true);
                        }}
                    >
                        {recordPageStaticData.step3_back}
                    </a>
                    <button className="alt no-margin" onClick={nextStep}>
                        {recordPageStaticData.step3_forward}
                    </button>
                </nav>
            )}
            {recordingStep == 4 && (
                <nav className={styles.stepper}>
                    <a className={styles.back} onClick={prevStep}>
                        {recordPageStaticData.step4_back}
                    </a>

                    <button
                        className={`alt no-margin ${
                            isFormOK ? '' : 'disabled'
                        }`}
                        onClick={formSubmit}
                    >
                        {recordPageStaticData.step4_forward}
                    </button>
                </nav>
            )}
            {/* {isAlertOpen && <AlertDialog emitOk={prevStep} />} */}
            <AlertDialog emitOk={prevStep} />
        </>
    );
}
