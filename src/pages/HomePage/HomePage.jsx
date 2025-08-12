import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper"
import { useProductList } from "../../hooks/useProductList"

export const HomePage = () => {
    const { list, loading, error } = useProductList()

    return (
        <ContentWrapper title="Velkommen" hidetitle={true} description="Template til React Apps">
            {list && list.data && list.data.map(item => {
                return (
                    <li className="grid grid-cols-3" key={item.id}>
                        <img className="w-10" src={`http://localhost:3000${item.image}`} />
                        <div className="text-white">
                            {item.name}<br />
                            {item.price}
                        </div>
                    </li>
                )
            })}
        </ContentWrapper>
    )
}
