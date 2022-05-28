import Head from 'next/head'
import Navbar from './navbar'

export default function Layout({ title, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name={title} content={title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main>
                {children}
            </main>
        </div>
    )
}
