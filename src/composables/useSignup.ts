import {ref} from "vue";
import {auth, db} from "@/firebase/config";

import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {collection, addDoc} from "firebase/firestore";

const error = ref("");
const isPending = ref(false);


async function signup(userType: "person" | "business", displayName: string, email: string, password: string) {
    error.value = ""
    isPending.value = true

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('Could not complete signup please try again')
        }


        // Set the user's displayName
        await updateProfile(res.user, {displayName})

        const personRef = collection(db, "persons");
        const businessRef = collection(db, "businesses");

        if (userType === "person") {
            await addDoc(personRef, {
                uid: res.user.uid,
                firstname: displayName.split("-")[0],
                lastname: displayName.split("-")[1],
                email,
                applications: []
            });

        }

        if (userType === "business") {
            await addDoc(businessRef, {
                uid: res.user.uid,
                displayName,
                email,
                listings: []
            });

        }


        error.value = ""
        isPending.value = false
    } catch (err) {
        error.value = (err as Error).message
        isPending.value = false
    }
}

const useSignup = () => {
    return {error, isPending, signup}
}

export default useSignup