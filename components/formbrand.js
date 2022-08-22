import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function FormBrand({ brand }) {
  const { push } = useRouter()
  const [imageUrl, setImageUrl] = useState(brand ? brand.image : '')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, image } = e.target
    const data = {
      name: name.value,
      image: image.value,
    }

    const Toast = (await import('wc-toast')).toast
    if (brand.name) {
      Toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const res = await axios.put(`/api/brands/${brand.id}`, data)
              .then(() => push(`/admin/brands`))
              .catch((error) => console.log('error: ', error.message))
            resolve(res.data)
          } catch (error) {
            reject(error.data)
          }
        }),
        {
          loading: 'actualizando',
          success: 'marca actualizada',
          error: 'algo salio mal',
        },
        {
          theme: {
            type: 'custom',
            style: {
              background: '#222537',
              color: '#fff',
              stroke: '#fff',
            }
          },
        },
      )
    } else {
      Toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const res = await axios.post('/api/brands', data)
              .then(() => push(`/admin/brands`))
              .catch((error) => console.log('error: ', error.message))
            resolve(res.data)
          } catch (error) {
            reject(error.response.data)
          }
        }),
        {
          loading: 'guardando',
          success: 'marca guardada',
          error: 'algo salio mal',
        },
        {
          theme: {
            type: 'custom',
            style: {
              background: '#222537',
              color: '#fff',
              stroke: '#fff',
            }
          },
        },
      )
    }
  }

  const style = {
    label: 'block mb-1.5 text-sm font-medium',
    input: `bg-[#222537] border text-sm outline-none rounded-lg block w-full p-2.5 hover:border-violet-500
            border-slate-700 placeholder-gray-400 text-white focus:border-blue-500 md:overflow-hidden md:resize-none`,
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <wc-toast></wc-toast>
      <div className='flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-4 md:pb-7 my-4'>
        <h1 className='font-bold text-3xl text-white'>{brand.name ? 'Editar Marca' : 'Nueva Marca'}</h1>
        <div className='flex gap-2'>
          <Link href='/admin/brands'>
            <a className={`text-white hover:opacity-80 border transition-all rounded-full font-bold px-4`}>
              Cancelar
            </a>
          </Link>
          <button
            type={'submit'}
            className={`bg-white text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4`}>
            Guardar cambios
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <label className={style.label}>{'Nombre'}</label>
          <input
            name={'name'}
            defaultValue={brand ? brand.name : ''}
            placeholder={'nombre de marca'}
            required={true}
            type={'text'}
            autoComplete='off'
            className={style.input} />
        </div>

        <div className='flex flex-col gap-2'>
          <label className={style.label}>{'Imagen'}</label>
          <Image src={imageUrl} alt={brand ? brand.name : ''} objectFit='contain' layout={'fixed'} width={300} height={300}
            onError={(e) => e.target.onerror = null} />
          <input
            name={'image'}
            defaultValue={brand ? brand.image : ''}
            placeholder={'URL de la imagen'}
            required={true}
            type={'url'}
            autoComplete='off'
            onChange={(e) => setImageUrl(e.target.value)}
            className={style.input} />
        </div>
      </div>
    </form>
  )
}
