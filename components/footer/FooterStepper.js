import { useContext, useEffect } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import styles from './FooterStepper.module.scss';
import AlertDialog from '../record/AlertDialog';
import { useKeyPress } from '@/lib/hooks/useKeyPress';

export default function FooterStepper() {
    const {
        recordingStep,
        setRecordingStep,
        recordPageStaticData,
        isFormOK,
        setIsAlertOpen
    } = useContext(AppContext);

    useEffect(() => {
        setIsAlertOpen(false);
    }, [recordingStep]);

    useKeyPress(
        (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                requestPrevStep();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                nextStep();
            }
        },
        [recordingStep]
    );

    function nextStep() {
        setRecordingStep(recordingStep + 1);
    }

    function prevStep() {
        setRecordingStep(recordingStep - 1);
    }

    function requestPrevStep() {
        if (recordingStep == 3) {
            setIsAlertOpen(true);
        } else if (recordingStep == 4) {
            prevStep();
        }
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
                    <a className={styles.back} onClick={requestPrevStep}>
                        {recordPageStaticData.step3_back}
                    </a>
                    <button className="alt no-margin" onClick={nextStep}>
                        {recordPageStaticData.step3_forward}
                    </button>
                </nav>
            )}
            {recordingStep == 4 && (
                <nav className={styles.stepper}>
                    <a className={styles.back} onClick={requestPrevStep}>
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
            <AlertDialog emitOk={prevStep} />
        </>
    );
}
