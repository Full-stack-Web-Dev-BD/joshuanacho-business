import Axios from "axios";
import React from "react";

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
    allData: [],
  }
  componentDidMount() {
    Axios.get('/getall')
      .then(res => {
        console.log(res.data);
        this.setState({
          allData: res.data
        })
      })
      .catch(err => {
        return console.log(err);
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
                  <CardTitle tag="h2">All  Data   ({this.state.allData.length}) </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">

                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Brand</th>
                          <th>Category</th>
                          <th>Rating</th>
                          <th>Insert Date</th>
                          <th>Current Price</th>
                          <th>Current Price Date</th>
                          <th>Old Price </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.allData.map(el => {
                            return (
                              <tr>
                                <td>{el.brand}</td>
                                <td>{el.category}</td>
                                <td>{el.rating}</td>
                                <td>{el.insertDate.split('T')[0]}</td>
                                <td>{el.currentPrice}</td>
                                <td>{el.currentPriceDate}</td>
                                <td>{el.oldPrice}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </div>
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
