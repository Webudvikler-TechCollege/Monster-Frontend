import { useEffect, useState } from "react"
import { fetchApi } from "../utils/fetchApi"

export const useProductList = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getList = async () => {
            const url = "/products"
            try {
                const res = await fetchApi(url)                
                setList(res)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        getList()
    }, [])

    return { list, loading, error }
}
