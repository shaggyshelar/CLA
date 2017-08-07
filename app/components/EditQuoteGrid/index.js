import ReactTable from 'react-table';
import React, { PropTypes } from 'react';
import { Modal, Button, Glyphicon, Col, Row, FormControl, Tooltip, OverlayTrigger, Table } from 'react-bootstrap/lib';
import 'react-table/react-table.css';
class EditQuoteGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      tableOptions: {
        loading: false,
        showPagination: false,
        showPageSizeOptions: false,
        showPageJump: false,
        collapseOnSortingChange: false,
        collapseOnPageChange: true,
        collapseOnDataChange: true,
        filterable: false,
        sortable: true,
        resizable: true,
        pivot: true,
        expander: true,
        freezeWhenExpanded: true,

      },
      data: this.props.data,
      isModalOpen: false,
    };
    this.setTableOption = this.setTableOption.bind(this);
    this.cloneLine = this.cloneLine.bind(this);
    this.renderActionItems = this.renderActionItems.bind(this);
    this.deleteLine = this.deleteLine.bind(this);
  }

  setTableOption(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      tableOptions: {
        ...this.state.tableOptions,
        [name]: value,
      },
    });
  }

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  cloneLine(index) {
    const data = this.props.data.get('lines').toJS();
    data.splice(index, 0, data[index]);
    this.props.cloneLine(data);
  }
  deleteLine(index) {
    const data = this.props.data.get('lines').toJS();
    data.splice(index, 1);
    this.props.deleteLine(data);
  }
  renderEditable(cellInfo) {
    if (cellInfo.original[cellInfo.column.id].isEditable === false) {
      return (<span>{cellInfo.value}</span>);
    } else {
      return (<div>
        <Glyphicon glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
        <div
          style={{ backgroundColor: '#fafafa', marginLeft: '20px' }} contentEditable suppressContentEditableWarning onBlur={(e) => {
          }}
        >{cellInfo.value}</div>
      </div>);
    }
  }
  renderActionItems(cellInfo) {
    const discount = cellInfo.original.canShowDiscountScheduler ? <a><Glyphicon glyph="calendar" onClick={this.handleToggle} /></a> : '';
    const reconfigure = cellInfo.original.canReconfigure ? <a><Glyphicon glyph="wrench" /></a> : '';
    const bundle = cellInfo.original.isBundled ? <a><Glyphicon glyph="info-sign" /></a> : '';
    return (
      <div className="actionItems" >
        <a><Glyphicon glyph="star-empty" /></a>
        {discount}
        {reconfigure}
        {bundle}
        <a><Glyphicon glyph="duplicate" onClick={this.cloneLine.bind(this, cellInfo.index)} /></a>
        <a><Glyphicon glyph="trash" onClick={this.deleteLine.bind(this, cellInfo.index)} /></a>
      </div>
    );
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip" bsClass="tooltip"><strong>Specifiy the discount unit: Amount or Percent</strong></Tooltip>
    );
    const columns = [
      {
        columns: [{

          Header: '',
          style: { textAlign: 'left' },
          sortable: false,
          Cell: this.renderActionItems,
        },
          {
            Header: <input type="checkbox" className="checkAll" onChange={this.props.toggleAllCheckBox} />,
            accessor: '_id',
            id: '_id',
            sortable: false,
            width: 50,
            style: { textAlign: 'center' },
            Cell: (props) => <input type="checkbox" className="check" onChange={this.props.toggleQuoteCheckbox} value={props.value} />,
          },
          {
            Header: '#',
            sortable: false,
            width: 50,
            Cell: ({ index }) => <span>{index + 1}</span>,

          }, {
            Header: 'PRODUCT CODE',
            accessor: 'code',
          },

          {
            Header: 'PRODUCT NAME',
            accessor: 'name',
          },
          {
            Header: 'QUANTITY',
            accessor: 'quantity.value',
            id: 'quantity',
            style: { textAlign: 'right' },
            Cell: this.renderEditable,

          },
          {
            Header: 'LIST UNIT PRICE',
            id: 'netUnitPrice',
            style: { textAlign: 'right' },
            Cell: (props) => props.isEditable ? this.renderEditable : <span>{props.value}</span>,
          },
          {
            Header: 'ADDITIONAL DISC.',
            accessor: 'additionalDiscount.value',
            id: 'additionalDiscount',
            style: { textAlign: 'right' },
            Cell: (props) => props.isEditable ? this.renderEditable : <span>{props.value}</span>,
          },
          {
            Header: 'MARKUP',
            accessor: 'markup',
            style: { textAlign: 'right' },
            Cell: (props) => props.isEditable ? this.renderEditable : <span>{props.value}</span>,
          },
          {
            Header: 'NET UNIT PRICE',
            accessor: 'netUnitPrice',
            style: { textAlign: 'right' },
            Cell: (props) => props.isEditable ? this.renderEditable : <span>{props.value}</span>,
          },
          {
            Header: 'NET TOTAL',
            accessor: 'totalPrice',
            style: { textAlign: 'right' },
          },
        ],
      }];
    return (
      <div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            data={this.props.data.get('lines').toJS()}
            columns={columns}
            defaultPageSize={this.props.data.get('lines').toJS().length}
            pageSize={this.props.data.get('lines').toJS().length}
            style={{ position: 'fixed', width: '100%' }}
            {...this.state.tableOptions}
            SubComponent={() => (
              <div style={{ paddingLeft: '35px' }}>
                <ReactTable
                  data={this.props.data.get('lines').toJS()}
                  columns={columns}
                  style={{ display: 'inline-table', width: '98%' }}
                  defaultPageSize={3}
                  showPagination={false}
                />
              </div>
            )}
          />
        </div>
        <Modal
          show={this.state.isModalOpen} onHide={this.handleToggle}
          style={{ display: 'inline-flex' }}
        >
          <Modal.Dialog >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: 'center' }}> <Glyphicon glyph="calendar" /> <strong> Discount Schedule Editor </strong></Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col md={6} style={{ textAlign: 'center' }}>
                  <strong>Schedule Name </strong>
                  <FormControl
                    disabled
                    type="text"
                    value={this.state.value ? this.state.value : ''}
                    placeholder="Volume Discount"
                  />
                </Col>
                <Col md={6} style={{ textAlign: 'center' }}>
                  <strong>Schedule Name</strong>
                  <OverlayTrigger placement="top" overlay={tooltip}>
                    <Glyphicon glyph="question-sign" style={{ paddingLeft: '2px', paddingBottom: '2px' }} />
                  </OverlayTrigger>
                  <FormControl componentClass="select" placeholder="Percent" disabled>
                    <option value="select">Percent</option>
                    <option value={this.state.value ? this.state.value : ''}>{this.state.value ? this.state.value : ''}</option>
                  </FormControl>
                </Col>
              </Row>
              <br />
              <Row className="container-modal-table">
                <Table responsive bsClass="modal-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>TIER NAME</th>
                      <th>LOWER BOUND</th>
                      <th>UPPER BOUND</th>
                      <th>DISCOUNT (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Alfreds Futterkiste</td>
                      <td>Maria Anders</td>
                      <td>Germany</td>
                      <td>Canada</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Centro comercial Moctezuma</td>
                      <td>Francisco Chang</td>
                      <td>Mexico</td>
                      <td>Canada</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Ernst Handel</td>
                      <td>Roland Mendel</td>
                      <td>Austria</td>
                      <td>Canada</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Island Trading</td>
                      <td>Helen Bennett</td>
                      <td>UK</td>
                      <td>Canada</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Laughing Bacchus Winecellars</td>
                      <td>Yoshi Tannamuri</td>
                      <td>Canada</td>
                      <td>Canada</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Magazzini Alimentari Riuniti</td>
                      <td>Giovanni Rovelli</td>
                      <td>Italy</td>
                      <td>Italy</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>

            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleToggle} >Cancel</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  }
}

EditQuoteGrid.propTypes = {
  data: PropTypes.any,
  deleteLine: PropTypes.func,
  cloneLine: PropTypes.func,
  toggleAllCheckBox: PropTypes.func,
  toggleQuoteCheckbox: PropTypes.func,
};


export default EditQuoteGrid;
