export default function Formbutton({ text }) {
    return (
        <>
            <button className='w-full relative text-center overflow-hidden rounded-lg'>
                <div className={`w-[200%] h-10 hover:w-full transition-all duration-300`}>
                    <span className='absolute text-center py-2 text-white left-0 w-full'>
                        {text}
                    </span>
                </div>
            </button>
            <style jsx>{`
                div {
                    background: linear-gradient(100deg, #3081ed 0%, #9553e0 65%)
                }
            `}</style>
        </>
    )
}
