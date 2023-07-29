import React from 'react';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import ProductCard from '@/features/catalog/components/product/ProductCard';
import Pagination from '@/components/common/Pagination';
import { ProductType } from '../types';
import { useAtom } from 'jotai';
import { Text } from '@/components/common/Text';
import {
  brandFilterAtom,
  brandsAtom,
  categoryFilterAtom,
  categoryRegistry,
  filteredProductsAtom,
  priceRangeAtom,
  sortAtom,
} from '@/pages/catalogue/[[...slug]]';

function Items({ currentItems }: { currentItems: ProductType[] }) {
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 place-items-center'>
      {currentItems &&
        currentItems.map((item, index) => <ProductCard key={index} product={item} />)}
    </div>
  );
}

const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  const [itemOffset, setItemOffset] = React.useState(0);

  const [categorySet] = useAtom(categoryFilterAtom);
  const [filteredProducts, setFilteredProducts] = useAtom(filteredProductsAtom);
  const [brands, setBrands] = useAtom(brandsAtom);
  const [brandSet, setBrandSet] = useAtom(brandFilterAtom);
  const [sort, setSort] = useAtom(sortAtom);
  const [price, setPrice] = useAtom(priceRangeAtom);

  let itemsPerPage = 20;

  React.useEffect(() => {
    if (data) {
      if (price[0] <= 0.125) {
        setFilteredProducts(null);
      } else {
        const products = data.products.filter((product) => product.price <= price[0]);
        setFilteredProducts(products);
        setItemOffset(0);
      }
    }
  }, [price]);

  React.useEffect(() => {
    if (data) {
      if (sort === 'best rating') {
        const products = data.products.sort((a, b) => b.score - a.score);
        setFilteredProducts(products);
      } else if (sort === 'most reviewed') {
        const products = data.products.sort((a, b) => b.n_o_reviews - a.n_o_reviews);
        setFilteredProducts(products);
      } else {
        setFilteredProducts(data.products);
      }
      setItemOffset(0);
    }
  }, [sort]);

  console.log(brandSet)

  React.useEffect(() => {
    if (data) {
      if (categorySet.size > 0) {
        let brands: string[] = [];
        for (const category of categorySet) {
          brands = brands.concat(
            categoryRegistry[category as keyof typeof categoryRegistry].brands,
          );
        }
        setBrands([...new Set(brands)]);
        const products = data.products.filter((product) => categorySet.has(product.category));
        setFilteredProducts(products);
      } else {
        setBrands([]);
        setFilteredProducts(null);
      }
      setItemOffset(0);
    }
  }, [categorySet]);

  React.useEffect(() => {
    if (data) {
      if (brandSet.size > 0) {
        const products = data.products.filter((product) => Array.from(brandSet).some((brand) => product.title.toLowerCase().includes(brand.toLowerCase())));
        setFilteredProducts(products);
      } else {
        setFilteredProducts(null);
      }
      setItemOffset(0);
    }
  }, [brandSet]);

  React.useEffect(() => {
    if (data) {
      setBrandSet(new Set(brands));
    }
  }, [brands]);


  console.log(data)

  if (filteredProducts) {
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = filteredProducts.slice(itemOffset, endOffset);

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };
    return currentItems.length > 0 ? (
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8'>
        <Items currentItems={currentItems} />
        <Pagination
          pageCount={pageCount}
          dataLength={filteredProducts.length}
          handlePageClick={handlePageClick}
        />
      </div>
    ) : error ? (
      <div>Error</div>
    ) : isLoading ? (
      <div>Loading</div>
    ) : null;
  }
  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
      <Text variant='2xl/normal/black'>There are no products with that filter.</Text>
    </div>
  );
};

export default ProductList;
