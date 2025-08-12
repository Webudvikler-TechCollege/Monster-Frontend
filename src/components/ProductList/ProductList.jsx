import { useProductList } from "../../hooks/useProductList"

export const ProductList = () => {
    const { productList, loading, error } = useProductList()

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
