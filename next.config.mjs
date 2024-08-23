/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    output: 'standalone',
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
    experimental: {
        serverComponentsExternalPackages: ['@node-rs/argon2']
    }
}

export default nextConfig