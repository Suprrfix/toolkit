const DetailField = (props) => {
  return (
    <div className="detail-field mb-4">
      <div className="label uppercase text-xs tracking-wider">
        {props.label}
      </div>
      <div className="value">{props.value}</div>
    </div>
  );
};

export default DetailField;
