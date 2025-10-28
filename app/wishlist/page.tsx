"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./WishlistPage.module.css";
import { useWishlist } from ".././store/wishlist"
import { useCart } from "../components/store/cart";

export default function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const remove = useWishlist((s) => s.remove);
  const clear = useWishlist((s) => s.clear);
  const add = useCart((s) => s.add);

  if (!items.length) {
    return (
      <div className={styles.empty}>
        אין מועדפים עדיין. <Link href="/" style={{ textDecoration: "underline" }}>חזרה לחנות</Link>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Wishlist</h1>
      <div className={styles.grid}>
        {items.map((x) => (
          <div key={x.id} className={styles.card}>
            <div className={styles.thumb}>
              <Image src={x.image} alt={x.title} fill sizes="(max-width:768px) 50vw, 20vw" style={{ objectFit: "contain" }} />
            </div>
            <div className={styles.title}>{x.title}</div>
            <div className={styles.row}>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => add({ id: x.id, title: x.title, price: x.price, image: x.image }, 1)}
              >
                Add to cart
              </button>
              <button className={styles.btn} onClick={() => remove(x.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <button className={styles.btn} onClick={clear}>נקה מועדפים</button>
      </div>
    </div>
  );
}
