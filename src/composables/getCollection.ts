import {ref, watchEffect} from 'vue'

// firebase imports
import {db} from "@/firebase/config";
import {collection, onSnapshot, query, where} from 'firebase/firestore'

function getCollection<T>(collectionName: string, userUid?: string ) {
    const documents = ref<T[]>()

    // collection reference
    let collectionReference = collection(db, collectionName);

    if (userUid) {
        // @ts-ignore
        collectionReference = query(collectionReference, where('uid', '==', userUid))
    }

    const unsubscribe = onSnapshot(collectionReference, snapshot => {
        let results: T[] = []
        snapshot.docs.forEach(doc => {
            const data = doc.data() as T;
            results.push({...data, id: doc.id})
        })

        // Update values
        documents.value = results
    })

    watchEffect(onInvalidate => {
        onInvalidate(() => unsubscribe())
    })

    return {documents}
}

export default getCollection