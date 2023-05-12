import { useEffect, useState } from 'react';

import styles from './AudioPlayer.module.scss';

export default function AudioPlayer({ post }) {
    console.log('hola');
    console.log(post);

    const played = false;
    return (
        <div className={`${styles.audioPlayer} ${played ? '' : styles.played}`}>
            #{post.title}
        </div>
    );
}
