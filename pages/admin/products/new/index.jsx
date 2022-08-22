import { unstable_getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

import FormProduct from 'components/formproduct'
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

  return { props: {} }
}

export default function NewProduct() {
  return (
    <Layout title={'Nuevo producto'}>
      <div className='pt-24 container lg:px-32 md:px-8 px-4 pb-8'>
        <FormProduct />
      </div>
    </Layout>
  )
}
