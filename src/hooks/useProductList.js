import { useEffect, useState } from "react"

// Custom hook der henter en liste af produkter
export const useProductList = () => {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const getProductList = async () => {
      const url = "http://localhost:4000/api/products" // API-endpoint
      try {
        // Hent data (forventer JSON)
        const response = await fetch(url, {
          headers: { Accept: "application/json" }
        })
        // Parse body til JavaScript-objekt
        const result = await response.json()
        // Læg data i state
        setProductList(result)
      } catch (error) {
        // Hvis noget fejler, gem fejlen
        setError(error)
      } finally {
        // Uanset hvad: vi er færdige med at loade
        setLoading(false)
      }
    }

    getProductList()
  }, [])

  // Eksponér liste, loading og error til komponenter der skal bruge hook'et
  return { productList, loading, error }
}