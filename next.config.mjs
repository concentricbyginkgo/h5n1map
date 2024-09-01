/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    output: 'export',
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
    images: {
        unoptimized: true,
    },
}

export default nextConfig