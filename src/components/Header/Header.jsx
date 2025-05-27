import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import { SlLocationPin } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
function Header() {
 const{state,dispatch} =useContext(DataContext);
 const basket=state.basket
 const totalItem=basket?.reduce((amount,item)=>{
  return item.amount + amount
 },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/*logo section */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon log"
              />
            </Link>
            <div className={classes.delivery}>
              {/* delivery */}
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <IoIosSearch size={25} />
          </div>
          {/* right side link */}
          <div className={classes.order_container}>
            <Link to="#" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png?20250221172329"
                alt="USA Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to="/auth">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
