import Info from '../common/Info';

export default function Step1_Prepare({ page }) {
    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: page.recordingStep1_instruction
                }}
            />
        </Info>
    );
}
