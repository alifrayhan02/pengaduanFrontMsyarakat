import React from "react"
import { Link } from "react-router-dom"
class Navbar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("masyarakat")
        window.location = "/login"
    }
    render() {
        return (
            <div className="navbar navbar-expand-lg bg-dark navbar-dark" style={{paddingRight: "100px",paddingLeft: "100px"}}>
                <a className="navbar-brand">
                    Website Aduan Masyarakat
                    
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                    data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Ajukan Pengaduan
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/pengaduan" className="nav-link">
                                Ajukan Pengaduan
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tanggapan" className="nav-link">
                                Tanggapan
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <button type="button" class="btn btn-danger btn-sm active"></button>
                        </li> */}
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-danger my-2 my-sm-0 btn-sm" type="submit">
                            <Link className="nav-link active text-white" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Navbar;