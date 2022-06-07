import Formbutton from "components/formbutton"
import Layout from "components/layout"
import Image from "next/image"

export default function ProductDetails({ data }) {
    const { name, brand, weight, price, toast, description, image } = data
    return (
        <Layout title={`${name}`}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <div className='grid gap-2 pb-4'>
                    <article className='md:flex p-4 bg-[#222537] rounded-md border border-solid border-slate-700'>
                        <div className='md:w-1/3'>
                            <div className='flex justify-between text-2xl'>
                                <div className='text-base'>
                                    <h2 className='font-semibold'>{brand}</h2>
                                </div>
                            </div>
                            <h3 className={`text-xl pb-2 text-white mt-2 font-semibold`}>{name}</h3>
                            <div className='relative w-full'>
                                <Image src={image} className='rounded-md' width={800} height={800} layout='responsive' alt={name}></Image>
                            </div>
                        </div>
                        <div className='py-2 sm:py-0 md:px-6 md:w-2/3'>
                            <h1>
                                Precio: <span className='text-lg font-semibold text-white'>
                                    ${price}
                                </span>
                            </h1>
                            <h1>
                                Peso: <span className='text-lg font-semibold text-white'>
                                    {weight} kg
                                </span>
                            </h1>
                            <h1>
                                Sabores: <span className='text-lg font-semibold text-white capitalize'>
                                    {
                                        toast.map((item, index) => {
                                            if (index === toast.length - 1) {
                                                return item
                                            } else {
                                                return `${item}, `
                                            }
                                        })
                                    }
                                </span>
                            </h1>
                            <p>
                                Descripción: <span className='text-white'>{description}</span>
                            </p>
                        </div>
                    </article>
                    <div className='flex justify-between p-4 bg-[#222537] rounded-md
                                    border border-solid border-slate-700 gap-14'>
                        <div className='w-28'>
                            <Formbutton text='Comprar' />
                        </div>
                        <div className='w-40'>
                            <Formbutton text='Agregar al carrito' />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(process.env.API_URL + '/products/' + id)

    if (!res.ok) return {
        redirect: {
            destination: '/auth/signin',
            permanent: false
        }
    }

    const data = await res.json()

    return {
        props: {
            data
        }
    }
}
