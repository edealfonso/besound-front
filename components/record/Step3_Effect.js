import Info from '../common/Info';
import styles from './Step3_Effect.module.scss';
import EffectPlayer from '../common/EffectPlayer';
import { useState } from 'react';

export default function Step3_Effect({ page, emitChangeEffect }) {
    const [effect, setEffect] = useState(0);

    function changeEffect(index) {
        console.log('eff ind', index);
        setEffect(index);
        emitChangeEffect(index);
    }

    const effects = [
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
                        __html: page.step3_instruction
                    }}
                />
            </Info>
            <ul className={styles.effects}>
                {effects.map(({ name }, i) => (
                    <li
                        key={i}
                        className={`${styles.item} ${
                            i == effect ? styles.selected : ''
                        }`}
                    >
                        <EffectPlayer
                            name={name}
                            index={i}
                            emitClick={changeEffect}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
