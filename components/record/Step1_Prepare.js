import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import Info from '../common/Info';

export default function Step1_Prepare() {
    const { recordPageStaticData } = useContext(AppContext);

    return (
        <Info>
            <span
                dangerouslySetInnerHTML={{
                    __html: recordPageStaticData.step1_instruction
                }}
            />
        </Info>
    );
}
