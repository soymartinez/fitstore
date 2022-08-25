import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    const id = req.params.id

    try {
        if (!id.startsWith('cs_')) {
            throw new Error('Incorrect CheckoutSession ID.')
        }
        const checkout_session = await stripe.checkout.sessions.retrieve(id)

        res.status(200).json(checkout_session)
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message })
    }
}