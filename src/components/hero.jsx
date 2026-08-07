import "./hero.css";

function Hero({ title, subtitle, tag }) {

    return (

        <section className="page-hero">

            <div className="page-hero-content">

                <span>{tag}</span>

                <h1>{title}</h1>

                <p>{subtitle}</p>

            </div>

        </section>

    );

}

export default Hero;