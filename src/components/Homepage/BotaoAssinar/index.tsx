import { useSession } from "next-auth/react";
import { useModal } from "../../../hook/useModal";
import { api } from "../../../services/api";
import { getStripeJs } from "../../../services/stripe-js";

export function BotaoAssinar() {
    const {data: session} = useSession();

    const { openModal } = useModal();

    async function handleAssinar(){
        if (!session) {
            openModal();
            return;
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId: sessionId})
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <>
            <button onClick={handleAssinar}> ASSINAR </button>
        </>
    );
}