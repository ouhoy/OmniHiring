import {ref} from "vue";
import {auth} from "@/firebase/config";

import {signInWithEmailAndPassword} from "firebase/auth"

const error = ref("");
const isPending = ref(false);


async function login(email: string, password: string) {
    error.value = ""
    isPending.value = true

    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('Could not login please try again')
        }
        error.value = ""
        isPending.value = false
    } catch (err) {
        error.value = (err as Error).message
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, isPending, login }
}

export default useLogin