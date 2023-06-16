import { AppContext } from '@/lib/contexts/AppContext';
import styles from './DebugBar.module.scss';
import { useContext } from 'react';

export default function DebugBar() {
    const {
        effect,
        isFormOK,
        isAboutOpen,
        recordingStep,
        recordPageStaticData
    } = useContext(AppContext);

    return (
        <div className={styles.debugBar}>
            isAboutOpen : {isAboutOpen ? 'true' : 'false'} <br />
            recordingStep : {recordingStep} <br />
            effect : {effect} <br />
            isFormOK : {isFormOK ? 'true' : 'false'} <br />
            recordPageStaticData :
            {recordPageStaticData
                ? recordPageStaticData.delete_success
                : 'no data'}
            <br />
        </div>
    );
}
