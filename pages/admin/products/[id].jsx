import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from 'components/layout'
import ProductView from 'components/productview'
import { fetcher } from 'lib/fetcher'

export async function getServerSideProps({ params }) {
    const { id } = params
    const product = await fetcher(`${process.env.API_URL}/products/${id}`)
    return {
        props: {
            product,
        },
    }
}

export default function EditProduct({ product }) {
    const { push } = useRouter()

    async function handleDelete() {
        const Toast = (await import('wc-toast')).toast
        Toast.promise(
            await axios.delete(`/api/products/${product.id}`),
            {
                loading: 'eliminando',
                success: `${product.name} eliminado`,
                error: 'algo salio mal',
            },
            {
                theme: {
                    type: 'custom',
                    style: {
                        background: '#222537',
                        color: '#fff',
                        stroke: '#fff',
                    }
                },
            },
        )
        push('/admin/products')
    }

    return (
        <Layout title={'Administrador'}>
            <wc-toast></wc-toast>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                {
                    product && (
                        <div>
                            <div className='flex justify-between items-center md:pb-7 my-4'>
                                <h1 className={`font-bold text-3xl text-white`}>
                                    Administrador
                                </h1>
                                <div className='flex gap-2'>
                                    <Link href={`/admin/products`}>
                                        <a className='text-white hover:opacity-80 border transition-all rounded-full font-bold px-4'>
                                            Volver
                                        </a>
                                    </Link>
                                    <button onClick={handleDelete}
                                        className='bg-red-500 text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4'>
                                        Eliminar
                                    </button>
                                    <Link href={`/admin/products/edit/${product.id}`}>
                                        <a className='bg-white text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4'>
                                            Editar
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <section>
                                <ProductView product={product} />
                            </section>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}
