"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../store/cart";
import styles from "./CartPopup.module.css";

export default function CartPopup() {
  const isOpen = useCart((state) => state.popupOpen);
  const items = useCart((state) => state.items);
  const closePopup = useCart((state) => state.closePopup);
  const setQty = useCart((state) => state.setQty);
  const total = useCart((state) => state.total);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3 className={styles.title}>Cart</h3>
          <button className={styles.closeBtn} onClick={closePopup}>X</button>
        </div>

        <ul className={styles.itemsList}>
          {items.length === 0 ? (
            <li className={styles.empty}>Your cart is empty.</li>
          ) : (
            items.map((item) => (
              <li key={item.id} className={styles.item}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={40}
                  height={40}
                  className={styles.itemImage}
                />
                <div className={styles.itemText}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.qtyRow}>
                    <span
                      className={styles.qtyBtn}
                      onClick={() => setQty(item.id, Math.max(item.qty - 1, 1))}
                    >
                      -
                    </span>
                    <span className={styles.qtyNum}>{item.qty}</span>
                    <span
                      className={styles.qtyBtn}
                      onClick={() => setQty(item.id, item.qty + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className={styles.footer}>
          <div className={styles.total}>
            <span>Total:</span>
            <span>${total().toFixed(2)}</span>
          </div>
         <Link href="/checkout" className={styles.checkoutBtn} onClick={closePopup}>
  CHECKOUT
</Link>

        </div>
      </div>
    </div>
  );
}
