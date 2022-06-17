import Layout from "components/layout"
import Image from "next/image"
import Link from "next/link";
import { useCart } from 'react-use-cart'
import { useState } from "react";
import { AiFillCloseCircle, AiOutlineShopping } from "react-icons/ai"
import { TbShoppingCartOff, TbShoppingCartPlus } from "react-icons/tb"

export default function ProductDetails({ data }) {
    const { name, brand, weight, price, taste, description, image } = data
    const [cart, setCart] = useState(false);
    const { addItem, items, updateItemQuantity, cartTotal, emptyCart } = useCart();

    const addCart = () => {
        addItem(data)
        setCart(true)
    }
    return (
        <Layout title={`${name}`}>
            <div className={`${cart ? 'block' : 'hidden'} 
                    flex justify-center items-center 
                    h-screen w-full absolute`}>
                <div onClick={() => setCart(!cart)}
                    className={`${cart ? 'block' : 'hidden'}
                                    absolute z-50 w-full h-full 
                                    bg-black bg-opacity-70 backdrop-blur-sm`}>
                </div>
                <div className={`w-full lg:px-24 max-w-7xl fixed z-50 space-y-2`}>
                    <div className={`mx-4 md:mx-8 md:p-4 p-2 space-y-2 rounded-md
                            bg-white backdrop-blur-lg bg-opacity-10
                            max-h-80 md:max-h-96 overflow-scroll scrollbar-thin`}>
                        {
                            items.length > 0 ?
                                items.map(item => (
                                    <article className={`flex justify-between gap-2 hover:scale-[0.99] transition-all`}
                                        key={item.id}>
                                        <Link href={`${item.id}`}>
                                            <div className='flex gap-2 cursor-pointer'>
                                                <Image src={item.image} className='rounded-md' width={80} height={80} />
                                                <div className='w-40 md:w-72'>
                                                    <span className='block text-white font-semibold 
                                                    whitespace-nowrap overflow-hidden text-ellipsis'>
                                                        {item.name}
                                                    </span>
                                                    <span className='block font-semibold'>{item.brand}</span>
                                                    <span className='text-white font-semibold'>${item.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='flex gap-4 items-center justify-end'>
                                            <button className='bg-white rounded-full bg-opacity-10 
                                            w-6 h-6 text-center'
                                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                            {item.quantity}
                                            <button className='bg-white rounded-full bg-opacity-10 
                                            w-6 h-6 text-center'
                                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </article>
                                ))
                                : <div className='text-center animate-pulse'>
                                    carrito vacio
                                </div>
                        }
                    </div>
                    <button onClick={() => setCart(!cart)}
                        className='absolute -top-6 -right-0 md:right-4 lg:right-28 z-[55] text-white text-3xl'>
                        <AiFillCloseCircle />
                    </button>
                    {
                        cartTotal > 0 ?
                            <div className='flex justify-between items-center mx-4 md:mx-8 md:p-4 p-2 
                                 rounded-md relative 
                                bg-white backdrop-blur-lg bg-opacity-10'>
                                <span className='text-white font-semibold'>Total:</span>
                                <span className='text-white font-semibold'>${cartTotal}</span>
                            </div>
                            : null
                    }
                </div>
            </div>
            <div className={`pt-24 container lg:px-32 md:px-8 px-4`}>
                <div className='grid gap-2 pb-4'>
                    <article className='md:flex p-4 relative bg-[#222537] rounded-md border border-solid border-slate-700'>
                        <div className={`md:w-2/3`}>
                            <div className={`flex  ${cart ? 'justify-center w-full md:absolute' : 'justify-between relative'}`}>
                                <h2 className={`font-semibold ${cart ? 'w-full' : ''}`}>
                                    {brand}
                                </h2>
                                <div className={`flex text-2xl ${cart ? 'w-28 md:w-36 fixed z-50' : 'w-[68px] relative'} 
                                        justify-between transition-all`}>
                                    <TbShoppingCartOff onClick={() => emptyCart()}
                                        className={`hover:text-white cursor-pointer ${cart ? 'z-50 text-white' : 'hidden'}`} />
                                    <AiOutlineShopping onClick={() => setCart(!cart)}
                                        className={`hover:text-white cursor-pointer ${cart ? 'z-50 text-white' : ''}`} />
                                    <div className={`relative hover:text-white cursor-pointer 
                                        ${cart ? 'z-50 text-white' : ''}`} onClick={() => addCart()}>
                                        <TbShoppingCartPlus />
                                        {
                                            items.length > 0 ?
                                                <div>
                                                    <span className='absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full opacity-80' />
                                                    <span className='absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full animate-ping' />
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <h3 className={`text-xl pb-2 text-white mt-2 font-semibold`}>{name}</h3>
                            <div className='relative w-full sm:max-w-lg rounded-md'>
                                <Image src={image} className='rounded-md transition-all duration-100 hover:scale-[1.02]'
                                    width={800} height={800} layout='responsive' alt={name}></Image>
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
                                        taste.map((item, index) => {
                                            if (index === taste.length - 1) {
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

    const product = await res.json()
    const data = {
        ...product,
        id: id,
    }
    
    return {
        props: {
            data
        }
    }
}
