import "./Hero.css";

function Hero({ title, subtitle }) {
  return (
    <section className="page-banner">
      <div className="banner-overlay">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default Hero;