import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper"
import { ProductList } from "../../components/ProductList/ProductList"

export const HomePage = () => {
    return (
        <ContentWrapper title="Velkommen" hidetitle={true} description="Template til React Apps">
            <ProductList />
        </ContentWrapper>
    )
}
