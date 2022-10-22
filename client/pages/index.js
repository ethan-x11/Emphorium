import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import "../public/arrowgif.gif";
import { FaGithub } from "react-icons/fa";
import StoreContext from "../context/store-context";
import MedusaLogo from "../public/mylogo.PNG";
import field from "../public/fieldSvg.svg";
import styles from "../styles/landing-page.module.css";
import store from "../styles/store.module.css";
import footer from "../styles/footer.module.css";
import { createClient } from "../utils/client";
import { formatPrices } from "../utils/prices";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <h1 style={{ margin: 0}}>Emporium</h1>
            {/* <h1 style={{ margin: 0 }}>+</h1>
            <h1 style={{ margin: 0 }}>Next.js starter</h1> */}
          </div>
          <div className={styles.links}>
            <a
              href="https://docs.medusajs.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
              style={{ background: "#43D7FE", color: "#333" }}
            >
              Read the docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/ethan-x11/Medusa-eComm-App"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
            >
              GitHub Code
              <FaGithub />
            </a>
          </div>
          <p className={styles.description} style={{color: "white"}}>
            Emporium, an eComm App made with <b>NextJS</b>; the best developer experience with all the features
            you need for production:<i> hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more</i> paired with <b>Medusa</b>; <i>a composable engine</i>
            that combines an amazing developer experience with <i>endless customizations</i> for merchants to scale.

          </p>
        </div>
        <div className={styles.scrollIcon}>
          <Link href="#storeSection" scroll={true} passHref>
            <img src="/arrowgif.gif" alt="scroll down" width="100" height="100"></img>
          </Link>
        </div>
        {/* <div className={styles.canvas}>
          <Image src={field} alt="field" layout="responsive"></Image>
        </div> */}
        <section id="storeSection" className={store.container}>
          <h1 className={store.title}>Our Catalogue</h1>
          <div className={store.products}>
            <div className={store.grid}>
              {products &&
                products.map((p) => {
                  return (
                    <div key={p.id} className={store.card}>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: p.id },
                        }}
                        passHref
                      >
                        <a target="_blank">
                          <h2>{p.title}</h2>
                          <div className={store.imgHolder}>
                            <Image
                              src={p.thumbnail}
                              alt="thumbnail"
                              width={250}
                              height={300}
                            ></Image>
                          </div>
                          <p>{p.description}</p>
                          <p className={store.price} style={{ color: "#8a4af3" }}>
                            {formatPrices(cart, p.variants[0])}
                          </p>
                        </a>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <footer className={footer.container}>
        <div className={footer.main}>
          <div className={footer.listA}>
            <Link href="/">
              <a style={{ width: "125px" }}>
                <Image src={MedusaLogo} height="100%" width="100%" alt="logo" />
              </a>
            </Link>
            <span>© 2022 Team Cynogen - All Rights Reserved</span>
            <span>
              Catch us on{" "}
              <Link href="mailto:sugatobagchi@dsec.in">
                <a style={{ fontWeight: "bold" }}>sugatobagchi@dsec.in</a>
              </Link>
            </span>
          </div>
          <div className={footer.listA}>
          </div>
          <div className={footer.listA}>
          </div>
          <div className={footer.listA}>
            <h4>Docs</h4>
            <li>
              <Link href="https://docs.medusajs.com/tutorial/set-up-your-development-environment/">
                <a target="_blank">SetUp</a>
              </Link>
            </li>
          </div>
          <div className={footer.listA}>
            <h4>More</h4>
            <li>
              <Link href="https://medusajs.com/">
                <a target="_blank">Medusa Home</a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/ethan-x11/Medusa-eComm-App">
                <a target="_blank">GitHub Repo</a>
              </Link>
            </li>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
