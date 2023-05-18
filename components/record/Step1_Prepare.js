import Info from '../common/Info';

export default function Step1_Prepare({ page }) {
    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: page.step1_instruction
                }}
            />
        </Info>
    );
}
