import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CheckoutItem from '../../components/checkout-item/checkout-item'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button'
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors'

import './checkout.style.scss'

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItems.id} cartItem={cartItem} />
    ))}

    <div className="total">
      <span> TOTAL: ${total}</span>
    </div>
    <div className="text-waring">
      *Plece use the following text credit cart foe payment*
      <br />
      4242 4242 4242 4242 - Exp: 01/22 - CVV:123
    </div>
    <StripeCheckoutButton price={total} />
  </div>
)

const mapStateProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
})

export default connect(mapStateProps)(CheckoutPage)
