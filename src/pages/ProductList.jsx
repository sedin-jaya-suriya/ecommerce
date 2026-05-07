// Displays all products from Redux store.
// Handles search, filter, and infinite scrolling logic.

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setFilteredItems, loadMore } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function ProductList() {
  const dispatch = useDispatch();

  const { items, displayedItems, filteredItems, status } = useSelector((s) => s.products);
  const { search, category, view } = useSelector((s) => s.ui);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = items
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === "all" ? true : p.category === category));
    dispatch(setFilteredItems(filtered));
  }, [items, search, category, dispatch]);

  const hasMore = displayedItems.length < filteredItems.length;

  const handleLoadMore = useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  const sentinelRef = useInfiniteScroll(handleLoadMore, hasMore);

  if (status === "loading") return <div style={{ padding: 20 }}>Loading products...</div>;

  if (!displayedItems || displayedItems.length === 0)
    return <div style={{ padding: 20 }}>No products found.</div>;

  return (
    <>
      <div className={view === "grid" ? "grid" : "list"}>
        {displayedItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} style={{ height: "1px", margin: "0" }} />
      )}

      <p style={{ textAlign: "center", padding: "16px", color: "#888" }}>
        {hasMore ? "Loading more products..." : "All products loaded"}
      </p>
    </>
  );
}