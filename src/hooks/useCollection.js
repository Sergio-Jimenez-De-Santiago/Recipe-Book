import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // if we dont use a ref --> infinite loop in useEffect
    // _query is an array and is "different" on every func call
    // but wrapping _query in useRef, it doesnt see it as "different" if the content doesnt change
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // update state
            setDocuments(results)
            setError(null)
        }, err => {
            console.log(err)
            setError('could not fetch the data')
        })

        // unsub on unmount
        return () => unsub()

    }, [collection, query, orderBy])

    return { documents, error }
}