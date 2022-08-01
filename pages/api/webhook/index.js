import Stripe from 'stripe'
import { buffer } from 'micro'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    } else {
        let event

        try {
            const buf = await buffer(req)
            const signature = req.headers['stripe-signature']

            event = stripe.webhooks.constructEvent(
                buf.toString(),
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            )
        } catch (error) {
            console.error(error)
            res.status(400).send({ error: error.message })
            return
        }

        console.log('Success: ', event.id)

        if (event.type === 'checkout.session.completed') {
            console.log('Payment succeeded')
        } else {
            console.log('Payment failed')
        }

        res.json({ received: true })
    }
}