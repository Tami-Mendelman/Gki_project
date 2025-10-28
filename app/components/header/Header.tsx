"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "../store/cart";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/category/men", label: "Mens" },
  { href: "/category/women", label: "Womens" },
  { href: "/category/jewelery", label: "Jewelery" },
  { href: "/category/electronics", label: "Electronics" },
  { href: "/contact", label: "Contact Us" },
  { href: "/wishlist", label: "Wishlist" },
];

export default function Header() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.frame}>
          
        <Link href="/" className={styles.brand}>
  <img src="/logo2.jpg" alt="SHOP logo" className={styles.logo} />
  <span>SHOP</span>
</Link>


          <nav className={styles.nav}>
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/checkout" className={styles.cart}>
            Cart ({count})
          </Link>
          
        </div>
      </div>
    </header>
  );
}
