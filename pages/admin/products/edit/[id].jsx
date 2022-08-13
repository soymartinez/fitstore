import Layout from 'components/layout'
import { fetcher } from 'lib/fetcher'
import FormProduct from 'components/formproduct'

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
        <Layout title={product.name}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4 pb-8'>
                <FormProduct product={product} />
            </div>
        </Layout>
    )
}
