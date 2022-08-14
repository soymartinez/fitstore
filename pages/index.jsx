import Logo from 'components/logo'
import Button from 'components/button'
import Image from 'next/image'
import Layout from 'components/layout'
import Atropos from 'atropos/react'
import Cards from 'components/cards'

export default function Home({ data }) {
  return (
    <Layout title={'Fitstore'}>
      <header className='container lg:px-32 md:px-8 px-8 pt-36 md:pt-56 text-center flex flex-col items-center'>
        <h1 className='title text-5xl md:text-7xl lg:text-8xl max-w-[820px] mb-10'>
          <span className='relative z-30 text-white'>Una mejor manera de regenerarse</span>
        </h1>
        <p className='text-xl md:text-3xl mb-10 lg:mb-12 relative bg-blend-color-dodge z-30 max-w-[600px]'>
          Aumenta tu rendimiento deportivo con los mejores sumplementos para deportistas
        </p>

        <Logo className={`w-36 h-36 lg:w-52 lg:h-52`} />
      </header>

      <section className='container lg:px-32 md:px-8 px-4 pt-16 md:pt-24 flex flex-col items-start overflow-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid mb-0 md:mb-20 -m-6 p-6'>
          <Atropos rotateTouch={'scroll-y'} shadow={false} highlight={false} className='md:order-2 md:ml-14 w-full md:h-full min-h-[350px] md:w-[500px] mb-4 md:mb-0'>
            <div data-atropos-offset='0' className='atropos-container w-full rounded-[35px] min-h-full flex justify-center border border-[#2b2a30] pro-gainer-image'>
              <div data-atropos-offset='4' className='my-auto w-72 h-72 md:w-[450px] md:h-[450px] rounded-[35px] relative'>
                <Image src={'/images/PRO.png'} className='shadow-2xl' layout='fill' alt='pro'></Image>
              </div>
            </div>
          </Atropos>
          <div className='mt-4 md:mt-0'>
            <h1 className='font-extrabold title text-5xl md:text-7xl lg:text-8xl'>
              <span className='relative z-30 text-white'>PRO</span>
            </h1>
            <h2 className='subtitle font-bold text-xl md:text-3xl'>HIGH-PROTEIN GAINER</h2>
            <p className='font-normal text-lg md:text-xl'>
              Aumentar de tamaño requiere un equilibrio
              entre entrenamiento pesado, descanso
              adecuado y nutrición de calidad. Debido a
              que todos somos un poco diferentes, a
              algunos les cuesta más ganar masa múscular.
              <br />
              <br />
              <span className='subtitle'>PRO GAINER</span> es una fórmula rica en proteínas
              que proporciona calorías que cuentan durante
              la recuperación. Cada batido proporciona una
              gran cantidad de proteínas, carbohidratos,
              vitaminas y minerales suplementarios para
              aumentar la cantidad que obtiene a través de
              una dieta equilibrada de alimentos.
            </p>
            <Button href={'/cl6dqqr9r0730ywie1v4tctpa'} />
          </div>
        </div>
      </section>

      <section className='container lg:px-32 md:px-8 px-4 py-10'>
        <h2 className='text-2xl font-semibold mb-8 text-[#3081ed]'>Lista de productos</h2>
        <Cards product={data} />
      </section>

      <style jsx>{`
        .title {
          font-weight: 700;
          letter-spacing: -.05em;
          color: rgb(255, 255, 255, 1);
        }

        .subtitle {
          background: linear-gradient(90.49deg, rgba(171, 105, 214, 0.75) 4.48%, rgba(171, 105, 214, 0.75) 92.41%), rgba(255, 255, 255, 0.75);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .pro-gainer-image {
          background: linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%);
        }

        .atropos {
          position: relative;
          width: 100%;
        }

        .atropos-container {
          position: absolute;
          weight: 100%;
          z-index: 1;
          transform-style: preserve-3d;
          pointer-events: none;
          max-width: none;
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(process.env.API_URL + '/products')
    const data = await res.json()
    return {
      props: {
        data
      }
    }
  } catch (error) {
    return {
      props: {
        data: []
      }
    }
  }
} 
