import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from 'react-use-cart'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  )
}
