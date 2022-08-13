import FormProduct from 'components/formproduct'
import Layout from 'components/layout'

export default function NewProduct() {
  return (
    <Layout title={'Nuevo producto'}>
      <div className='pt-24 container lg:px-32 md:px-8 px-4 pb-8'>
        <FormProduct />
      </div>
    </Layout>
  )
}
