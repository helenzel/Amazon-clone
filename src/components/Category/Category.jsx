import React from "react";
import { Categoryinfo } from "./Categoryfullinfo";
import CategoryCard from "./Categorycard";
import classes from "./Category.module.css";
function Category() {
  return (
    <div className={classes.category_container}>
      {Categoryinfo.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </div>
  );
}

export default Category;
