import '@/styles/globals.scss'
import localFont from '@next/font/local'
import AppContextProvider from '@/lib/context/state'

// export const neueMontreal = localFont({
//   src: [
//     {
//       path: '@/styles/fonts/NeueMontreal-Regular.otf',
//       weight: 'normal',
//       style: 'normal',
//     },
//     {
//       path: '@/styles/fonts/NeueMontreal-Italic.otf',
//       weight: 'normal',
//       style: 'italic',
//     },
//     {
//       path: '@/styles/fonts/NeueMontreal-Medium.otf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '@/styles/fonts/NeueMontreal-MediumItalic.otf',
//       weight: '500',
//       style: 'italic',
//     },
//   ],
// });

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
    {/* <div className={neueMontreal.className}> */}
      <Component {...pageProps} />
    {/* </div> */}
    </AppContextProvider>
  )
}
