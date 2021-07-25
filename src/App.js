import React, { useEffect } from 'react'
import { GloBalStyle } from './global.style'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import { connect } from 'react-redux'
import Header from './components/header/header'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up'
import CheckoutPage from './pages/checkout/checkout'
import { selectCurrentUser } from './redux/user/user.selectors'
import { checkusersession } from './redux/user/user.actions'

const App = ({ checkusersession, currentUser }) => {
  useEffect(() => {
    checkusersession()
  }, [checkusersession])

  return (
    <div>
      <GloBalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />

        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  )
}

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkusersession: () => dispatch(checkusersession()),
})

export default connect(mapStateProps, mapDispatchToProps)(App)
