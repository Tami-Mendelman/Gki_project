"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../store/cart"; 
import styles from "./CartPopup.module.css";

export default function CartPopup() {
  const items = useCart((state) => state.items);
  const isOpen = useCart((state) => state.popupOpen);
  const closePopup = useCart((state) => state.closePopup);
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);


  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3>העגלה שלי</h3>
          <button className={styles.closeBtn} onClick={closePopup} aria-label="Close popup">✕</button>
        </div>

        <ul className={styles.itemsList}>
          {items.length === 0 ? (
            <li className={styles.empty}>הסל ריק.</li>
          ) : (
            items.map((item) => (
              <li key={item.id} className={styles.item}>
                <Image src={item.image} alt={item.title} width={40} height={40} className={styles.itemImage} />
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemQuantity}>x{item.qty}</span>
                <span className={styles.itemPrice}>₪{(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))
          )}
        </ul>
<div className={styles.total}>
  סה"כ לתשלום: ₪{total.toFixed(2)}
</div>

        <div className={styles.footer}>
          <Link href="/checkout" className={styles.checkoutBtn}>
            CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
}
