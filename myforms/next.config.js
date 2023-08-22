/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: true
    // },
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/api/auth/login",
                destination: "https://127.0.0.1:7299/auth/login",
            },
            {
                source: "/api/auth/register",
                destination: "https://127.0.0.1:7299/auth/register",
            },
            {
                source: "/api/auth/oauth",
                destination: "https://127.0.0.1:7299/auth/oauth",
            },
        ];
    },
}

module.exports = nextConfig
