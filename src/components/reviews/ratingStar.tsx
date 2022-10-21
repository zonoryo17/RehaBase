import { useState } from 'react';
import ReactStars from 'react-stars';

const RatingStar: React.FC = ({ value }: any) => {
  const [rating, setRating] = useState({ value: 0, checked: false });
  return (
    <div>
      <ReactStars count={5} size={30} color2={'#ffd700'} value={value} />
    </div>
  );
};

export default RatingStar;
