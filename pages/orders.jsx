import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Formbutton from '../components/formbutton'
import { getSession } from 'next-auth/react'

export default function Pedidos({ data }) {
    const router = useRouter()
    return (
        <Layout title={'Orders'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className={`font-bold text-3xl text-white md:pb-7 my-4`}>
                    Pedidos
                </h1>

                <section className='grid gap-2 pb-4'>
                    {
                        data.orders > 0 && data.orders.map(({ id, name, weight, price, toast, amount, image }) => (
                            <article key={id} className='flex gap-2 md:gap-6 p-2 md:px-5 md:py-2 bg-[#222537] 
                                    rounded-md border border-solid border-slate-700 transition-all hover:scale-[.98] hover:bg-[#222537a2]'>
                                <div className='min-w-[144px]'>
                                    <div className='relative w-full'>
                                        <Image src={image} className='rounded-md' width={800} height={800} layout='responsive' alt={name} />
                                    </div>
                                </div>
                                <div className='text-sm md:text-base'>
                                    <h1>
                                        Folio: <span className='font-semibold text-white'>
                                            {id}
                                        </span>
                                    </h1>
                                    <h1>
                                        Nombre: <span className='font-semibold text-white'>
                                            {name}
                                        </span>
                                    </h1>
                                    <h1>
                                        Precio: <span className='font-semibold text-white'>
                                            ${price * amount}
                                        </span>
                                    </h1>
                                    <h1>
                                        Cantidad: <span className='font-semibold text-white'>
                                            {amount}
                                        </span>
                                    </h1>
                                    <h1>
                                        Peso: <span className='font-semibold text-white'>
                                            {weight} kg
                                        </span>
                                    </h1>
                                    {
                                        toast ?
                                            <h1>
                                                Sabor: <span className='font-semibold text-white capitalize'>
                                                    {toast}
                                                </span>
                                            </h1>
                                            : null
                                    }
                                </div>
                            </article>
                        )) || <h1 className='text-white text-center'>No hay pedidos</h1>
                    }
                </section>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    
    const res = await fetch(process.env.API_URL + '/orders')
    const data = await res.json()
    return {
        props: {
            data,
        },
    }
}