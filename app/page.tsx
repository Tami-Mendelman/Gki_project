"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css"; 
import ProductCard from "./components/product/ProductCard";


type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function HomePage() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products?limit=20");
        if (!res.ok) throw new Error("Failed to fetch products");
        const json: Product[] = await res.json();
        if (alive) setData(json);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <p className={styles.status}>טוען מוצרים…</p>;
  if (err) return <p className={styles.error}>שגיאה: {err}</p>;

  return (
    <div className={styles.home}>
      <div className={styles.hero}>   
      </div>

      <h2 className={styles.title}>LATEST PRODUCTS</h2>

      <div className={styles.grid}>
        {data.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
