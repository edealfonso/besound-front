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
};

module.exports = nextConfig;
