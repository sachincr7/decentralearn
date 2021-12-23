import React from "react";

const List = ({ courses, children }) => {
  return (
    <section className="mt-12   grid gap-5 md:grid-cols-2  lg:grid-cols-3">
      {courses && courses.map((course) => children(course))}
    </section>
  );
};

export default List;
