import Header from '../Header'
import {getCartItems} from '../../utils/cart'
import './index.css'

const Cart = () => {
  const cartItems = getCartItems()
  const isEmpty = cartItems.length === 0
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <>
      <Header />
      <div className="cart-container">
        {isEmpty ? (
          <div className="cart-empty-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
              alt="cart"
              className="cart-img"
            />
            <p className="cart-empty-text">Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-content">
            <h1 className="cart-heading">My Cart</h1>
            <ul className="cart-items-list">
              {cartItems.map(item => (
                <li className="cart-item" key={item.id}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h1 className="cart-item-title">{item.title}</h1>
                    <p className="cart-item-brand">by {item.brand}</p>
                    <p className="cart-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="cart-item-price">
                    Rs {item.price * item.quantity}/-
                  </p>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <p className="cart-total-label">Order Total:</p>
              <p className="cart-total-amount">Rs {totalAmount}/-</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
