import classes from './Card.module.css';

export default function Card(props) {
    const cardClasses = classes.card + ' ' + props.className;
  return (
    <div className={cardClasses}>{props.children}</div>
  )
}
