import { useState, useRef, useContext, useEffect } from "react";
import { Transition, } from "react-transition-group";
import {AppContext} from "@/lib/context/state";

import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.scss";
import About from "./About";

const duration = 300;

const defaultStyle = {
    transition: `left ${duration}ms ease-in-out`,
    left: "-50rem"
};

const transitionStyles = {
    entering: { left: 0 },
    entered: { left: 0 },
    exiting: { left: "-50rem" },
    exited: { left: "-50rem" },
};

export default function Header({long, search}) {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const nodeRef = useRef(null);

    return (
        <>
            <header className={styles.header}>
                Header
                <Link  href='/'>
                    <Image
                        src="/logo.svg"
                        alt="besound Logo"
                        width={147}
                        height={30}
                        priority
                        className={styles.logo}
                        />
                </Link>
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
