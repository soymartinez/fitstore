import Layout from 'components/layout'
import { fetcher } from 'lib/fetcher'
import { useRouter } from 'next/router'

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
    const { push } = useRouter()

    const { name, subname, brand, price, descriptions, image } = product

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { id } = product
        const { name, subname, brand, price, use, info, detail, ingredientes, image } = e.target
        const data = {
            name: name.value,
            subname: subname.value,
            brand: brand.value,
            image: image.value,
            description: {
                info: info.value,
                detail: detail.value,
                use: use.value,
                price: price.value,
                discountPrice: discountPrice.value,
                weight: weight.value,
                flavors: flavors.value,
                benefits: benefits.value,
                ingredientes: ingredientes.value,
            },
            image: image.value,
        }

        await fetcher(`${process.env.API_URL}/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })

        name.value = ''
        subname.value = ''
        brand.value = ''
        image.value = ''
        info.value = ''
        price.value = ''
    }

    const elements = [
        { name: 'name', label: 'Nombre', type: 'text', value: name },
        { name: 'subname', label: 'Subnombre', type: 'text', value: subname },
        { name: 'brand', label: 'Marca', type: 'text', value: brand },
        { name: 'image', label: 'Imagen', type: 'text', value: image, rows: 3 },
        { name: 'info', label: 'Información', type: 'text', value: descriptions.info, rows: 3 },
        { name: 'detail', label: 'Detalle', type: 'text', value: descriptions.detail, rows: 5 },
        { name: 'use', label: 'Uso', type: 'text', value: descriptions.use, rows: 3 },
        { name: 'price', label: 'Precio', type: 'text', value: descriptions.price },
        { name: 'discountPrice', label: 'Precio con descuento', type: 'text', value: descriptions.discountPrice },
        { name: 'weight', label: 'Peso', type: 'text', value: descriptions.weight },
        { name: 'flavors', label: 'Sabores', type: 'text', value: descriptions.flavors },
        { name: 'benefits', label: 'Beneficios', type: 'text', value: descriptions.benefits, rows: 5 },
        { name: 'ingredientes', label: 'Ingredientes', type: 'text', value: descriptions.ingredients, rows: 6 },
    ]

    const style = {
        label: 'text-sm font-semibold',
        input: `px-4 py-2 text-white shadow-lg outline-none focus:outline-none focus:border-blue-500
        mt-1 block w-full sm:text-sm border bg-transparent rounded-md mt-2 mb-4`,
    }

    function autoResize(e) {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
    }

    return (
        <Layout title={product.name}>
            <div className='pt-24 container lg:px-32 md:px-8 px-4'>
                <h1 className='font-bold text-3xl text-white md:pb-7 my-4'>Editar producto</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    {elements.map(({ name, label, type, value, rows }) => (
                        <label className='block' key={label}>
                            <span className={style.label}>{label}</span>
                            {
                                !rows ? (
                                    <input
                                        name={name}
                                        defaultValue={value}
                                        placeholder={label}
                                        type={type}
                                        className={style.input} />
                                ) : (
                                    <textarea onInput={(e) => autoResize(e)}
                                        name={name}
                                        defaultValue={value}
                                        placeholder={label}
                                        rows={rows}
                                        className={style.input} />
                                )
                            }
                        </label>
                    ))}

                    <div className='flex gap-2 my-4'>
                        <button
                            type='button'
                            onClick={() => push(`/admin/products/${product.id}`)}
                            className={`text-white hover:bg-opacity-80 hover:bg-white transition-all rounded-full font-bold px-4 border`}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className={`bg-white text-black hover:bg-opacity-80 transition-all rounded-full font-bold px-4`}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <style jsx>{`
                textarea {
                    display: block;
                    overflow: hidden;
                    resize: none;
                }
            `}</style>
        </Layout>
    )
}
