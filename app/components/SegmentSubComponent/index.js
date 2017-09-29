/**
*
* SegmentSubComponent
*
*/

import React from 'react';
import ReactTable from '../ReactTable';
import { RIENumber, RIESelect } from 'riek';
import { Glyphicon } from 'react-bootstrap/lib';
import messages from './messages';
class SegmentSubComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderColumns = this.renderColumns.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.selectDataChanged = this.selectDataChanged.bind(this);
    this.selectBundleDataChanged = this.selectBundleDataChanged.bind(this);
    this.bundleDataChanged = this.bundleDataChanged.bind(this);
    this.renderDiscount = this.renderDiscount.bind(this);
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
  dataChanged(decimal, data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateSeg(field[1], field[2], field[3], parseFloat(data1).toFixed(decimal) / 1);
  }
  selectDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateSegSelect(field[1], field[2], field[3], data1.id);
  }

  selectBundleDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateSegBundleSelect(field[0], field[1], field[2], field[3], data1.id);
  }
  bundleDataChanged(data) {
    const key = Object.keys(data)[0];
    const field = key.split('*(&)*');
    const data1 = data[key];
    this.props.updateSegBundle(field[0], field[1], field[2], field[3], parseFloat(data1));
  }
  formatt(e, d) {
    return (d.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: e }));
  }
  validate(string) {
    const number = parseFloat(string);
    if (isNaN(number) || !isFinite(number)) return false;
    return !isNaN(number);
  }
  clickEdit(e) {
    e.currentTarget.nextSibling.focus();
  }
  renderDiscount(cellInfo) {
    const col = cellInfo.column.id.split('.')[0];
    const selected = cellInfo.original[col].selectValues;
    const options = [];
    const selectedOption = {};
    selected.map((i) => {
      options.push({ id: i.id, text: i.value });
      if (i.isSelected) {
        selectedOption.id = i.id;
        selectedOption.text = i.value;
      }
      return this;
    });
    if (cellInfo.original[col].isEditable === false) {
      return (<span> {cellInfo.original[col].value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })} {selectedOption.text}</span>);
    }
    return (
      <div>
        <div className="edit-icon" style={{ cursor: 'pointer' }} onClick={this.clickEdit}><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
        <RIENumber
          className={'table-edit-quantity'}
          classEditing="table-edit-input"
          value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original[col].id}*(&)*${col}*(&)*${cellInfo.original.prop}`}
          format={this.formatt.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
          change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
          validate={this.validate}
          classInvalid="invalid"
        />
        <RIESelect
          className={'inline-select'}
          classEditing="inline-select-edit"
          value={selectedOption}
          options={options}
          propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original[col].id}*(&)*${col}*(&)*${cellInfo.original.prop}`}
          change={this.selectDataChanged}
          classInvalid="invalid"
        />

      </div>);
  }
  renderEditable(cellInfo) {
    if (cellInfo.original.editable === false) {
      return (<span> {cellInfo.original.prop === 'quantity' ? '' : this.props.currency} {cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 })}</span>);
    }
    if (cellInfo.original.prop === 'additionalDiscount') {
      return this.renderDiscount(cellInfo);
    }
    const col = cellInfo.column.id.split('.')[0];
    return (
      cellInfo.original.isBundled && (cellInfo.original.prop === 'listPrice') ?
        <span>Included</span>
      :
        <div>
          <div className="edit-icon" style={{ cursor: 'pointer' }} onClick={this.clickEdit}><Glyphicon className="inline-edit" glyph="pencil" style={{ float: 'left', opacity: '.4' }} /></div>
          <RIENumber
            className={cellInfo.original.prop === 'quantity' ? 'table-edit-quantity' : 'table-edit'}
            classEditing="table-edit-input"
            value={parseFloat(cellInfo.value.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2 }).replace(/,/g, ''))}
            propName={`${cellInfo.original.isBundled ? cellInfo.original.parent : ''}*(&)*${cellInfo.original[col].id}*(&)*${col}*(&)*${cellInfo.original.prop}`}
            change={this.dataChanged.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}            validate={this.validate}
            format={this.formatt.bind(this, cellInfo.original.decimalsSupported ? cellInfo.original.decimalsSupported : 2)}
            classInvalid="invalid"
          />
        </div>);
  }
  renderColumns(data) {
    const columns = [
      {
        accessor: 'code',
        style: { textAlign: 'left' },
        width: 35,
      },
      {
        accessor: 'qwe',
        style: { textAlign: 'left', maxWidth: '35px' },
        width: 60,
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
        width: 200,
      },
      {
        accessor: 'prop',
        width: 200,
        sortable: false,
        style: { textAlign: 'left' },
        Cell: (props) => <span><strong> {this.context.intl.formatMessage({ ...messages[props.value] }).replace(/([A-Z])/g, ' $1').toUpperCase()}</strong></span>,
      },
    ];
    data.segmentData.columns.map((i) => {
      if (!i.isDeleted) {
        columns.push({
          accessor: `${i.name}.value`,
          sortable: false,
          style: { textAlign: 'right' },
          Cell: this.renderEditable,
        });
      }
      return this;
    });
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
            dataSet[i].isBundled = data.isBundled;
            dataSet[i].parent = data.parent;
            dataSet[i].decimalsSupported = data.decimalsSupported;
            return this;
          });
          break;
        case 'listPrice':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.listPrice };
            dataSet[i].editable = data.listPrice.isEditable;
            dataSet[i].isBundled = data.isBundled;
            dataSet[i].parent = data.parent;
            dataSet[i].decimalsSupported = data.decimalsSupported;
            return this;
          });
          break;
        case 'uplift':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.uplift };
            dataSet[i].editable = false;
            dataSet[i].isBundled = data.isBundled;
            dataSet[i].parent = data.parent;
            dataSet[i].decimalsSupported = data.decimalsSupported;
            return this;
          });
          break;
        case 'additionalDiscount':
        
          data.segmentData.columns.map((j, index) => {
            dataSet[i][j.name] = { isEditable: j.additionalDiscount.isEditable, id: data.id, value: j.additionalDiscount.value, selectValues: data.segmentData.columns[index].additionalDiscount.selectValues };
            dataSet[i].editable = j.additionalDiscount.isEditable;
            dataSet[i].isBundled = data.isBundled;
            dataSet[i].parent = data.parentLineId;
            dataSet[i].decimalsSupported = data.decimalsSupported;
            dataSet[i].selectValues = data.segmentData.columns[index].additionalDiscount.selectValues;
            return this;
          });
          break;
        case 'netunitPrice':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.netunitPrice };
            dataSet[i].editable = false;
            dataSet[i].isBundled = data.isBundled;
            dataSet[i].parent = data.parent;
            dataSet[i].decimalsSupported = data.decimalsSupported;
            return this;
          });
          break;
        case 'netTotal':
          data.segmentData.columns.map((j) => {
            dataSet[i][j.name] = { id: data.id, value: j.netTotal };
            dataSet[i].editable = false;
            dataSet[i].decimalsSupported = data.decimalsSupported;
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
      <div className="header sub-seg">
        <ReactTable
          className="sub-component"
          data={data.dataSet}
          columns={data.columns}
          defaultPageSize={data.dataSet.length}
          pageSize={data.dataSet.length}
          style={{ width: '100%', height: 'auto !important' }}
          {...this.state.tableOptions}
        />
      </div>
    );
  }
}
SegmentSubComponent.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};
SegmentSubComponent.propTypes = {
  data: React.PropTypes.any,
  updateSeg: React.PropTypes.func,
  updateSegSelect: React.PropTypes.func,
  updateSegBundleSelect: React.PropTypes.func,
  updateSegBundle: React.PropTypes.func,
  currency: React.PropTypes.any,
};

export default SegmentSubComponent;
