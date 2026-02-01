import { Link, Route, Routes } from "react-router-dom"

  const padding = {
    paddingRight: 10
  }

const Navbar = () =>{
    return(
        <nav>
            <Link style={padding} to="/dashboard">Dashboard</Link>
            <Link style={padding} to="/login">Login</Link>
            <Link style={padding} to="/transaction">New Expense</Link>
            <Link style={padding} to="/transaction/list">Transactions Summary</Link>
            <Link style={padding} to="/income">Income</Link>
            <Link style={padding} to="/savings">Savings</Link>
            <Link style={padding} to="/emergencyFund">Emergency Fund</Link> 
            <Link style={padding} to="/about">About</Link>
        </nav>
    )
}

export default Navbar