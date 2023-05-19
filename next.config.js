/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        loader: 'custom',
        loaderFile: './lib/image_loaders.js',
        domains: ['localhost:8888']
    },
    sassOptions: {
        includePaths: ['./components'],
        prependData: `@import "./styles/settings/__settings.scss";`
    }
};

module.exports = nextConfig;
