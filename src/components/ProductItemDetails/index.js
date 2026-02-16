import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import {addItemToCart} from '../../utils/cart'
import {apiStatusConstants} from '../../utils/constants'

import './index.css'

const ProductItemDetails = props => {
  const {match, history} = props
  const {id} = match.params

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [count, setCount] = useState(1)
  const [productItems, setProductItems] = useState({})

  const getSimilarProducts = useCallback(
    ProductsData =>
      ProductsData.map(similarProduct => ({
        id: similarProduct.id,
        imageUrl: similarProduct.image_url,
        title: similarProduct.title,
        style: similarProduct.style,
        price: similarProduct.price,
        description: similarProduct.description,
        brand: similarProduct.brand,
        totalReviews: similarProduct.total_reviews,
        rating: similarProduct.rating,
        availability: similarProduct.availability,
      })),
    [],
  )

  useEffect(() => {
    const getProductsData = eachData => ({
      id: eachData.id,
      imageUrl: eachData.image_url,
      title: eachData.title,
      price: eachData.price,
      description: eachData.description,
      brand: eachData.brand,
      totalReviews: eachData.total_reviews,
      rating: eachData.rating,
      availability: eachData.availability,
      similarProducts: getSimilarProducts(eachData.similar_products),
    })

    const fetchProductDetails = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/products/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        const updatedData = getProductsData(data)
        setProductItems(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setProductItems({})
        setApiStatus(apiStatusConstants.failure)
      }
    }

    fetchProductDetails()
  }, [id, getSimilarProducts])

  const handleSub = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleAdd = () => {
    setCount(count + 1)
  }

  const handleAddToCart = () => {
    const {id: productId, title, brand, imageUrl, price, rating} = productItems

    if (!productId) {
      return
    }

    addItemToCart({
      id: productId,
      title,
      brand,
      imageUrl,
      price,
      rating,
      quantity: count,
    })
  }

  const handleFailure = () => {
    history.replace('/products')
  }

  const renderProductLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  const renderProductFailureView = () => (
    <div className="product-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="product-failure-icon"
      />
      <h1 className="product-failure-heading">Product Not Found</h1>
      <button
        type="button"
        className="product-failure-btn"
        onClick={handleFailure}
      >
        Continue Shopping
      </button>
    </div>
  )

  const renderProductSuccessView = () => {
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productItems

    return (
      <div className="product-item-details-container">
        <div className="product-item-container">
          <img src={imageUrl} alt="product" className="product-item-img" />
          <div className="product-item-description-container">
            <h1 className="product-item-title">{title}</h1>
            <p className="product-item-price">Rs {price}\-</p>
            <div className="product-item-review-container">
              <span className="rating">
                <p className="product-item-review">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="review-icon"
                />
              </span>
              <p className="total-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="product-item-description">{description}</p>
            <p className="product-item-availability">
              Available:<p className="product-solution">{availability}</p>
            </p>
            <p className="product-item-availability">
              Brand: <p className="product-solution">{brand}</p>
            </p>
            <div className="product-count-container">
              <button
                type="button"
                className="btn"
                onClick={handleSub}
                data-testid="minus"
              >
                <BsDashSquare />
              </button>
              <p className="count-para">{count}</p>
              <button
                type="button"
                className="btn"
                onClick={handleAdd}
                data-testid="plus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button
              className="add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProducts.map(eachProduct => (
            <SimilarProductItem
              key={eachProduct.id}
              productItemDetails={eachProduct}
            />
          ))}
        </ul>
      </div>
    )
  }

  switch (apiStatus) {
    case apiStatusConstants.success:
      return (
        <>
          <Header />
          <div className="test">{renderProductSuccessView()}</div>
        </>
      )
    case apiStatusConstants.failure:
      return (
        <>
          <Header />
          <div className="test">{renderProductFailureView()}</div>
        </>
      )
    case apiStatusConstants.inProgress:
      return (
        <>
          <Header />
          <div className="test">{renderProductLoadingView()}</div>
        </>
      )
    default:
      return null
  }
}

export default ProductItemDetails
