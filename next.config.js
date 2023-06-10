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
    }
    // env: {
    //     BACKEND_SERVER_HOST: process.env.BACKEND_SERVER_HOST,
    // },
};

module.exports = nextConfig;
