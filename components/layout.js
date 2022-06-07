import Head from 'next/head'
import Navbar from './navbar'
import { useSession } from 'next-auth/react'

export default function Layout({ title, children }) {
    const { status } = useSession()
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name={title} content={title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar session={status} />

            <main>
                {children}
            </main>
        </div>
    )
}
