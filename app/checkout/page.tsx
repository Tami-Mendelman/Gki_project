"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./CheckoutPage.module.css";
import { useCart } from ".././components/store/cart";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.total);

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p>העגלה ריקה.</p>
        <p>
          <Link href="/" style={{ textDecoration: "underline" }}>
            חזרה לחנות
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        {items.map((x) => (
          <div key={x.id} className={styles.item}>
            <div className={styles.thumb}>
              <Image
                src={x.image}
                alt={x.title}
                fill
                sizes="96px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div>
              <div className={styles.title}>{x.title}</div>
              <div className={styles.meta}>
                מחיר ליחידה: ${x.price.toFixed(2)}
              </div>
              <div className={styles.controls}>
                <label>
                  כמות:
                  <input
                    className={styles.qtyInput}
                    type="number"
                    min={1}
                    value={x.qty}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setQty(x.id, Number.isFinite(v) && v > 0 ? v : 1);
                    }}
                  />
                </label>
                <button className={styles.removeBtn} onClick={() => remove(x.id)}>
                  הסרה
                </button>
              </div>
            </div>

            <div className={styles.price}>
              ${(x.price * x.qty).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <aside className={styles.summary}>
        <div className={styles.row}>
          <span>סכום ביניים</span>
          <span>${total().toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span>משלוח</span>
          <span>$0.00</span>
        </div>
        <div className={styles.total}>
          <div className={styles.row}>
            <span>סה״כ לתשלום</span>
            <span>${total().toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.clearBtn} onClick={clear}>נקה עגלה</button>
          <button
            className={styles.checkoutBtn}
            onClick={() => alert("Checkout צד־לקוח בלבד להדגמה 🙂")}
          >
            לתשלום
          </button>
        </div>
      </aside>
    </div>
  );
}
