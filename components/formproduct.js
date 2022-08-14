import axios from 'axios'
import Image from 'next/image'
import useSWR from 'swr'
import { fetcher } from 'lib/fetcher'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'

export default function FormProduct({ product }) {
    const { data } = useSWR(`/api/brands`, fetcher)

    const [imageUrl, setImageUrl] = useState(product ? product.image : '')
    const [flavors, setFlavors] = useState(product ? product.descriptions.flavors : [])
    const [ingredients, setIngredients] = useState(product ? product.descriptions.ingredients : [])
    const [benefits, setBenefits] = useState(product ? product.descriptions.benefits : [])

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

        if (product) {
            await axios.put(`/api/products/${product.id}`, data)
                .then(() => push(`/admin/products/${product.id}`))
                .catch((error) => console.log('error: ', error.message))
        } else {
            await axios.post('/api/products', data)
                .then(() => push('/admin/products'))
                .catch((error) => console.log('error: ', error.message))
        }
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
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-4 md:pb-7 my-4'>
                <h1 className='font-bold text-3xl text-white'>{product ? 'Editar producto' : 'Nuevo producto'}</h1>
                <div className='flex gap-2'>
                    <button
                        type={'button'}
                        onClick={() => push(product ? `/admin/products/${product.id}` : '/admin')}
                        className={`text-white hover:opacity-80 border transition-all rounded-full font-bold px-4`}>
                        Cancelar
                    </button>
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
                        defaultValue={product ? product.name : ''}
                        placeholder={'nombre de producto, marca, etc.'}
                        required={true}
                        type={'text'}
                        autoComplete='off'
                        className={style.input} />
                </div>

                <div>
                    <label className={style.label}>{'Subnombre'}</label>
                    <input
                        name={'subname'}
                        defaultValue={product ? product.subname : ''}
                        placeholder={'nombre secundario de producto, marca, etc.'}
                        required={true}
                        type={'text'}
                        autoComplete='off'
                        className={style.input} />
                </div>

                <div>
                    <label className={style.label}>{'Marca'}</label>
                    <select name={'brand'} className={style.input}>
                        {data && data.map(({ id, name }) => (
                            <option key={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className={style.label}>{'Imagen'}</label>
                    <Image src={imageUrl} alt={product ? product.name : ''} layout={'fixed'} width={140} height={140}
                        onError={(e) => e.target.onerror = null} />
                    <textarea
                        name={'image'}
                        defaultValue={product ? product.image : ''}
                        placeholder={'URL de la imagen'}
                        required={true}
                        rows={3}
                        autoComplete='off'
                        onClick={(e) => {
                            autoResize(e)
                            setImageUrl(e.target.value)
                        }}
                        className={style.input} />
                </div>

                <div className='flex flex-col'>
                    <label className={style.label}>{'Informacion'}</label>
                    <textarea
                        name={'info'}
                        defaultValue={product ? product.descriptions.info : ''}
                        placeholder={`¿Qué es?`}
                        required={true}
                        rows={3}
                        autoComplete='off'
                        onClick={(e) => autoResize(e)}
                        className={style.input} />
                </div>

                <div className='flex flex-col'>
                    <label className={style.label}>{'Detalle'}</label>
                    <textarea
                        name={'detail'}
                        defaultValue={product ? product.descriptions.detail : ''}
                        placeholder={`¿Qué contiene? ¿Cómo se usa? etc.`}
                        required={true}
                        rows={5}
                        autoComplete='off'
                        onClick={(e) => autoResize(e)}
                        className={style.input} />
                </div>

                <div className='flex flex-col'>
                    <label className={style.label}>{'Recomendaciones'}</label>
                    <textarea
                        name={'use'}
                        defaultValue={product ? product.descriptions.use : ''}
                        placeholder={`¿Cómo se usa?`}
                        required={true}
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
                            defaultValue={product ? product.descriptions.price : ''}
                            placeholder={'Precio original'}
                            required={true}
                            type={'text'}
                            autoComplete='off'
                            className={style.input} />
                    </div>
                    <div>
                        <label className={style.label}>{'Precio con descuento'}</label>
                        <input
                            name={'discountPrice'}
                            defaultValue={product ? product.descriptions.discountPrice : ''}
                            placeholder={'Precio con descuento'}
                            type={'text'}
                            autoComplete='off'
                            className={style.input} />
                    </div>
                    <div>
                        <label className={style.label}>{'Peso'}</label>
                        <input
                            name={'weight'}
                            defaultValue={product ? product.descriptions.weight : ''}
                            placeholder={'Peso del producto'}
                            required={true}
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
    )
}
