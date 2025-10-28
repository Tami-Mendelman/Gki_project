"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { useCart } from "../store/cart";
import { useWishlist } from "@/app/store/wishlist"; 


type Product = {
  id: number; title: string; price: number; description: string; category: string; image: string;
};

type Props = { p: Product };

export default function ProductCard({ p }: Props) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const has = useWishlist((s) => s.has)(p.id);

  return (
    
    <div className={styles.card}>
      <Link href={`/product/${p.id}`} className={styles.thumb}>
        <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 50vw, 25vw" style={{ objectFit: "contain" }} />
      </Link>

      <Link href={`/product/${p.id}`} className={styles.title}>{p.title}</Link>
      <div className={styles.desc} title={p.description}>{p.description}</div>
      <div className={styles.meta}><span>Category:</span><strong>{p.category}</strong></div>
      <div className={styles.price}>${p.price.toFixed(2)}</div>

      <div className={styles.actions}>
        <button
          className={styles.btnPrimary}
          onClick={() => add({ id: p.id, title: p.title, price: p.price, image: p.image }, 1)}
        >
          Add to cart
        </button>

        <button
          aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
          className={`${styles.btnWish} ${has ? styles.btnWishActive : ""}`}
          onClick={() => toggle({ id: p.id, title: p.title, price: p.price, image: p.image })}
        >
          {has ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
