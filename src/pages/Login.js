import React from "react"
import axios from "axios"
import { base_url } from "../config.js";
import { Link } from "react-router-dom"



export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }

    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/masyarakat/auth"


        axios.post(url, sendData)
            .then(response => {
                this.setState({ logged: response.data.logged })
                if (this.state.logged) {
                    let masyarakat = response.data.data
                    let token = response.data.token
                    localStorage.setItem("masyarakat", JSON.stringify(masyarakat))
                    localStorage.setItem("tokenmasyarakat", token)
                    this.props.history.push("/")
                } else {
                    this.setState({ message: response.data.message })
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        const imagecardst = {
            margin: "0px",
            opacity: "0.8"
        }
        const cards = {
            width: "27%",
            height: "100px"
        }
        return (
            <div className="container d-flex h-100 justify-content-center align-items-center" style={cards}>

                <div className=" card my-5 border-light shadow mb-5 bg-white rounded">
                    <img class="card-img-top" style={imagecardst} src="https://images.unsplash.com/photo-1613759880231-6f42c397aac8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" alt="Card image cap" />
                    <div className="card-body">
                        <h2 >Sign In</h2>
                        {/* <h6 >Masyarakat</h6> */}
                        {!this.state.logged ?
                            (
                                <div className="alert alert-danger mt-1">
                                    { this.state.message}
                                </div>
                            ) : null}
                        <form onSubmit={ev => this.Login(ev)}>
                            <h6 className="pt-2">Username</h6>
                            <input type="text" className="form-control mb-1" value={this.state.username}
                                onChange={ev => this.setState({ username: ev.target.value })} required/>
                            <h6>Password</h6>
                            <input type="password" className="form-control mb-1" value={this.state.password}
                                onChange={ev => this.setState({ password: ev.target.value })}
                                autoComplete="false" required/>

                            <p className="text-right mb-0">Don't have an account? <b><Link to="/register">Register</Link></b></p>
                            <button className="btn btn-block btn-primary my-3" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="text-black-50 text-center mb-2">
                    <h7>Website Aduan Masyarakat</h7>
                    <br/>
                    <h7 className="pt-0">Customer</h7>
                </div>
                </div>
                
            </div>
        )

    }

}
