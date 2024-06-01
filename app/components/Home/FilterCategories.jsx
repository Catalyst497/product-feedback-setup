import React from "react";

function FilterCategories() {
  const filterCategories = [
    "All",
    "UI",
    "UX",
    "Enhancement",
    "Bug",
    "Feature",
  ];
  return (
    <div className="filter-categories sidebar-item flex flex-wrap gap-4 font-bold ">
      {filterCategories.map((item, i) => (
        <div key={i} className="rounded-lg text-lightblue px-4 py-2 bg-faintblue ">{item}</div>
      ))}
    </div>
  );
}

export default FilterCategories;
