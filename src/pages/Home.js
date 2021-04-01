import AduanList from "../components/AduanList";
import React from "react"
import Navbar from "../components/Navbar"
import { base_url, pengaduan_image_url } from "../config.js";
import $ from "jquery"
import axios from "axios"

export default class Pengaduan extends React.Component {
    constructor() {
        super()
        this.state = {
            pengaduans: [],
            token: "",
            action: "",
            id_pengaduan: "",
            tgl_pengaduan: "",
            nik: "",
            isi_laporan: "",
            image: "",
            status: "",
            pelapor: "",
            uploadFile: true,
            // fillNik: true

            
        }

        if (localStorage.getItem("tokenmasyarakat")) {
            this.state.token = localStorage.getItem("tokenmasyarakat")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
        

    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    

    getPengaduans = () => {
        let masyarakat = JSON.parse(localStorage.getItem('masyarakat'))
        let url = base_url + "/pengaduan/detail/" + masyarakat.nik
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pengaduans: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    componentDidMount() {
        this.getPengaduans()
        this.initMasyarakat()
    }

    Add = () => {
        $("#modal_pengaduan").modal("show")
        this.setState({
            action: "insert",
            id_pengaduan: "",
            nik: this.state.masyarakatID,
            pelapor: this.state.masyarakatName,
            isi_laporan: "",
            image: "",
            status: "dalam antrian",
            uploadFile: true,
            // fillNik: true
        })
    }

    savePengaduan = event => {
        event.preventDefault()
        $("#modal_pengaduan").modal("hide")
        let form = new FormData()
        form.append("id_pengaduan", this.state.id_pengaduan)
        form.append("pelapor", this.state.pelapor)
        form.append("nik", this.state.nik)
        form.append("isi_laporan", this.state.isi_laporan)
        form.append("status", this.state.status)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/pengaduan"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduans()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduans()
            })
            .catch(error => console.log(error))
        }
    }


    EditPeng = selectedItem => {
        $("#modal_pengaduan").modal("show")
        this.setState({
            action: "update",
            id_pengaduan: selectedItem.id_pengaduan,
            nik: selectedItem.nik,
            pelapor: selectedItem.pelapor,
            isi_laporan: selectedItem.isi_laporan,
            image: null,
            status: selectedItem.status,
            uploadFile: false,
            // fillNik: false
        })
    }

    dropPengaduan = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/pengaduan/" + selectedItem.id_pengaduan
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduans()
            })
            .catch(error => console.log(error))
        }
    }

    initMasyarakat = () => {
        if(localStorage.getItem("masyarakat") !== null){
            let masyarakat = JSON.parse(localStorage.getItem("masyarakat"))
            this.setState({
                masyarakatID: masyarakat.nik,
                masyarakatName: masyarakat.name
            })
        } 
    }

    convertTime = createdAt => {
        let date = new Date(createdAt)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container " style={{height: "400px"}} >
                    <h1 className="text-center" style={{marginTop: "120px"}}>Layanan Aspirasi dan Pengaduan Online Rakyat</h1>
                    <h2 className="text-center mb-5">Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang</h2>
                    <br />
                    <div className="d-flex justify-content-center">
                    <button className="btn btn-success my-2" onClick={() => this.Add()}>
                        Ajukan Pengaduan
                   </button>
                    </div>
                </div>
                <div className="container pb-4" >
                    <h3 className="text-bold text-info mt-2" style={{paddingTop: "15px", paddingBottom: "5px"}}>Riwayat Pengaduan</h3>
                    {/* <div className="row">
                    {this.state.pengaduans.map((item, index) => (
                            <AduanList
                                key={item.id_pengaduan}
                                tgl_pengaduan={item.createdAt}
                                nik={item.nik}
                                isi_laporan={item.isi_laporan}
                                status={item.status}
                                
                                image={pengaduan_image_url + "/" + item.image}
                                onEdit={() => this.EditPeng(item)}
                                onDrop={() => this.dropPengaduan(item)}
                            />
                        ))}
                        
                    </div> */}
                    {this.state.pengaduans.map((item, index) => (
                                 <div className="card col-sm-12 my-2">
                                 {/* <div className="card"> */}
                                     <div className="card-body row" >
                                         {/* menampilkan Gambar / cover */}
                                         <div className="col-sm-3">
                                         <img src={pengaduan_image_url + "/" + item.image} className="img-thumbnail border border-5 border border-black"
                                        height="250" width="250" alt="cant open"></img>
                                         </div>
                 
                                         {/* menampilkan deskripsi */}
                                         <div className="col-sm-7">
                                             <h5 className="text-info">
                                             Isi Aduan : {item.isi_laporan}
                                             </h5>
                                             <h6 className="text-danger">
                                                 Status : {item.status}
                                             </h6>
                                             <h6 className="text-dark">
                                             Tgl Pengaduan : {this.convertTime(item.createdAt)}
                                             </h6>
                                             {item.tanggapan.map((y) =>
                                             <h6 className="text-dark">
                                            Tanggapan : {y.tanggapan}
                                             </h6>
                                             )}
                 
                                             {/* button untuk menambah ke keranjang belanja */}
                                             <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.EditPeng(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                       onClick={() => this.dropPengaduan(item)}>
                                            Hapus
                                        </button>
                                         </div>
                                     </div>
                                 {/* </div> */}
                             </div>
                        ))}

                </div>

                {/* modal customer  */}
                <div className="modal fade" id="modal_pengaduan">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Pengaduan</h4>
                                
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.savePengaduan(ev)}>
                                    Isi Pengaduan
                                     <input type="text" className="form-control mb-1"
                                        value={this.state.isi_laporan}
                                        onChange={ev => this.setState({ isi_laporan: ev.target.value })}
                                        required
                                    />
                                    {this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                            onClick={() => this.setState({ uploadFile: true })}>
                                            Ganti Foto
                                        </button>
                                    ) : (
                                        <div>
                                            Foto
                                            <input type="file" className="form-control mb-1"
                                                onChange={ev => this.setState({ image: ev.target.files[0] })}
                                                required
                                            />
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-block btn-success mt-2">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
