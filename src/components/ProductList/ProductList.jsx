import { useProductList } from "../../hooks/useProductList"
import { Loader } from "../Loader/Loader"

export const ProductList = () => {
    const { productList, loading, error } = useProductList()

    if (loading) return <Loader />
    if (error) return <Loader />

    return (
        <>
            {productList && productList.map(item => {
                return (
                    <li className="grid grid-cols-3" key={item.id}>
                        <img className="w-10" src={`http://localhost:4000${item.image}`} />
                        <div className="text-white">
                            {item.name}<br />
                            {item.price}
                        </div>
                    </li>
                )
            })}
        </>
    )
}
