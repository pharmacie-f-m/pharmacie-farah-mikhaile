import Image from 'next/image'
import Link from 'next/link'
import { Section, Heading, Frame, Item, ImageWrapper, ContentWrapper } from './CategoryCard-styles'

export default function CategoryCard({ category }) {
  const categoryId = category.categoryId;
  const categoryName = category.categoryName;

  return (
      <>
      <div id={"category-slide-link-wrapper"}>
        <Link href={`/category/${categoryId}`} passHref>
          <h3 className={"center-text category-slide-link"}>{categoryName}</h3>
        </Link>
      </div>
    </>
  )
}

CategoryCard.Section = function CategoryCardSection({ children, ...restProps }) {
  return <Section {...restProps}>{children}</Section>
}

CategoryCard.Frame = function CategoryCardFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>
}

CategoryCard.Heading = function CategoryCardHeading({ children, ...restProps }) {
  return <Heading {...restProps}>{children}</Heading>
}
