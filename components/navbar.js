import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from './icon';

export default function Navbar({ image, session }) {
    const router = useRouter();
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
        window.scrollY > 0 ? setScroll(true) : setScroll(false)
    }, []);

    return (
        <>
            <nav className={`fixed border-b border-transparent transition-colors duration-300 py-5 top-0 inset-x-0 z-50 
                            ${scroll ? 'scrolled ease-in' : 'ease-out'}`}>
                <div className="container lg:px-32 md:px-8 px-4 flex justify-between items-center">
                    <Link href={'/'}>
                        <a className="flex items-center">
                            <Link href={'/'}>
                                <span className='name cursor-pointer'>
                                    Fitstore
                                </span>
                            </Link>
                        </a>
                    </Link>
                    {
                        session === 'loading' ?
                            <div className='flex items-center ease-out duration-500'>
                                <div className='mx-5 md:mx-10'>
                                    <h2 className='text-gray-700 bg-gray-700 animate-pulse rounded-full'>
                                        pedidos
                                    </h2>
                                </div>
                                <h2 className='md:w-24 ml-5 md:ml-10 flex justify-between items-center'>
                                    <div className='w-10 h-10 bg-gray-700 animate-pulse rounded-full' />
                                    <div className='bg-gray-700 animate-pulse rounded-full'>
                                        <span className='md:block hidden text-gray-700'>perfil</span>
                                    </div>
                                </h2>
                            </div>
                            : ''
                    }
                    {
                        session === 'unauthenticated' ?
                            <Link href={'/auth/signin'}>
                                <h2 className={`cursor-pointer hover:text-white hover:animate-none animate-pulse
                                            ${router.asPath == '/auth/signin' ? 'text-white animate-none' : ''}`}>
                                    inicia sesión
                                </h2>
                            </Link>
                            : ''
                    }
                    {
                        session === 'authenticated' ?
                            <div className='flex items-center'>
                                <Link href={'/orders'}>
                                    <h2 className={`cursor-pointer mx-5 md:mx-10 hover:text-white
                                            ${router.asPath == '/orders' ? 'text-white' : ''}`}>
                                        pedidos
                                    </h2>
                                </Link>
                                <Link href={'/profile'}>
                                    <h2 className={`cursor-pointer md:w-24 justify-between ml-5 md:ml-10 
                                            flex items-center hover:text-white ease-in
                                            ${router.asPath == '/profile'
                                            ? 'text-white' : ''}`}>
                                        <div className={`${router.asPath == '/profile'
                                            ? 'border-white rounded-full'
                                            : 'border-none md:p-0 p-[2px]'} md:border-none border-2`}>
                                            {
                                                image
                                                    ? <Image src={image} width={40} height={40} alt={'profile'} />
                                                    : <Icon width={40} height={40} />
                                            }
                                        </div>
                                        <span className='md:block hidden'>perfil</span>
                                    </h2>
                                </Link>
                            </div>
                            : ''
                    }
                </div>
            </nav>
            <style jsx>{`
                nav {
                    height: 83px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }

                .container {
                    height: 42px;
                }

                .scrolled {
                    border-color: rgb(255, 255, 255, .1);
                    background-color: rgb(5, 5, 5, .5);
                    backdrop-filter: blur(4px);
                }

                .name {
                    font-weight: 800;
                    font-size: 24px;
                    line-height: 29px;

                    text-transform: uppercase;

                    background: linear-gradient(93.51deg, #3081ED 41.98%, #9B51E0 99.18%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            `}</style>
        </>
    )
}