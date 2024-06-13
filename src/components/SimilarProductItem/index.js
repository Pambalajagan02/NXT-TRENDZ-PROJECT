// Write your code here
import './index.css'

const SimilarProducts = props => {
  const {item} = props
  const {imgUrl, title, price, brand, rating} = item
  return (
    <li className="similrcon">
      <img
        src={imgUrl}
        alt={`similar product ${title}`}
        className="similar-image"
      />
      <p className="title-para">{title}</p>
      <p className="brand-t">by {brand}</p>
      <div className="pricecon">
        <p className="title-para2">Rs {price}/-</p>
        <div className="ratingcon">
          <p className="rating-des">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProducts
