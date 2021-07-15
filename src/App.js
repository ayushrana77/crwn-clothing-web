import React from 'react'
import './App.css'
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

class App extends React.Component {
  unsubscribeFromAuth = null
  componentDidMount() {
    const { checkusersession } = this.props
    checkusersession()
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />

          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}
const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkusersession: () => dispatch(checkusersession()),
})

export default connect(mapStateProps, mapDispatchToProps)(App)
