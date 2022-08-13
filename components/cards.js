import Link from 'next/link'
import Image from 'next/image'
import Atropos from 'atropos/react'

export default function Cards({ product, admin }) {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 
            overflow-x-scroll scroll scrollbar-thin scrollbar-track-transparent 
            scrollbar-thumb-slate-700 rounded-md -m-4 p-4 md:-m-6 md:p-6'>
            {
                product.length > 0 && (
                    product.map(({ id, name, brand, image, descriptions: { price, discountPrice } }) => (
                        <Atropos rotateTouch='scroll-y' shadow={false} highlight={false} key={id}>
                            <article data-atropos-offset='0' className='atropos-container w-full h-full border border-solid border-slate-700 bg-[#222537] 
                                                        rounded-md transition-all hover:scale-[.98] hover:bg-[#222537a2]'>
                                <Link href={`/${admin ? `admin/products/${id}`: id}`}>
                                    <a>
                                        <div data-atropos-offset='4' className='p-4 cursor-pointer h-full'>
                                            <div data-atropos-offset='-4' className='relative w-full'>
                                                <Image src={image} className='rounded-md' width={800} height={800} layout='responsive' alt={name} />
                                            </div>
                                            <div className='mt-2 text-center md:text-start sm:text-lg md:text-xl'>
                                                <h3 className='font-semibold subtitle text-white'>{name}</h3>
                                                <h5 className='text-sm sm:text-base'>{brand}</h5>
                                                <h5 className='font-semibold py-1 text-white'>
                                                    $ {discountPrice != 0 ? discountPrice : price} <span className='line-through text-red-500'>{discountPrice != 0 ? price : null}</span>
                                                </h5>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </article>
                        </Atropos>
                    ))
                ) || <p>No hay productos</p>
            }
            <style jsx>{`
                .subtitle {
                    background: linear-gradient(90.49deg, rgba(171, 105, 214, 0.75) 4.48%, rgba(171, 105, 214, 0.75) 92.41%), rgba(255, 255, 255, 0.75);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }

                .atropos {
                    position: relative;
                    width: 100%;
                }

                .atropos .atropos-container {
                    position: absolute;
                    weight: 100%;
                    z-index: 1;
                    transform-style: preserve-3d;
                    pointer-events: none;
                    max-width: none;
                }
            `}</style>
        </div>
    )
}
