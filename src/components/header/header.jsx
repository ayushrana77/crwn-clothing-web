import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ReactComponent as Logo } from '../../assets/crown.svg'

import CartIcon from '../card-icon/card-icon'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import CartDropdown from '../cart-dropdown/cart-dropdown'
import { signOutStart } from '../../redux/user/user.actions'

import {
  HeaderContainer,
  LogoContainer,
  OptionsConatiner,
  OpectionDiv,
  OpectionLink,
} from './header.style'

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsConatiner>
      <OpectionLink to="/shop">SHOP</OpectionLink>
      <OpectionLink to="/shop">CONTACT</OpectionLink>
      {currentUser ? (
        <OpectionDiv onClick={signOutStart}>SIGN OUT</OpectionDiv>
      ) : (
        <OpectionLink to="/signin">SIGN IN</OpectionLink>
      )}
      <CartIcon />
    </OptionsConatiner>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
)
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
})
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
