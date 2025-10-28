"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "../../components/product/ProductCard";

type Product = {
  id: number; title: string; price: number; description: string; category: string; image: string;
};

const SLUG_TO_API: Record<string, string> = {
  men: "men's clothing",
  women: "women's clothing",
  jewelery: "jewelery",
  electronics: "electronics",
};

export default function CategoryPage() {
  const params = useParams<{ name: string }>();
  const slug = params?.name?.toString() ?? "";
  const apiCategory = useMemo(() => SLUG_TO_API[slug] ?? "", [slug]);

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!apiCategory) throw new Error("Unknown category");
        setLoading(true);
        const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(apiCategory)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch category");
        const json: Product[] = await res.json();
        if (alive) setData(json);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [apiCategory]);

  if (!apiCategory) return <p style={{ color: "crimson" }}>קטגוריה לא מוכרת.</p>;
  if (loading) return <p>Loading category…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        Category: {apiCategory}
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {data.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
