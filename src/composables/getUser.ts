import {auth, db} from "@/firebase/config";
import { onAuthStateChanged } from 'firebase/auth'
import {ref} from "vue";
import {collection, getDocs} from "firebase/firestore";


const user = ref(auth.currentUser)
const userType = ref("");
onAuthStateChanged(auth, (_user: any)=>{
    user.value = _user
})

// Check Logged-in user Type
const userRef = collection(db, "users");

async function getUserType() {
    await getDocs(userRef)
        .then(querySnapshot=>{
            querySnapshot.forEach(doc => {
                const userData = doc.data();

                if(userData.uid === user.value?.uid) {
                    userType.value = userData.userType;
                    console.log(userData.userType);
                }

            });
        })

}


function getUser() {
    return {user, userType} }


export default getUser