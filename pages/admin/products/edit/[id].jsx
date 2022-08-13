import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'

import Layout from 'components/layout'
import { fetcher } from 'lib/fetcher'

export async function getServerSideProps({ params }) {
    const { id } = params
    const product = await fetcher(`${process.env.API_URL}/products/${id}`)
    return {
        props: {
            product,
        },
    }
}

export default function EditProduct({ product }) {
    const { id, name, subname, brand, descriptions, image } = product

    const [imageUrl, setImageUrl] = useState(image)
    const [flavors, setFlavors] = useState(descriptions.flavors)
    const [ingredients, setIngredients] = useState(descriptions.ingredients)
    const [benefits, setBenefits] = useState(descriptions.benefits)

    const [newFlavor, setNewFlavor] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [newBenefit, setNewBenefit] = useState('')
    const { push } = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, subname, brand, image, info, detail, use, price, discountPrice, weight } = e.target
        const data = {
            name: name.value,
            subname: subname.value,
            brand: brand.value,
            image: image.value,
            description: {
                info: info.value,
                detail: detail.value,
                use: use.value,
                price: +price.value,
                discountPrice: +discountPrice.value,
                weight: +weight.value,
                flavors: flavors,
                ingredients: ingredients,
                benefits: benefits,
            },
        }

        await axios.put(`/api/products/${id}`, data)
            .then(() => push(`/admin/products/${id}`))
            .catch((error) => console.log('error: ', error.message))
    }

    function handleFlavorsChange(e) {
        e.preventDefault()
        if (newFlavor.length > 0) setFlavors([...flavors, newFlavor])
        setNewFlavor('')
    }

    function handleIngredientsChange(e) {
        e.preventDefault()
        if (newIngredient.length > 0) setIngredients([...ingredients, newIngredient])
        setNewIngredient('')
    }

    function handleBenefitsChange(e) {
        e.preventDefault()
        if (newBenefit.length > 0) setBenefits([...benefits, newBenefit])
        setNewBenefit('')
    }

    const style = {
        label: 'block mb-1.5 text-sm font-medium',
        input: `bg-[#222537] border text-sm outline-none rounded-lg block w-full p-2.5 hover:border-violet-500
            border-slate-700 placeholder-gray-400 text-white focus:border-blue-500 md:overflow-hidden md:resize-none`,
    }

    function autoResize(e) {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
    }

    return (
        <Layout title={product.name}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4 pb-8'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex justify-between items-center md:pb-7 my-4'>
                        <h1 className='font-bold text-3xl text-white'>Editar</h1>
                        <div className='flex gap-2'>
                            <button
                                type={'button'}
                                onClick={() => push(`/admin/products/${product.id}`)}
                                className={`text-white hover:opacity-80 border transition-all rounded-full font-bold px-4`}>
                                Cancel
                            </button>
                            <button
                                type={'submit'}
                                className={`bg-white text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4`}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <label className={style.label}>{'Nombre'}</label>
                            <input
                                name={'name'}
                                defaultValue={name}
                                placeholder={'nombre de producto, marca, etc.'}
                                type={'text'}
                                autoComplete='off'
                                className={style.input} />
                        </div>

                        <div>
                            <label className={style.label}>{'Subnombre'}</label>
                            <input
                                name={'subname'}
                                defaultValue={subname}
                                placeholder={'nombre secundario de producto, marca, etc.'}
                                type={'text'}
                                autoComplete='off'
                                className={style.input} />
                        </div>

                        <div>
                            <label className={style.label}>{'Marca'}</label>
                            <input
                                name={'brand'}
                                defaultValue={brand}
                                placeholder={'Marca del producto'}
                                type={'text'}
                                autoComplete='off'
                                className={style.input} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className={style.label}>{'Imagen'}</label>
                            <Image src={imageUrl} alt={name} layout={'fixed'} width={140} height={140}
                                onError={(e) => e.target.onerror = null} />
                            <div className=''>
                                <textarea
                                    name={'image'}
                                    defaultValue={image}
                                    placeholder={'URL de la imagen'}
                                    rows={3}
                                    autoComplete='off'
                                    onClick={(e) => {
                                        autoResize(e)
                                        setImageUrl(e.target.value)
                                    }}
                                    className={style.input} />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className={style.label}>{'Informacion'}</label>
                            <textarea
                                name={'info'}
                                defaultValue={descriptions.info}
                                placeholder={`¿Qué es?`}
                                rows={3}
                                autoComplete='off'
                                onClick={(e) => autoResize(e)}
                                className={style.input} />
                        </div>

                        <div className='flex flex-col'>
                            <label className={style.label}>{'Detalle'}</label>
                            <textarea
                                name={'detail'}
                                defaultValue={descriptions.detail}
                                placeholder={`¿Qué contiene? ¿Cómo se usa? etc.`}
                                rows={5}
                                autoComplete='off'
                                onClick={(e) => autoResize(e)}
                                className={style.input} />
                        </div>

                        <div className='flex flex-col'>
                            <label className={style.label}>{'Recomendaciones'}</label>
                            <textarea
                                name={'use'}
                                defaultValue={descriptions.use}
                                placeholder={`¿Cómo se usa?`}
                                rows={5}
                                autoComplete='off'
                                onClick={(e) => autoResize(e)}
                                className={style.input} />
                        </div>

                        <div className='grid sm:grid-cols-3 gap-2'>
                            <div>
                                <label className={style.label}>{'Precio'}</label>
                                <input
                                    name={'price'}
                                    defaultValue={descriptions.price}
                                    placeholder={'Precio original'}
                                    type={'text'}
                                    autoComplete='off'
                                    className={style.input} />
                            </div>
                            <div>
                                <label className={style.label}>{'Precio con descuento'}</label>
                                <input
                                    name={'discountPrice'}
                                    defaultValue={descriptions.discountPrice}
                                    placeholder={'Precio con descuento'}
                                    type={'text'}
                                    autoComplete='off'
                                    className={style.input} />
                            </div>
                            <div>
                                <label className={style.label}>{'Peso'}</label>
                                <input
                                    name={'weight'}
                                    defaultValue={descriptions.weight}
                                    placeholder={'Peso del producto'}
                                    type={'text'}
                                    autoComplete='off'
                                    className={style.input} />
                            </div>
                        </div>

                        <div>
                            <label className={style.label}>{'Sabores'}</label>
                            <div className='flex gap-2'>
                                <textarea
                                    name={'flavor'}
                                    placeholder={'Nuevo sabor'}
                                    value={newFlavor}
                                    type={'text'}
                                    rows={1}
                                    onChange={(e) => { setNewFlavor(e.target.value); autoResize(e) }}
                                    autoComplete='off'
                                    className={style.input + ' mb-2'} />
                                <button onClick={(e) => handleFlavorsChange(e)} type={'button'}
                                    className='text-blue-500 text-3xl hover:scale-105'>
                                    <AiFillPlusCircle />
                                </button>
                            </div>
                            <div className='grid gap-2'>
                                {
                                    flavors.map((flavor, index) => {
                                        return (
                                            <div key={index} className='flex justify-center items-center gap-2'>
                                                <textarea
                                                    name={'flavor'}
                                                    defaultValue={flavor}
                                                    type={'text'}
                                                    rows={1}
                                                    autoComplete='off'
                                                    onClick={(e) => autoResize(e)}
                                                    className={style.input} />
                                                <button onClick={() => setFlavors([...flavors.slice(0, index), ...flavors.slice(index + 1)])}
                                                    type={'button'} className='text-white text-3xl rotate-45 hover:scale-105'>
                                                    <AiFillPlusCircle />
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div>
                            <label className={style.label}>{'Ingredients'}</label>
                            <div className='flex gap-2'>
                                <textarea
                                    name={'New ingredient'}
                                    placeholder={'Nuevo ingrediente'}
                                    value={newIngredient}
                                    type={'text'}
                                    rows={1}
                                    onChange={(e) => { setNewIngredient(e.target.value); autoResize(e) }}
                                    autoComplete='off'
                                    className={style.input + ' mb-2'} />
                                <button onClick={(e) => handleIngredientsChange(e)} type={'button'}
                                    className='text-blue-500 text-3xl hover:scale-105'>
                                    <AiFillPlusCircle />
                                </button>
                            </div>
                            <div className='grid gap-2'>
                                {
                                    ingredients.map((ingredient, index) => {
                                        return (
                                            <div key={index} className='flex justify-center items-center gap-2'>
                                                <textarea
                                                    name={'ingredient'}
                                                    defaultValue={ingredient}
                                                    type={'text'}
                                                    rows={3}
                                                    autoComplete='off'
                                                    onClick={(e) => autoResize(e)}
                                                    className={style.input} />
                                                <button onClick={() => setIngredients([...ingredients.slice(0, index), ...ingredients.slice(index + 1)])}
                                                    type={'button'} className='text-white text-3xl rotate-45 hover:scale-105'>
                                                    <AiFillPlusCircle />
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div>
                            <label className={style.label}>{'Beneficios'}</label>
                            <div className='flex gap-2'>
                                <textarea
                                    name={'benefits'}
                                    placeholder={'Nuevo Beneficio'}
                                    value={newBenefit}
                                    type={'text'}
                                    rows={1}
                                    onChange={(e) => { setNewBenefit(e.target.value); autoResize(e) }}
                                    autoComplete='off'
                                    className={style.input + ' mb-2'} />
                                <button onClick={(e) => handleBenefitsChange(e)} type={'button'}
                                    className='text-blue-500 text-3xl hover:scale-105'>
                                    <AiFillPlusCircle />
                                </button>
                            </div>
                            <div className='grid gap-2'>
                                {
                                    benefits.map((benefit, index) => {
                                        return (
                                            <div key={index} className='flex justify-center items-center gap-2'>
                                                <textarea
                                                    name={'benefits'}
                                                    defaultValue={benefit}
                                                    type={'text'}
                                                    rows={1}
                                                    autoComplete='off'
                                                    onClick={(e) => autoResize(e)}
                                                    className={style.input} />
                                                <button onClick={() => setBenefits([...benefits.slice(0, index), ...benefits.slice(index + 1)])}
                                                    type={'button'} className='text-white text-3xl rotate-45 hover:scale-105'>
                                                    <AiFillPlusCircle />
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
