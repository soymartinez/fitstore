export default function Products({ data }) {
    return (
        <section className='container lg:px-32 md:px-12 px-8 py-20'>
            <h2 className='text-2xl font-semibold mb-4 text-[#3081ed]'>Lista de productos</h2>
            <div className='flex gap-2 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700'>
                {
                    data.map(({ id, name, price, image, description }) => (
                        <article key={id} className='p-4 bg-[#222537] rounded-md'>
                            <img src={image} className='max-w-max' alt={name} />
                            <h3 className='subtitle text-2xl text-white mt-2 font-semibold'>{name}</h3>
                            <h5>{description}</h5>
                            <h5 className='text-xl font-semibold'>$ {price}</h5>
                        </article>
                    ))
                }
            </div>
        </section>
    );
};

export async function getStaticProps() {
    try {
        const res = await fetch('http://localhost:3000/api/products')
        const data = await res.json()
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error);
    }
}
