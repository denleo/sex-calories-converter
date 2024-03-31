import "./Card.scss";

export type CardProps = {
  children: string | JSX.Element | JSX.Element[];
};

function Card({ children }: CardProps) {
  return (
    <article className="card">
      <header className="card__header">
        <span className="card__dot card__dot_bg-red"></span>
        <span className="card__dot card__dot_bg-yellow"></span>
        <span className="card__dot card__dot_bg-green"></span>
      </header>
      <section className="card__content">{children}</section>
    </article>
  );
}

export default Card;
