import Layout from 'components/layout'
import ProductView from 'components/productview'
import { fetcher } from 'lib/fetcher'
import Link from 'next/link'

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
    return (
        <Layout title={'Administrador'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                {
                    product && (
                        <div>
                            <div className='flex justify-between items-center md:pb-7 my-4'>
                                <h1 className={`font-bold text-3xl text-white`}>
                                    Administrador
                                </h1>
                                <div className='flex gap-2'>
                                    <Link href={`/admin`}>
                                        <a className='text-white border transition-all rounded-full font-bold px-4'>
                                            Cancelar
                                        </a>
                                    </Link>
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
