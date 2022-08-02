import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { TiUserOutline } from 'react-icons/ti'
import { BiLogOutCircle } from 'react-icons/bi'
import { useState } from 'react'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

import Layout from '../components/layout'
import Formbutton from 'components/formbutton'
import Icon from 'components/icon'

export default function Profile({ data }) {
    const { user: { name, email, image } } = data
    const [imagen, setImagen] = useState(image)
    const router = useRouter()
    return (
        <Layout title={'Profile'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className={`font-bold text-3xl text-white md:pb-7 my-4`}>
                    {name}
                </h1>

                <section className='md:flex'>
                    <div className='md:w-80 pt-8'>
                        <div className='mb-6 md:sticky md:top-32'>
                            <Link href={'/profile'}>
                                <div className={`flex mb-2 cursor-pointer items-center hover:text-white
                                            md:hover:bg-[#222537] lg:mr-8 md:mr-4 md:px-3 py-2 rounded-md
                                            ${router.asPath === '/profile' ? 'text-white' : ''}`}>
                                    <TiUserOutline className='text-2xl' /><span className='ml-3'>General</span>
                                </div>
                            </Link>
                            <div onClick={() => signOut()}>
                                <div className={`flex mb-2 cursor-pointer items-center hover:text-white
                                            md:hover:bg-[#222537] lg:mr-8 md:mr-4 md:px-3 py-2 rounded-md`}>
                                    <BiLogOutCircle className='text-2xl' /><span className='ml-3'>Salir</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl border border-solid border-slate-700 bg-[#222537] 
                                md:p-8 p-4 mb-4 max-h-min w-full'>
                        <div className=''>
                            <h1 className='font-bold text-white text-xl'>Nombre</h1>
                            <span className='text-sm'>
                                Esto es visible para los usuarios que comentan mismo producto.
                            </span>
                            <div className='md:flex gap-2'>
                                <input className='lg:max-w-xs h-min w-full rounded-lg px-4 py-2 text-white bg-[#222537] 
                                    border border-slate-700 hover:border-slate-500 my-2
                                    focus:border-blue-500 focus:outline-none' type='text' defaultValue={name}
                                    placeholder='nombre' />
                                <div className='md:mt-2 md:w-28'>
                                    <Formbutton text='Guardar' />
                                </div>
                            </div>
                        </div>
                        <div className='mt-16'>
                            <div className='lg:grid grid-cols-3 grid-rows-2'>
                                <h1 className='font-bold text-white text-xl'>Avatar</h1>
                                <div className='lg:my-0 lg:mx-auto lg:py-2 
                                    my-6 row-span-2 col-start-3 col-span-1'>
                                    {
                                        imagen
                                            ?
                                            <div className='w-28'>
                                                <Image src={imagen} className='rounded-full' layout={'responsive'} width={200} height={200} />
                                            </div>
                                            : <Icon width={100} height={100} />
                                    }
                                </div>
                                <div className='md:flex lg:col-span-2 gap-2'>
                                    <input className='lg:max-w-xs h-min w-full rounded-lg px-4 py-2 text-white bg-[#222537] 
                                    border border-slate-700 hover:border-slate-500 my-2
                                    focus:border-blue-500 focus:outline-none' type='text' defaultValue={imagen}
                                        onChange={(e) => setImagen(e.target.value)}
                                        placeholder='https://avatar-url.png' />
                                    <div className='md:mt-2 md:w-28'>
                                        <Formbutton text='Guardar' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-16'>
                            <h1 className='font-bold text-white text-xl'>Correo electronico</h1>
                            <span className='text-sm'>
                                Se le pedirá que verifique el nuevo correo electrónico antes de cambiarlo.
                            </span>
                            <div className='md:flex gap-2'>
                                <input className='lg:max-w-xs h-min w-full rounded-lg px-4 py-2 text-white bg-[#222537] 
                                    border border-slate-700 hover:border-slate-500 my-2
                                    focus:border-blue-500 focus:outline-none' type='email' defaultValue={email}
                                    placeholder='correo@ejemplo.com' />
                                <div className='md:mt-2 md:w-28'>
                                    <Formbutton text='Guardar' />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const data = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!data) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    return {
        props: {
            data,
        }
    }
}
