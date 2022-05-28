import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from './icon';

export default function Navbar() {

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    }, []);

    const router = useRouter();

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
                    <div className='flex items-center'>
                        <Link href={'/orders'}>
                            <h2 className={`cursor-pointer mx-5 md:mx-10 hover:text-white
                                            ${router.asPath == '/orders' ? 'text-white' : ''}`}>
                                pedidos
                            </h2>
                        </Link>
                        <Link href={"/profile"}>
                            <h2 className={`cursor-pointer md:w-24 justify-between ml-5 md:ml-10 
                                            flex items-center hover:text-white
                                            ${router.asPath == '/profile' ? 'text-white' : ''}`}>
                                <Icon width={40} height={40}/>
                                <span className='md:block hidden bg-transparent'>perfil</span>
                            </h2>
                        </Link>
                    </div>
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