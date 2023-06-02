import { useState } from 'react';
import React from 'react';


function Star({ selected = false, onClick = (f) => f }) {
  return <div className={selected ? "star selected" : "star"} onClick={onClick} />;
}

export default function Rating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);

  const onStarClick = (selected) => {
    setSelectedStars(selected);
  };

  return (
    <>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onClick={() => onStarClick(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
