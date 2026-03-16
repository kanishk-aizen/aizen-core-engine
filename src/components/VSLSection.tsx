import { motion } from "framer-motion";

const VSLSection = () => (
  <section className="section-padding pt-0">
    <div className="container-custom max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden border border-border bg-card"
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://www.loom.com/embed/604921cbfaa34b0e97549d2f4475a94f"
            frameBorder="0"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default VSLSection;
