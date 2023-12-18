import {auth} from "@/firebase/config";
import { onAuthStateChanged } from 'firebase/auth'
import {ref} from "vue";


const user = ref(auth.currentUser)

onAuthStateChanged(auth, (_user: any)=>{
    user.value = _user
})


function getUser() {
    return {user} }


export default getUser