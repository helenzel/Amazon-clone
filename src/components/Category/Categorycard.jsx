import React from "react";
import classes from "./Category.module.css";
import {Link} from "react-router-dom";
function Categorycard({ data }) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.category}</h2>
        </span>
        <img src={data.image} alt={data.name} />
        <p className={classes.shop_now}>shop now</p>
      </Link>
    </div>
  );
}

export default Categorycard;
