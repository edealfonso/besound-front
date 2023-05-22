import { useContext } from 'react';
import { Transition } from 'react-transition-group';
import { AppContext } from '@/lib/contexts/AppContext';

import Link from 'next/link';

import styles from './Header.module.scss';

const duration = 300;

const defaultStyle = {
    transition: `left ${duration}ms ease-in-out`,
    left: '-50rem'
};

const transitionStyles = {
    entering: { left: 0 },
    entered: { left: 0 },
    exiting: { left: '-50rem' },
    exited: { left: '-50rem' }
};

export default function Header({ long }) {
    const {
        isAuthenticated,
        effect,
        isFormOK,
        recordingStep,
        recordPageStaticData
    } = useContext(AppContext);

    return (
        <>
            <header>
                <Link href="/" className={styles.logo}></Link>
                <div className={styles.contextData}>
                    isAuthenticated : {isAuthenticated ? 'true' : 'false'}
                    <br />
                    recordingStep : {recordingStep} <br />
                    effect : {effect} <br />
                    isFormOK : {isFormOK ? 'true' : 'false'} <br />
                    recordPageStaticData :{' '}
                    {recordPageStaticData
                        ? recordPageStaticData.delete_success
                        : 'no data'}{' '}
                    <br />
                </div>
            </header>
            {/* <Transition nodeRef={nodeRef} in={isAboutOpen} timeout={duration}>
                {(state) => (
                    <div
                        ref={nodeRef}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                        className={styles.popup}
                    >
                        <About />
                    </div>
                )}
            </Transition> */}
        </>
    );
}
