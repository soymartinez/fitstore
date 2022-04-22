import Link from 'next/link'
import Navbar from '../components/navbar'

export default function Pedidos() {
    return (
        <>
            <Navbar />
            <div className='pt-24 container lg:px-32 md:px-12 px-8'>
                <h1 className='font-bold text-2xl'>
                    Pedidos
                </h1>
                <Link href="/">Go home</Link>
            </div>
        </>
    )
}