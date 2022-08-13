import Cards from 'components/cards'
import Layout from 'components/layout'
import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]'

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

    const productsData = await fetch(`${process.env.API_URL}/products`)
    const brandsData = await fetch(`${process.env.API_URL}/brands`)

    const products = await productsData.json()
    const brands = await brandsData.json()

    return {
        props: {
            products,
            brands,
        }
    }
}

export default function Admin({ products, brands }) {
    return (
        <Layout title={'Administrador'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className={`font-bold text-3xl text-white md:pb-7 my-4`}>
                    Administrador
                </h1>
                <section>
                    <div className='flex justify-between items-center my-4'>
                        <h2 className={`font-bold text-2xl text-white`}>
                            Productos
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
