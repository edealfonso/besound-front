import localFont from 'next/font/local';

export const GT_America = localFont({
    src: [
        {
            path: '../styles/fonts/GT-America-Standard-Regular-Trial.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../styles/fonts/GT-America-Standard-Regular-Italic-Trial.woff2',
            weight: '400',
            style: 'italic'
        },
        {
            path: '../styles/fonts/GT-America-Standard-Medium-Trial.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../styles/fonts/GT-America-Standard-Medium-Italic-Trial.woff2',
            weight: '500',
            style: 'italic'
        }
    ]
});
