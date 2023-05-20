import { useContext, useEffect } from 'react';
import Info from '../common/Info';
import { RecordContext } from '@/lib/contexts/RecordContext';

export default function Step2_Record({ page }) {
    const { setEffect } = useContext(RecordContext);

    useEffect(() => {
        // set initial effect whether user comes from  step 1 or has selected an effect in step 3
        setEffect(0);
    }, []);

    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: page.step2_instruction
                }}
            />
        </Info>
    );
}
