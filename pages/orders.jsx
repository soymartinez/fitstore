import Link from 'next/link'
import Layout from '../components/layout'

export default function Pedidos() {
    return (
        <Layout title={'Orders'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className='font-bold text-2xl'>
                    Pedidos
                </h1>
                <Link href="/">Go home</Link>
            </div>
        </Layout>
    )
}