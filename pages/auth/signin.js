import Layout from "components/layout"
import { getProviders, getSession, signIn } from "next-auth/react"
import { AiFillGithub, AiOutlineGoogle, AiFillFacebook } from "react-icons/ai"

export default function SignIn({ providers }) {
    return (
        <Layout title={'Login'}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4 pb-24 h-screen'>
                <div className='flex justify-center items-center w-full h-5/6'>
                    <div className='flex flex-auto flex-col'>
                        <div className='text-center mb-10'>
                            <h1 className='text-white text-[32px] font-extrabold'>
                                Inicia en Fitstore
                            </h1>
                        </div>
                        <div className='w-full max-w-xs self-center'>
                            <div className='pb-4 border-b border-zinc-700'>
                                <button onClick={() => signIn(providers.github.id)}
                                    className='flex justify-center items-center 
                                          bg-zinc-700 hover:bg-zinc-600 text-white text-center font-semibold
                                            py-3 min-w-full max-w-full mb-3
                                            border border-transparent rounded-md transition-all'>
                                    <AiFillGithub className='mr-2 text-2xl' /> Continua con {providers.github.name}
                                </button>
                                <button onClick={() => signIn(providers.google.id)}
                                    className='flex justify-center items-center 
                                    bg-violet-600 hover:bg-violet-500 text-white text-center font-semibold
                                      py-3 min-w-full max-w-full mb-3
                                      border border-transparent rounded-md transition-all'>
                                    <AiOutlineGoogle className='mr-2 text-2xl' /> Continua con {providers.google.name}
                                </button>
                                <button onClick={() => signIn(providers.facebook.id)}
                                    className='flex justify-center items-center 
                                    bg-blue-600 hover:bg-blue-500 text-white text-center font-semibold
                                      py-3 min-w-full max-w-full mb-3
                                      border border-transparent rounded-md transition-all'>
                                    <AiFillFacebook className='mr-2 text-2xl' /> Continua con {providers.facebook.name}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const data = await getSession(context)

    if (data) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    const providers = await getProviders()

    return {
        props: {
            providers,
        },
    }
}
