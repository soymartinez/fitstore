import Link from 'next/link'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import Atropos from 'atropos/react'

import Layout from 'components/layout'

export async function getServerSideProps({ req, res }) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else if (session.user.role !== 'admin') {
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

function Card({ data }) {
    return (
        <div>
            <Atropos rotateTouch='scroll-y' shadow={false} highlight={false}>
                <article data-atropos-offset='0' className='atropos-container w-full h-full border border-solid border-slate-700 bg-[#222537] 
                                                        rounded-md transition-all hover:scale-[.98] hover:bg-[#222537a2]'>
                    <Link href={data.href}>
                        <a>
                            <div data-atropos-offset='4' className='flex flex-col gap-2 px-6 py-6 cursor-pointer'>
                                <h3 className='font-medium text-white text-lg'>{data.title}</h3>
                                <h5 className=''>{data.description}</h5>
                                <h5 className=''>{data.info}</h5>
                            </div>
                        </a>
                    </Link>
                </article>
            </Atropos>
        </div>
    )
}

export default function Admin({ products, brands }) {
    const data = [
        {
            title: 'Productos',
            description: 'Gestiona tus productos',
            href: '/admin/products',
            info: `${products.length} productos`
        },
        {
            title: 'Marcas',
            description: 'Gestiona tus marcas',
            href: '/admin/brands',
            info: `${brands.length} marcas`
        },
    ]

    return (
        <Layout title={'Administrador'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className={`font-bold text-3xl text-white md:pb-7 my-4`}>
                    Administrador
                </h1>
                <section className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10'>
                    {data.map(item => (
                        <Card key={item.title} data={item} />
                    ))}
                </section>
            </div>
        </Layout>
    )
}
