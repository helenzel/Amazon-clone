import React from "react";
import classes from "./Category.module.css";
function Categorycard({ data }) {
  return (
    <div className={classes.category}>
      <a href="">
        <span>
          <h2>{data.category}</h2>
        </span>
        <img src={data.image} alt={data.name} />
        <p className={classes.shop_now}>shop now</p>
      </a>
    </div>
  );
}

export default Categorycard;
