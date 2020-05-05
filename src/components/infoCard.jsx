import React from 'react';

const InfoCard = (props) => {
  let style = 'card text-white text-center bg-';
  style += props.cardStyle;

  return (
    <div className="col-sm-8 offset-sm-2 col-md-4 offset-md-1 mt-3">
      <div className={style}>
        <div className="card-body">
          <p className="card-text">{props.title}</p>
          <p className="font-weight-bold">{props.value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
