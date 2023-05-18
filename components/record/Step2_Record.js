import Info from '../common/Info';

export default function Step2_Record({ page }) {
    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: page.recordingStep2_instruction
                }}
            />
        </Info>
    );
}
