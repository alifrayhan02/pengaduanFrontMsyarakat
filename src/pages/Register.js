import React from "react"
import axios from "axios"
import { base_url } from "../config.js";
import { Link } from "react-router-dom"

export default class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            nik: "",
            name: "",
            username: "",
            passwprd: "",
            telp: "",
            message: "",
            logged: true
        }

    }

    saveMasyarakat = event => {
        event.preventDefault()
        let form = {
            nik: this.state.nik,
            name: this.state.name,
            username: this.state.username,
            telp: this.state.telp,
            password: this.state.password

        }

        let url = base_url + "/masyarakat"
        axios.post(url, form)
            .then(response => {
                window.alert("Berhasil Register, silahkan login")
                this.props.history.push("/login")
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
                    <img class="card-img-top" style={imagecardst} src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Card image cap" />
                    <div className="card-body">
                        <h2 >Sign Up</h2>
                        {/* <h6 >Masyarakat</h6> */}
                        {!this.state.logged ?
                            (
                                <div className="alert alert-danger mt-1">
                                    { this.state.message}
                                </div>
                            ) : null}
                        <form onSubmit={ev => this.saveMasyarakat(ev)}>
                            <h6 className="pt-2">NIK</h6>
                            <input type="number" className="form-control mb-1" value={this.state.nik}
                                onChange={ev => this.setState({ nik: ev.target.value })} required/>
                                <h6 className="pt-2">Nama</h6>
                            <input type="text" className="form-control mb-1" value={this.state.name}
                                onChange={ev => this.setState({ name: ev.target.value })} required/>
                                <h6>Telephone</h6>
                            <input type="number" className="form-control mb-1" value={this.state.telp}
                                onChange={ev => this.setState({ telp: ev.target.value })}
                                autoComplete="false" required/>
                                <h6>Username</h6>
                            <input type="text" className="form-control mb-1" value={this.state.username}
                                onChange={ev => this.setState({ username: ev.target.value })}
                                autoComplete="false" required/>
                            <h6>Password</h6>
                            <input type="password" className="form-control mb-1" value={this.state.password}
                                onChange={ev => this.setState({ password: ev.target.value })}
                                autoComplete="false" required/>
                            <p className="text-right py-1">Have already an account? <b><Link to="/login">Login</Link></b></p>
                            <button className="btn btn-block btn-primary my-3" type="submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="text-black-50 text-center mb-2">
                    <h7>Website Aduan Masyarakat</h7>
                    <br/>
                    <h7 className="pt-0">Admin</h7>
                </div>
                </div>
                
            </div>
        )

    }

}
