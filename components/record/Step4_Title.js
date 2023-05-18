import Info from '../common/Info';
// import styles from './Step4.module.scss';

export default function Step4_Title({ page }) {
    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: page.recordingStep4_instruction
                }}
            />
        </Info>
    );
}
