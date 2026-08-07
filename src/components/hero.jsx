import "./Hero.css";

function Hero({ title, subtitle, image }) {
  return (
    <section
      className="page-banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`
      }}
    >
      <div className="banner-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default Hero;