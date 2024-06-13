// Write your code here

import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'

import SimilarProducts from '../SimilarProductItem'
import './index.css'

const objofswitch = {
  intial: 'INTIAL',
  failure: 'FAILURE',
  inprogress: 'INPRO',
  complete: 'COM',
}

class ProductItemDetails extends Component {
  state = {appactive: objofswitch.intial, productItem: {}, count: 1}

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({appactive: objofswitch.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/products/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const upadatedobj = {
        id: data.id,
        imgUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        availability: data.availability,
        rating: data.rating,
        similarProducts: data.similar_products.map(each => {
          const similar = {
            id: each.id,
            imgUrl: each.image_url,
            title: each.title,
            price: each.price,
            description: each.description,
            brand: each.brand,
            totalReviews: each.total_reviews,
            rating: each.rating,
            availability: each.availability,
          }
          return similar
        }),
      }
      this.setState({appactive: objofswitch.complete, productItem: upadatedobj})
    } else {
      this.setState({appactive: objofswitch.failure})
    }
  }

  renderProductLoading = () => (
    <div className="products-loader-containera" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickIncremnt = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  onClikDecremnt = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prev => ({count: prev.count - 1}))
    }
  }

  renderProductComplete = () => {
    const {productItem, count} = this.state
    const {
      imgUrl,
      rating,
      title,
      description,
      brand,
      totalReviews,
      availability,
      price,
      similarProducts,
    } = productItem
    return (
      <div className="responsive-pro1">
        <div className="responsive-pro">
          <img src={imgUrl} alt="product" className="img-pro" />
          <div className="heading-conatiner">
            <h1 className="heading-title">{title}</h1>
            <p className="priceTag">Rs {price}/-</p>
            <div className="rating-con1">
              <div className="rating-con">
                <p className="rating-para">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="totalreviews">{totalReviews} Reviews</p>
            </div>
            <p className="para-description">{description}</p>
            <p className="available-set">Available: {availability}</p>
            <p className="available-set">Brand: {brand}</p>

            <hr className="separate" />
            <div className="incremnt-con">
              <button
                type="button"
                className="but-incri"
                data-testid=" plus"
                aria-label="Increment count"
                onClick={this.onClickIncremnt}
              >
                <BsPlusSquare />
              </button>
              <p className="count-incri">{count}</p>
              <button
                type="button"
                className="but-decri"
                data-testid="minus"
                aria-label="decremnt count"
                onClick={this.onClikDecremnt}
              >
                <BsDashSquare />
              </button>
            </div>
            <button type="button" className="add-tocart-but">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-hed">Similar Products</h1>
        <ul className="similar-container">
          {similarProducts.map(each => (
            <SimilarProducts item={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductFailure = () => (
    <div className="products-error-view-container1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="products-failure-img1"
      />
      <h1 className="product-failure-heading-text1">Product Not Found</h1>
      <Link to="/Products">
        <button type="button" className="createbut">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductDetails = () => {
    const {appactive} = this.state
    switch (appactive) {
      case objofswitch.failure:
        return this.renderProductFailure()
      case objofswitch.inprogress:
        return this.renderProductLoading()
      case objofswitch.complete:
        return this.renderProductComplete()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="pro-container">
        <Header />
        {this.renderProductDetails()}
      </div>
    )
  }
}
export default ProductItemDetails
