import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/products/${id}`} className="text-deco">
      <li className="product-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title text-deco">{title}</h1>
        <p className="brand text-deco">by {brand}</p>
        <div className="product-details">
          <p className="price text-deco">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating text-deco">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star text-deco"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}
export default ProductCard
