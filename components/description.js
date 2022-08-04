export default function Description({ product }) {
    return (
        <div>
            <div>
                <h1 className='text-lg text-white font-bold'>Ingredientes:</h1>
                <ul className='list-disc'>
                    {
                        product.ingredients.map((item, index) => {
                            return <li className='py-2 mx-8' key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
            <div>
                <h1 className='text-lg text-white font-bold'>Benefits:</h1>
                <ul className='list-disc'>
                    {
                        product.benefits.map((item, index) => {
                            return <li className='mx-8' key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
