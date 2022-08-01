import { loadStripe } from '@stripe/stripe-js'

let stripePromise = null

const getStripe = async () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
    }

    return stripePromise
}

export default getStripe