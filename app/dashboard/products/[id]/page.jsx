import Image from "next/image";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/data";
import { cloneElement } from "react";

async function SingleProductPage({ params }) {
  const { id } = params;

  const product = await fetchProduct(id);
  const { title, createdAt, desc, price, stock, color, size } = product;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {title}
      </div>

      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={stock} />
          <label>Color</label>
          <input type="text" name="color" placeholder={color} />
          <label>Size</label>
          <textarea type="text" name="size" placeholder={size} />

          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>

          <label>Description</label>
          <textarea
            defaultValue={desc}
            name="desc"
            id="desc"
            rows="10"
            placeholder="description"
          ></textarea>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
}

export default SingleProductPage;
