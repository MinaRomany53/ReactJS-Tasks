import styles from "./Product.module.css";
import Navbar from "../components/Navbar";

export default function Product() {
  return (
    <main className={styles.product}>
      <Navbar />
      <section className="container">
        <img src="product.svg" alt="product-icon" className={styles.image} />
        <div>
          <h2>About Travelogue.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}
