import styles from "./Pricing.module.css";
import Navbar from "../components/Navbar";

export default function Pricing() {
  return (
    <main className={styles.pricing}>
      <Navbar />
      <section className="container">
        <div>
          <h2>Simple pricing (Just $9/month)</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src="Price.svg" alt="pay-icon" className={styles.image} />
      </section>
    </main>
  );
}
