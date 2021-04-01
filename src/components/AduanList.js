import React from "react"

export default class AduanList extends React.Component {

    convertTime = tgl_pengaduan => {
        let date = new Date(tgl_pengaduan)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    render() {
        return (

            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt={this.props.name} src={this.props.image}
                            className="img-thumbnail border border-5 border border-black" height="250" width="250" />
                    </div>
                    <div className="col-sm-7" style={{ paddingTop: "20px" }}>
                        {/* description */}
                        <h5 className="text-bold">{this.convertTime(this.props.tgl_pengaduan)}</h5>
                        <h6>Isi Laporan: {this.props.isi_laporan}</h6>
                        <h6>Status: {this.props.status}</h6>
                        
                    </div>
                    <div className="col-sm-2" style={{ paddingTop: "40px" }}>
                        <button className="btn btn-sm btn-primary btn-block"
                            onClick={this.props.onEdit}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger btn-block"
                            onClick={this.props.onDrop}>
                            Hapus
                        </button>
                        
                    </div>
                </div>
            </div>
        )
    }
}
