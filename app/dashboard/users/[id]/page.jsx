import Image from "next/image";
import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
import { fetchUser } from "@/app/lib/data";

async function SingleUserPage({ params }) {
  const { id } = params;

  const user = await fetchUser(id);

  const { username, email, password, img, isAdmin, isActive, phone } = user;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={img || "/noavatar.png"} alt="" fill />
        </div>
        {username}
      </div>

      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder={username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={phone || ""} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder="New Your" />
          <label>Is Admin?</label>

          <select name="isAdmin" id="isAdmin" defaultValue={isAdmin}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>

          <select name="isActive" id="isActive" defaultValue={isActive}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
}

export default SingleUserPage;
