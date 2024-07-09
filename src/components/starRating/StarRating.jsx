import  { useState } from 'react';
import "./starRating.scss";

// eslint-disable-next-line react/prop-types
const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
            />
            <svg
              className="star-rating_star"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill={ratingValue <= (hover || rating) ? "white" : "white"}
            >
              <path d="M12 .587l3.668 7.571L24 9.748l-6 5.847L19.335 24 12 20.092 4.665 24 6 15.595 0 9.748l8.332-1.59z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;