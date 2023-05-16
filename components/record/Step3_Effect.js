import Info from '../common/Info';
import styles from './Step3_Effect.module.scss';
import EffectPlayer from '../common/EffectPlayer';
import { useEffect, useState } from 'react';

export default function Step3_Effect({ page, emitChangeEffect }) {
    const [effect, setEffect] = useState(0);

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

    function changeEffect(index) {
        setEffect(index);
        emitChangeEffect(index);
    }

    useEffect(() => {
        setEffect(0);
    }, []);

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
                    <li key={i}>
                        <EffectPlayer
                            selected={i == effect}
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
