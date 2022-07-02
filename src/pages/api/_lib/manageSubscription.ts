import { fauna } from "../../../services/fauna";
import { query } from 'faunadb'
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
) {

    // verificar de qual usuário é
    const userRef = await fauna.query(
        query.Select(
            "ref",
            query.Get(
                query.Match(
                    query.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    // salvando em subscription todos os dados da inscrição do usuário
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    if (createAction){
        // cria uma nova subscription
        // salvando no banco de dados os dados da subscription
        await fauna.query(
            query.Create(
                query.Collection('subscriptions'),
                { data: subscriptionData }
            )
        )
    } else {
        await fauna.query(
            // substitui a subscription ja criada
            query.Replace(
                query.Select(
                    "ref",
                    query.Get(
                        query.Match(
                            query.Index('subscription_by_id'),
                            subscription.id,
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }
}