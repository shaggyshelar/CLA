/**
*
* SegmentSubComponent
*
*/

import React from 'react';
import ReactTable from 'react-table';
import InlineEdit from 'react-edit-inline';
import { Glyphicon } from 'react-bootstrap/lib';
class SegmentSubComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderColumns = this.renderColumns.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.bundleDataChanged = this.bundleDataChanged.bind(this);
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
        resizable: false,
        pivot: true,
        expander: true,
        freezeWhenExpanded: true,
        selectedLine: {},
      },
    };
  }
  dataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    console.log('data', data);
    this.props.updateSeg(field[1], field[2], field[3], parseFloat(data1));
    this.forceUpdate();
  }
  bundleDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    console.log('bundle', data);
    // this.props.updateBundle(field[0], field[1], field[2], parseFloat(data1) );
  }
  validate(text) {
    const decimal = /^([0-9]+(\.[0-9]+)?|Infinity)$/;
    return (decimal.test(text) && (parseFloat(text) > 0));
  }
  renderEditable(cellInfo) {
    if (cellInfo.original.editable === false) {
      return (<span> {this.props.currency} {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}</span>);
    } else {
      console.log(cellInfo);
      const col = cellInfo.column.id.split('.')[0];
      return (<div>
        <InlineEdit
          className="table-edit"
          activeClassName="table-edit-input"
          text={cellInfo.value.toLocaleString('en', { minimumFractionDigits: 2 })}
          paramName={`${cellInfo.original.isProductOption ? cellInfo.original.parent : ''}*(&)*${cellInfo.original[col].id}*(&)*${col}*(&)*${cellInfo.original.prop}`}
          change={cellInfo.original.isProductOption ? this.bundleDataChanged.bind(this) : this.dataChanged}
          validate={this.validate}
        />
        <Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} />
      </div>);
    }
  }
  renderColumns(data) {
    console.log("row", data);
    const columns = [
      {
        accessor: 'code',
        style: { textAlign: 'left' },
        width: 35,
      },
      {
        accessor: 'qwe',
        style: { textAlign: 'left', maxWidth: '35px' },
        width: 150,
      },
      {
        accessor: 'qweeqwe',
        style: { textAlign: 'left', maxWidth: '35px' },
        width: 50,
      },
      {
        accessor: 'name',
        style: { textAlign: 'left' },
        width: 50,
      },
      {
        accessor: 'name',
        style: { textAlign: 'left' },
      },
      {
        accessor: 'prop',
        sortable: false,
        style: { textAlign: 'left' },
        Cell: (props) => <span> {props.value.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
      },
    ];
    data.segmentData.columns.map((i) => (
      columns.push({
        accessor: `${i.name}.value`,
        sortable: false,
        style: { textAlign: 'right' },
        Cell: this.renderEditable,
      })
    ));
    columns.push({
      accessor: 'demo',
      sortable: false,
    });
    const dataSet = [
      {
        prop: 'quantity',
      },
      {
        prop: 'listPrice',
      },
      {
        prop: 'uplift',
      },
      {
        prop: 'additionalDiscount',
      },
      {
        prop: 'netunitPrice',
      },
      {
        prop: 'netTotal',
      },
    ];
    for (let i = 0; i < dataSet.length; i += 1) {
      switch (dataSet[i].prop) {
        case 'quantity':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.quantity };
            dataSet[i].editable = data.quantity.isEditable;
            return this;
          });
          break;
        case 'listPrice':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.listPrice };
            dataSet[i].editable = data.listPrice.isEditable;
            return this;
          });
          break;
        case 'uplift':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.uplift };
            dataSet[i].editable = false;
            return this;
          });
          break;
        case 'additionalDiscount':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.additionalDiscount };
            dataSet[i].editable = data.listPrice.isEditable;
            return this;
          });
          break;
        case 'netunitPrice':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.netunitPrice };
            dataSet[i].editable = false;
            return this;
          });
          break;
        case 'netTotal':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.netTotal };
            dataSet[i].editable = false;
            return this;
          });
          break;
        default:
          return dataSet;
      }
    }


    return { columns, dataSet };
  }
  render() {
    const data = this.renderColumns(this.props.data);
    return (
      <div className="header">
        <ReactTable
          className="sub-component"
          data={data.dataSet}
          columns={data.columns}
          defaultPageSize={data.length}
          pageSize={data.length}
          style={{ width: '100%' }}
          {...this.state.tableOptions}
        />
      </div>
    );
  }
}

SegmentSubComponent.propTypes = {

};

export default SegmentSubComponent;
