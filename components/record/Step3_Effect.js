import Info from '../common/Info';
import styles from './Step3_Effect.module.scss';
import EffectPlayer from '../common/EffectPlayer';

export default function Step3_Effect({ page }) {
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
                        __html: page.step3_instruction
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
