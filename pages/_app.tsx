import '../styles/Globals.css'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Head from 'next/head'
import NProgress from 'nprogress'

import Loader from '../components/Loader'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)


  Router.events.on("routeChangeStart", () => {
    console.log("routeChangeStart")
    NProgress.start()
    setLoading(true)
  })

  Router.events.on("routeChangeComplete", () => {
    console.log("routeChangeComplete")
    NProgress.done()
    setLoading(false)
  })

  return (
    <>
    <Head>
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css" 
      integrity="sha512-DanfxWBasQtq+RtkNAEDTdX4Q6BPCJQ/kexi/RftcP0BcA4NIJPSi7i31Vl+Yl5OCfgZkdJmCqz+byTOIIRboQ==" 
      crossOrigin="anonymous" 
      referrerPolicy="no-referrer"
    />
    </Head>
      { loading && <Loader /> }
      <Component {...pageProps} />
    </>
  )
}
export default MyApp