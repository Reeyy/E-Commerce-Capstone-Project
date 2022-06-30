import React from "react";
import Categoryitem from "../category-item/category-item.component";
import "../directory/directory.style.scss";
const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <Categoryitem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
