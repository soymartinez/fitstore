import Image from 'next/image'
import Description from './description'

export default function ProductView({ product }) {
    const { name, brand, image, descriptions: { info, detail, price, discountPrice, weight, flavors } } = product

    return (
        <article className='md:grid grid-cols-2 p-4 relative bg-[#222537] rounded-md border border-solid border-slate-700'>
            <div className='h-min'>
                <div className={`flex justify-between`}>
                    <h2 className={`font-semibold`}>
                        {brand}
                    </h2>
                </div>
                <h3 className={`text-xl pb-2 text-white mt-2 font-semibold md:font-bold`}>{name}</h3>
                <div className='relative w-full sm:max-w-lg rounded-md'>
                    <Image src={image} className='rounded-md transition-all duration-100 hover:scale-[1.02]'
                        width={800} height={800} layout='responsive' alt={name}></Image>
                </div>
            </div>
            <div className='py-2 sm:py-0 md:px-6'>
                <h1>
                    Precio: <span className='text-lg font-semibold text-white'>
                        ${discountPrice ?? price} <span className='line-through text-red-500'>{discountPrice ? price : null}</span>
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
                            flavors.map((item, index) => {
                                if (index === flavors.length - 1) {
                                    return item
                                } else {
                                    return `${item}, `
                                }
                            })
                        }
                    </span>
                </h1>
                <h1>
                    Descripción: <span className='text-white font-bold'>{name} </span>
                    <span>
                        {info}
                        <p className='mt-2'>{detail}</p>
                    </span>
                </h1>
            </div>
            <div className='grid-rows-1 col-span-2'>
                <Description product={product.descriptions} />
            </div>
        </article>
    )
}
