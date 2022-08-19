import Link from 'next/link'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

import Layout from 'components/layout'
import Logo from 'components/logo'
import { fetcher } from 'lib/fetcher'
import Image from 'next/image'
import Atropos from 'atropos/react'

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

    const brands = await fetcher(`${process.env.API_URL}/brands`)

    return {
        props: { brands }
    }
}

export default function AdminBrands({ brands }) {

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
                    Marcas
                </h1>
                <section>
                    <div className='flex justify-between items-center my-4'>
                        <h2 className={`flex items-center justify-center font-bold text-xl text-white`}>
                            <Link href='/'><a className='text-white'><Logo className={`w-10 h-10 md:w-12 md:h-12 -mx-2`} /></a></Link> <Space />
                            <Link href='/admin'><a className='text-white'>administrador</a></Link>
                        </h2>
                        <Link href={`/admin/brands/new`}>
                            <a className='bg-white text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4'>
                                Nueva marca
                            </a>
                        </Link>
                    </div>
                    <div>
                        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {brands.map(brand => (
                                <Atropos key={brand.id} rotateTouch='scroll-y' shadow={false} highlight={false}>
                                    <article data-atropos-offset='0' className='bg-black/50 rounded-lg shadow-lg p-4'>
                                        <div className='flex justify-center items-center'>
                                            <Image src={brand.image} alt={brand.name} width={200} height={200} objectFit="contain" />
                                        </div>
                                        <div data-atropos-offset='4' className='flex justify-between items-center'>
                                            <h3 className='font-bold text-xl truncate'>{brand.name}</h3>
                                            <Link href={`/admin/brands/${brand.id}`}>
                                                <a className='bg-blue-500 text-white hover:bg-opacity-80 transition-all rounded-full font-bold px-4'>
                                                    Editar
                                                </a>
                                            </Link>
                                        </div>
                                        <p className='text-gray-500'>{brand.description}</p>
                                    </article>
                                </Atropos>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
