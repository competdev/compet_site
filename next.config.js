module.exports = {
    i18n: {
        reactStrictMode: true,
        locales: ["pt-br"],
        defaultLocale: "pt-br",
    },
    images: {
        minimumCacheTTL: 60 * 60 * 24 * 31,
        formats: ["image/avif", "image/webp"],
        imageSizes: [32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ibb.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "/**",
            },
        ],
    },
    experimental: {
        optimizePackageImports: ["@mui/material", "@mui/icons-material", "@mui/lab"],
    },
}
