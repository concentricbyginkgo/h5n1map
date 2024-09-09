/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    output: 'export',
    basePath: '/h5n1-map',
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true,
            },
        });

        return config;
    },
}

export default nextConfig