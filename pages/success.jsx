import { fetcher } from 'lib/fetcher'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCart } from 'react-use-cart'
import useSWR from 'swr'

export default function Success() {
    const { query: { session_id } } = useRouter()
    const { emptyCart } = useCart()
    const { data, error } = useSWR(() => `/api/checkout/${session_id}`,
        fetcher
    )

    useEffect(() => {
        if (data) {
            console.log('🎉', data)
            emptyCart()
        }
    }, [data])

    return (
        <div>
            <div className='container xl:max-w-screen-xl mx-auto py-12 px-6 text-center'>
                {
                    error ? (
                        <div className='text-red-600'>
                            Lo sentimos, hubo un error con tu pago.
                        </div>
                    ) : !data ? (
                        <div className='text-red-600'>
                            Cargando...
                        </div>
                    ) : (
                        <>
                            <h1 className='text-3xl font-bold'>
                                ¡Gracias por tu compra!
                            </h1>
                            <p className='text-lg'>
                                Tu pedido se ha procesado correctamente. 
                                En breve recibirás un correo electrónico con los detalles de tu compra.
                            </p>
                            {/* <p className='text-lg'>
                                Your order number is: {data.order_id}
                            </p>
                            <p className='text-lg'>
                                Your order will be delivered to:
                            </p>
                            <p className='text-lg'>
                                {data.shipping_address.first_name} {data.shipping_address.last_name}
                            </p>
                            <p className='text-lg'>
                                {data.shipping_address.address1}
                            </p>
                            <p className='text-lg'>
                                {data.shipping_address.address2}
                            </p>
                            <p className='text-lg'>
                                {data.shipping_address.city}, {data.shipping_address.state} {data.shipping_address.zip}
                            </p>
                            <p className='text-lg'>
                                {data.shipping_address.country}
                            </p> */}
                        </>
                    )
                }

            </div>
        </div>
    )
}
