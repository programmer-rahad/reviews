import { useEffect, useState } from "react";
import Review from "./Review";
import Loading from "./Loading";
import "./Reviews.scss";
const url =
  "https://raw.githubusercontent.com/programmer-rahad/json-files/main/reviews.json";
function Reviews() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const reviews = await response.json();
      setLoading(false);
      setReviews(reviews);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } 
  };

  const nextReview = () => {
    setIndex(index === reviews.length - 1 ? 0 : index + 1);
  };

  const prevReview = () => {
    setIndex(!index ? reviews.length - 1 : index - 1);
  };

  const randomReview = () => {
    let randomIndex = Math.floor(Math.random() * reviews.length); 
    
    if(randomIndex === index) {
      let arr = [...Array(reviews.length)];
      arr = arr.map((_,i) => i).filter((_,i) => i !== index);   
      randomIndex = arr[Math.floor(Math.random() * arr.length)];      
    } 

    setIndex(randomIndex)
     
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  
  const review = reviews[index];

  return (
    <> 
      <main>{loading ? <Loading /> : <Review {...review} nextReview={nextReview} prevReview={prevReview} randomReview={randomReview} />}</main>
    </>
  );
}

export default Reviews;
