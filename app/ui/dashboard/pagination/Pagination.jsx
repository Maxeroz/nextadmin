"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css";

function Pagination({ count }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;

  const page = parseInt(searchParams.get("page")) || 1; // Преобразуем в число

  const hasPrev = page > 1; // Предыдущая страница существует, если текущая страница больше 1
  const hasNext = ITEM_PER_PAGE * page < count; // Следующая страница существует, если количество элементов на странице меньше общего количества

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
