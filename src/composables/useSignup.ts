import {ref} from "vue";
import {auth, db} from "@/firebase/config";

import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {collection, addDoc} from "firebase/firestore";

const errorMessage = ref("");
const isPending = ref(false);


async function signup(userType: "person" | "business", displayName: string, email: string, password: string) {
    errorMessage.value = ""
    isPending.value = true

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error('Could not complete signup please try again')
        }


        // Set the user's displayName
        await updateProfile(res.user, {displayName})

        // const personRef = collection(db, "persons");
        // const businessRef = collection(db, "businesses");
        const userRef = collection(db, "users");



        if (userType === "person") {


            await addDoc(userRef, {

                uid: res.user.uid,
                firstname: displayName.split("-")[0],
                lastname: displayName.split("-")[1],
                email,
                applications: [],
                userType
            });

        }

        if (userType === "business") {

            await addDoc(userRef, {
                uid: res.user.uid,
                displayName,
                email,
                listings: [],
                userType
            })

        }


        errorMessage.value = ""
        isPending.value = false
    } catch (err) {
        errorMessage.value = (err as Error).message
        isPending.value = false
    }
}

const useSignup = () => {
    return {errorMessage, isPending, signup}
}

export default useSignup