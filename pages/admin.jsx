import Cards from 'components/cards'
import Layout from 'components/layout'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

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
        <Layout title={'Admin'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className={`font-bold text-3xl text-white md:pb-7 my-4`}>
                    Administrador
                </h1>
                <section>
                    <h2 className={`font-bold text-2xl text-white my-4`}>
                        Productos
                    </h2>
                    <div>
                        <Cards key={products.id} product={products} />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
