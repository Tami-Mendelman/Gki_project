"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "../ProductPage.module.css";
import { useCart } from "../../components/store/cart";
import { useWishlist } from "@/app/store/wishlist"; 

type Product = {
  id: number; title: string; price: number; description: string; category: string; image: string;
};

export default function ProductPage() {
  const { id: idParam } = useParams<{ id: string }>();
  const id = idParam?.toString() ?? "";

  const [p, setP] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const add = useCart((s) => s.add);
  const openPopup = useCart((s) => s.openPopup);
  const toggle = useWishlist((s) => s.toggle);
const has = useWishlist((s) => s.has(Number(id)));



  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const json: Product = await res.json();
        if (alive) setP(json);
      } catch (e: any) {
        if (alive) setErr(e?.message || "Error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (!id) return <p style={{ color: "crimson" }}>Missing product id.</p>;
  if (loading) return <p>Loading product…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
  if (!p) return <p>No product found.</p>;

  return (
    <div className={styles.wrap}>
      <div className={styles.thumb}>
        <Image src={p.image} alt={p.title} fill sizes="(max-width:820px) 90vw, 40vw" style={{ objectFit: "contain" }} />
      </div>

      <div>
        <h1 className={styles.title}>{p.title}</h1>
        <div className={styles.meta}>Category: <strong>{p.category}</strong></div>
        <div className={styles.desc}>{p.description}</div>
        <div className={styles.price}>${p.price.toFixed(2)}</div>

        <div className={styles.actions}>
       <button
  className={styles.btnPrimary}
  onClick={() => {
    add({ id: p.id, title: p.title, price: p.price, image: p.image }, 1);
    openPopup(); 
  }}
>
  Add to cart
</button>
<button
  className={`${styles.btnGhost} ${has ? styles.btnWishActive : ""}`}
  onClick={() => toggle({ id: p.id, title: p.title, price: p.price, image: p.image })}
  aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
  title={has ? "Remove from wishlist" : "Add to wishlist"}
  aria-pressed={has}
>
  {has ? "♥ " : "♡ "}
</button>


          <button className={styles.btnGhost} onClick={() => history.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
