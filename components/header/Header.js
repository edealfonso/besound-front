import { useContext } from 'react';
import { AppContext } from '@/utils/contexts/AppContext';

import Link from 'next/link';
import AboutButton from './AboutButton';

import styles from './Header.module.scss';

import { Transition } from 'react-transition-group';

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

export default function Header({ recordPage, aboutPage, userPages }) {
    const {
        effect,
        isFormOK,
        isAboutOpen,
        recordingStep,
        recordPageStaticData
    } = useContext(AppContext);

    if (aboutPage) {
        return (
            <div className={styles.invert}>
                <Link href="/" className={styles.logo}></Link>
            </div>
        );
    }

    return (
        <>
            <header
                className={`${recordPage ? styles.long : ''} ${
                    aboutPage ? styles.invert : ''
                }`}
            >
                {!aboutPage && <Link href="/" className={styles.logo}></Link>}
                {aboutPage && <div className={styles.logo}></div>}
                <div className={styles.contextData}>
                    isAboutOpen : {isAboutOpen ? 'true' : 'false'} <br />
                    recordingStep : {recordingStep} <br />
                    effect : {effect} <br />
                    isFormOK : {isFormOK ? 'true' : 'false'} <br />
                    recordPageStaticData :
                    {recordPageStaticData
                        ? recordPageStaticData.delete_success
                        : 'no data'}
                    <br />
                </div>
                {(recordPage || userPages) && <AboutButton floating dark />}
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
