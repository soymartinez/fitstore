export default function Logo({ className }) {
    return (
        <svg
            className={className}
            width={22}
            height={22}
            viewBox="0 0 221 221"
            fill="none"
        >
            <g filter="url(#filter0_f_22_81)">
                <circle cx={110.5} cy={110.5} r={32.5} fill="white" />
            </g>
            <path d="M60 82C60 70.402 69.402 61 81 61V61V161H60V82Z" fill="#3081ED" />
            <path
                d="M85 121H106V161H95.5C89.701 161 85 156.299 85 150.5V121Z"
                fill="white"
            />
            <path
                d="M139 100H149.5C155.299 100 160 104.701 160 110.5V150.5C160 156.299 155.299 161 149.5 161H139V100Z"
                fill="white"
            />
            <path
                d="M154.5 61C157.538 61 160 63.4624 160 66.5V66.5C160 69.5376 157.538 72 154.5 72H81V61L154.5 61Z"
                fill="#3081ED"
            />
            <path
                d="M148.5 80C151.538 80 154 82.4624 154 85.5V85.5C154 88.5376 151.538 91 148.5 91H70V80H148.5Z"
                fill="#3081ED"
            />
            <path
                d="M154.5 80C157.538 80 160 82.4624 160 85.5V85.5C160 88.5376 157.538 91 154.5 91H85V91C85 84.9249 89.9249 80 96 80H154.5Z"
                fill="white"
            />
            <path
                d="M149 100C155.075 100 160 104.925 160 111V111H96C89.9249 111 85 106.075 85 100V100H149Z"
                fill="white"
            />
            <path
                d="M160 150V150C160 156.075 155.075 161 149 161H96C89.9249 161 85 156.075 85 150V150H160Z"
                fill="white"
            />
            <defs>
                <filter
                    id="filter0_f_22_81"
                    x={0}
                    y={0}
                    width={221}
                    height={221}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={32}
                        result="effect1_foregroundBlur_22_81"
                    />
                </filter>
            </defs>
        </svg>
    )
}
