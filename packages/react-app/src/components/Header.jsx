
import React from "react";
import logo from "../assets/cplogo.png"

// displays a page header

export default function Header() {
  return (
    <nav class="nav">
      <img src={logo} alt="City Passport"class="logo" />
	</nav>
  );
}
