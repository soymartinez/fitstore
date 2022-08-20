import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

import { fetcher } from 'lib/fetcher'
import FormBrand from 'components/formbrand'
import Layout from 'components/layout'

export async function getServerSideProps({ req, res, params }) {
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

    const brand = await fetcher(`${process.env.API_URL}/brands/${params.id}`)
    return {
        props: { brand }
    }
}

export default function Brand({ brand }) {
    return (
        <Layout title={`${brand.name ? brand.name : 'Nueva Marca'}`}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4 pb-8'>
                <FormBrand brand={brand} />
            </div>
        </Layout>
    )
}
