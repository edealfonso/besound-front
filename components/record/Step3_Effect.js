import { useContext } from 'react';

import { AppContext } from '@/lib/contexts/AppContext';

import Info from '../common/Info';
import EffectPlayer from './EffectPlayer';

import styles from './Step3_Effect.module.scss';

export default function Step3_Effect() {
    const { recordPageStaticData } = useContext(AppContext);

    const effect_list = [
        {
            name: 'no-effect'
        },
        {
            name: 'cave'
        },
        {
            name: 'random'
        },
        {
            name: 'lo-bat'
        }
    ];

    return (
        <>
            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: recordPageStaticData.step3_instruction
                    }}
                />
            </Info>
            <ul className={styles.effects}>
                {effect_list.map(({ name }, i) => (
                    <li key={i}>
                        <EffectPlayer name={name} index={i} />
                    </li>
                ))}
            </ul>
        </>
    );
}
