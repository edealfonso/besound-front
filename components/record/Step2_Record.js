import { useContext, useEffect } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import { RecordContext } from '@/lib/contexts/RecordContext';

import Info from '../common/Info';

export default function Step2_Record() {
    const { setEffect } = useContext(RecordContext);
    const { recordPageStaticData } = useContext(AppContext);

    useEffect(() => {
        // set initial effect whether user comes from  step 1 or has selected an effect in step 3
        setEffect(0);
    }, []);

    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: recordPageStaticData.step2_instruction
                }}
            />
        </Info>
    );
}
