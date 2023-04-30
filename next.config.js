/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: 'custom',
        loaderFile: './lib/image_loaders.js',
        domains: ['localhost:8888'],
    },
    sassOptions: {
        includePaths: ['./components'],
        prependData: `@import "./styles/variables.scss";`,
    }
}

module.exports = nextConfig
