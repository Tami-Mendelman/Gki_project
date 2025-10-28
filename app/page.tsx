"use client";
import { useEffect, useState } from "react";
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
    return () => { alive = false; };
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        Latest products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {data.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
