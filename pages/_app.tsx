import "../styles/Globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/fonts/CodecPro-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Verdana.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <Component {...pageProps} />
            <Analytics />
        </>
    )
}

export default MyApp
