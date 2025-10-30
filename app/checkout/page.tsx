"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./CheckoutPage.module.css";
import { useCart } from "../components/store/cart";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.total);
  const remove = useCart((s) => s.remove);

  const dec = (id: number, curr: number) => setQty(id, Math.max(1, curr - 1));
  const inc = (id: number, curr: number) => setQty(id, curr + 1);

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p>העגלה ריקה.</p>
        <p>
          <Link href="/" className={styles.backLink}>
            חזרה לחנות
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title1}>
        Order <span>Summary</span>
      </h1>

      <div className={styles.list}>
        {items.map((x) => (
          <div key={x.id} className={styles.item}>
            <div className={styles.thumb}>
              <Image
                src={x.image}
                alt={x.title}
                fill
                sizes="180px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div>
              <div className={styles.title}>{x.title}</div>

              <div className={styles.qtyLine}>
                <button
                  aria-label="decrease quantity"
                  className={styles.qtyBtn}
                  onClick={() => dec(x.id, x.qty)}
                >
                  –
                </button>
                <span className={styles.qty}>{x.qty}</span>
                <button
                  aria-label="increase quantity"
                  className={styles.qtyBtn}
                  onClick={() => inc(x.id, x.qty)}
                >
                  +
                </button>
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => remove(x.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <strong>TOTAL:</strong> {total().toFixed(2)} $
        </div>

        <div className={styles.btns}>
          <button onClick={clear} className={styles.clearBtn}>
             Clear Cart
          </button>

          <button
            className={styles.checkoutBtn}
            onClick={() => alert("Checkout צד־לקוח בלבד להדגמה")}
          >
            COMPLETE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
