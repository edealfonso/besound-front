import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import styles from './FooterStepper.module.scss';

export default function FooterStepper() {
    const { recordingStep, setRecordingStep, recordPageStaticData, isFormOK } =
        useContext(AppContext);

    function nextStep(e) {
        setRecordingStep(recordingStep + 1);
    }

    function formSubmit(e) {
        if (isFormOK) {
            console.log('form submit');
            setTimeout(() => {
                setRecordingStep(recordingStep + 1);
            }, 500);
        } else {
            console.log('form invalid');
        }
    }

    function prevStep(e) {
        setRecordingStep(recordingStep - 1);
    }

    function handleBack() {
        let dialog = confirm('Are you sure ?');
        if (dialog) {
            prevStep();
        }
    }

    function createPost() {}

    return (
        <>
            {recordingStep == 3 && (
                <nav className={styles.stepper}>
                    <a className={styles.back} onClick={handleBack}>
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
        </>
    );
}
