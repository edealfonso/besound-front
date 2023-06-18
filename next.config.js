/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // images: {
    //     loader: 'custom',
    //     loaderFile: './lib/image_loaders.js',
    //     domains: ['localhost:8888']
    // },
    sassOptions: {
        prependData: `@import "./styles/settings/__settings.scss";`
    },
    env: {
        BACKEND_SERVER: process.env.BACKEND_SERVER
    }
};

module.exports = nextConfig;
