import Link from 'next/link'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { fetcher } from 'lib/fetcher'

import Cards from 'components/cards'
import Layout from 'components/layout'
import Logo from 'components/logo'

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    if (session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const products = await fetcher(`${process.env.API_URL}/products`)

    return {
        props: { products }
    }
}

export default function AdminProducts({ products }) {

    function Space() {
        return (
            <svg fill={'none'} height={'32'} shapeRendering={'geometricPrecision'} stroke={'currentColor'} strokeLinecap={'round'}
                strokeLinejoin={'round'} strokeWidth={'1'} viewBox={'0 0 24 24'} width={'32'} className='text-blue-500/40'>
                <path d='M16.88 3.549L7.12 20.451'></path>
            </svg>
        )
    }

    return (
        <Layout title={'Productos'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className={`font-bold text-3xl text-white md:pb-7 my-4`}>
                    Productos
                </h1>
                <section>
                    <div className='flex justify-between items-center my-4'>
                        <h2 className={`flex items-center justify-center font-bold text-xl text-white`}>
                            <Link href='/'><a className='text-white'><Logo className={`w-10 h-10 md:w-12 md:h-12 -mx-2`} /></a></Link> <Space />
                            <Link href='/admin'><a className='text-white'>administrador</a></Link>
                        </h2>
                        <Link href={`/admin/products/new`}>
                            <a className='bg-white text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4'>
                                Nuevo producto
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Cards key={products.id} admin={true} product={products} />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
