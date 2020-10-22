import Axios from "axios";
import { resetWarningCache } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

class Tables extends React.Component {
  state = {
    xlData: [],
    status: 'Import From XLSX',
    xllength: 0,
    uploadStatus: 'Upload Data to Database ',
    uploaded: false,
    fileName:''
  }
  fileChangeHandler(e) {
    e.preventDefault()
    this.setState({ status: "Reading XLXS ..." })
    const fData = new FormData()
    fData.append('file', e.target.files[0])
    Axios.post('/import-data-from-xlsx', fData)
      .then(res => {
        console.log(res.data);
        return
        this.setState({
          xlData: res.data.result,
          status: 'Import Another one (insted of this file)',
          xllength: res.data.result.length,
          fileName:res.data.fileName
        })
      })
      .catch(err => {
        return console.log(err);
      })
  }
  uploadData() {
    this.setState({ uploadStatus: 'Uploading ...' })
    Axios.post('/importData',{fileName:this.state.fileName})
    .then(res=>{
      this.setState({
        xlData: [],
        status: "Import From XLSX",
        xllength: 0,
        uploadStatus: 'Upload Data to Database ',
        uploaded: true
      })
    })
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle tag="h2">Read Data From XLSX {this.state.xllength ? ('( Founded   ' + this.state.xllength + ' Transection)') : ''}  </CardTitle>
                </CardHeader>
                <CardBody>
                  {
                    this.state.uploaded ? '' :
                      <div className="text-right">
                        <Button color="primary" size="sm" className="mr-auto" onClick={e => document.getElementById('importxl').click()}> {this.state.status} </Button>
                        <input onChange={e => this.fileChangeHandler(e)} accept=".xlsx" type="file" style={{ display: 'none' }} id="importxl" />
                        {/* <i className="tim-icons icon-attach-87"></i> */}
                      </div>
                  }
                  {
                    this.state.xlData.length > 0 ?
                      <div className="text-center pt-5 pb-5">
                        <div className="upload-zone">
                          <i style={{ fontSize: '100px' }} className="tim-icons icon-cloud-upload-94"></i>
                        </div>
                        <Button color="primary" size="sm" className="mr-auto" onClick={e => this.uploadData()}> {this.state.uploadStatus}</Button>
                      </div>
                      : ''
                  }
                  {
                    this.state.uploaded ?
                      <div className="text-center pt-5 pb-5">
                        <div className="upload-zone">
                          <i style={{ fontSize: '100px' }} className="tim-icons icon-cloud-upload-94"></i>
                        </div>
                        <p className="text-center text-info"><b>Data Uploaded to Database</b></p>
                        <Link to='/admin/dashboard'>
                          <Button color="primary" size="sm" className="mr-auto"> Go to Dashboard </Button>
                        </Link>
                      </div>
                      : ''
                  }
                  {/* <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Rating Count</th>
                        <th>Promotion Price</th>
                        <th>Promotion %</th>
                        <th>Insert Date</th>
                        <th>Current Price</th>
                        <th>Current Price Date</th>
                        <th>Old Price </th>
                        <th>Old Price Date</th>
                        <th>Price Change %</th>
                        <th>Seller Information</th>
                        <th>Url</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                    </tbody>
                  </Table> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default Tables;
