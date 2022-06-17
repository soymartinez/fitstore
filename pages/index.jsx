import Logo from '../components/logo'
import Button from '../components/button'
import Image from 'next/image'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Home({ data }) {
  return (
    <Layout title={'Fitstore'}>
      <header className='container lg:px-32 md:px-8 px-8 pt-36 pb-16 md:pb-24 md:pt-56 text-center flex flex-col items-center'>
        <h1 className='title text-5xl md:text-7xl lg:text-8xl max-w-[820px] mb-10'>
          <span className='relative z-30 text-white'>Una mejor manera de regenerarse</span>
        </h1>
        <p className='text-xl md:text-3xl mb-10 lg:mb-12 relative bg-blend-color-dodge z-30 max-w-[600px]'>
          Aumenta tu rendimiento deportivo con los mejores sumplementos para deportistas
        </p>

        <Logo />
      </header>

      <section className='container lg:px-32 md:px-8 px-4 flex flex-col items-start overflow-hidden'>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid mb-0 md:mb-10">
          <div className="w-full rounded-[35px] md:ml-14 md:h-full min-h-[350px] md:w-[500px] md:order-2 mb-4 md:mb-0 flex justify-center pro-gainer-image">
            <div className="my-auto w-72 h-72 md:w-[450px] md:h-[450px] transition-all hover:scale-[1.02] relative">
              <Image src={'/images/PRO.png'} layout='fill' className='' alt=""></Image>
            </div>
          </div>
          <div className='mt-4 md:mt-0'>
            <h1 className='font-extrabold title text-5xl md:text-7xl lg:text-8xl'>
              <span className='relative z-30 text-white'>PRO</span>
            </h1>
            <h2 className='subtitle font-bold text-xl md:text-3xl'>HIGH-PROTEIN GAINER</h2>
            <p className='font-normal text-xl md:text-xl'>
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
            <Button />
          </div>
        </div>
      </section>

      <section className='container lg:px-32 md:px-8 px-4 py-20'>
        <h2 className='text-2xl font-semibold mb-4 text-[#3081ed]'>Lista de productos</h2>
        <div className='flex gap-2 overflow-x-scroll scroll scrollbar-thin scrollbar-track-transparent 
          scrollbar-thumb-slate-700 rounded-md pb-4'>
          {
            data.map(({ id, name, brand, price, image }) => (
              <article key={id} className='p-4 border border-solid border-slate-700 bg-[#222537] 
                  rounded-md transition-all hover:scale-[.98]  hover:bg-[#222537a2]'>
                <Link href={`/${id}`}>
                  <div className='cursor-pointer'>
                    <div className='relative w-56'>
                      <Image src={image} priority className='rounded-md' width={800} height={800} layout='responsive' alt={name}/>
                    </div>
                    <div className='mt-2'>
                      <h3 className='subtitle text-xl text-white font-semibold'>{name}</h3>
                      <h5>{brand}</h5>
                      <h5 className='text-xl font-semibold py-1 text-white'>$ {price}</h5>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          }
        </div>
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
          backdrop-filter: blur(1110px);
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
