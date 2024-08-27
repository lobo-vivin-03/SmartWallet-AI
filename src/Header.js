import React from 'react'
import '../src/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Header = () => {
  return (
    <div className = "header">
      <img className="header_logo" src="https://zeevector.com/wp-content/uploads/Amazon-Logo-White@zeevector.png" alt="" />
      <div className="header_search">
            <input  className="header_searchInput" type="text" />
            <SearchIcon className="header_searchIcon"/>
      </div>
 
      <div className="header_nav">
            <div className="header_option">
                  <span className="header_optionLineOne">
                        Hello guest
                  </span>
                  <span className="header_optionLineTwo">
                        Sign in
                  </span>
            </div>
                  
            <div className="header_option">
                  <span className="header_optionLineOne">
                        return
                  </span>
                  <span className="header_optionLineTwo">
                        Order
                  </span>
            </div>

            <div className="header_option">
                  <span className="header_optionLineOne">
                        Your
                  </span>
                  <span className="header_optionLineTwo">
                        Prime
                  </span>
            </div>

            <div className="header_optionBasket">
                  <ShoppingBasketIcon/>
                  <span className="header_optionLineTwo header_basketCount">0</span>
            </div>

      </div>

    </div>
  )
}

export default Header