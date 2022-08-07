export default function Skeleton({ 
        children,
        width = 'w-full',
        height = 'h-full',
        rounded = '', 
        background = 'bg-black/10' }) {
    return (
        <div className={`overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] 
                    before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent
                    ${rounded}`}>
            <div className={`${background, width, height}`}>
                {children}
            </div>
        </div>
    )
}
