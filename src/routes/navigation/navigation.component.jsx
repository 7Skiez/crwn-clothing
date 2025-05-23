import { Fragment } from "react"
import { Outlet, Link } from "react-router-dom"

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'

const Navigation = () => (
  <Fragment>
    <div className="navigation">
      <Link className="logo-container" to="/">
        {/* <div className="logo">Logo</div> */}
        <CrwnLogo className="logo"/>
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          Shop
        </Link>
        <Link className="nav-link" to="/sign-in">
          SignIn
        </Link>
      </div>
    </div>
    <Outlet />
  </Fragment>
)

export default Navigation
