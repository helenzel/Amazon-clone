import React from "react";
import { categoryinfo } from "./Categoryfullinfo";
import Categorycard from "./categorycard";
import classes from "./Category.module.css";
function Category() {
  return (
    <div className={classes.category_container}>
      {categoryinfo.map((infos, index) => (
        <Categorycard key={index} data={infos} />
      ))}
    </div>
  );
}

export default Category;
