import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import ReconfigureProductTab from 'components/ReconfigureProductTab';
import ReconfigureProductHeader from 'components/ReconfigureProductHeader';
import { makeSelectReConfigureProducts, getProductBundle, getReConfigureProductData, getAddOptionState, getActiveTabState, makeSelectLoading, makeSelectError, getSelectErrorMessage, getLanguage, getGlobalQuoteData, getReconfigureQuoteData } from './selectors';
import { loadReConfigureProductsData, saveConfiguredProductsData, deleteProduct, updateProduct, toggleCheckboxChange, toggleAddOptionsState, cancel, continueSave, onFeatureConfigAttrChange } from './actions';
import { changeLocale } from '../LanguageProvider/actions';
import { toggleReconfigureLineStatus } from '../App/actions';
import { tempQuoteId } from '../App/constants';
import { toast } from 'react-toastify';
import { Modal, Button, Glyphicon } from 'react-bootstrap/lib';

export class ReConfigureProducts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: [],
      loading: false,
      dataProd: [
        {
          _id: '596db79f58d3f94623033cd0',
          code: 'Tillman',
          name: 'Bradley',
          description: '',
          unitPrice: '$ 650.325',
          quantity: 14.7428,
        },
        {
          _id: '596db79f34ec0f84605ca6a1',
          code: 'Hernandez',
          name: 'Holman',
          description: '',
          unitPrice: '$ 506.595',
          quantity: 50.8204,
        },
        {
          _id: '596db79f10b858fe71591077',
          code: 'Burch',
          name: 'Collins',
          description: '',
          unitPrice: '$ 563.00',
          quantity: 47.5805,
        },
        {
          _id: '596db79f90613ebdf6dc2b7c',
          code: 'Coleman',
          name: 'Hunter',
          description: '',
          unitPrice: '$ 900.323',
          quantity: 82.5088,
        },
        {
          _id: '596db79f94800616a15f5ed5',
          code: 'Lorene',
          name: 'Brennan',
          description: '',
          quantity: 77.3144,
          unitPrice: '$ 230.653',
        },
      ],
      quoteLine: {},
      reConfigureData: {},
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.saveProducts = this.saveProducts.bind(this);
    this.cancelReconfiguration = this.cancelReconfiguration.bind(this);
    this.onFeatureConfigRadioValueChange = this.onFeatureConfigRadioValueChange.bind(this);
    this.onQuoteLineRadioValueChange = this.onQuoteLineRadioValueChange.bind(this);
    this.onQuoteLineCheckboxValueChange = this.onQuoteLineCheckboxValueChange.bind(this);
    this.onQuoteLineTextValueChange = this.onQuoteLineTextValueChange.bind(this);
    this.onFeatureConfigTextValueChange = this.onFeatureConfigTextValueChange.bind(this);
    this.onFeatureConfigCheckBoxValueChange = this.onFeatureConfigCheckBoxValueChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.fromAddOption) {
      const quote = this.props.quote.toJS();
      this.props.getProductsData(quote);
    } else {
      this.props.toggleAddOptionsState(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const reconfigureQuote = nextProps.reconfigureQuote;
    if (reconfigureQuote && reconfigureQuote.lines && reconfigureQuote.lines.length > 0) {
      reconfigureQuote.lines.forEach((quoteLineItem, index) => {
        if (quoteLineItem.canReconfigure) {
          const tempQuoteLine = reconfigureQuote.lines[index];
          this.setState({
            quoteLine: tempQuoteLine,
          });
        }
      }, this);
    }
  }

  validateConfigAttribute() {
    let result = true;
    _.forEach(this.state.quoteLine.configAttribute, (configAttr) => {
      if (configAttr.isRequired) {
        const isSelected = _.find(configAttr.values, { isSelected: true });
        if (!isSelected) {
          toast.error(<p>No value selected for '{configAttr.name}'</p>, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false,
          });
          result = false;
          return false;
        }
      }
    });
    return result;
  }

  onFeatureConfigCheckBoxValueChange(configAttribute, isCategory, categoryId, featureId, selectedValue, isSelected) {
    const data = this.props.reConfigureProductData.toJS();
    if (isCategory) {
      const categories = data.categories;
      const foundCategory = _.find(categories, { id: categoryId });
      const foundFeature = _.find(foundCategory.features, { id: featureId });
      const foundConfigAttr = _.find(foundFeature.configAttribute, { id: configAttribute.id });
      const foundCheckbox = _.find(foundConfigAttr.values, { value: selectedValue });
      foundCheckbox.isSelected = isSelected;
      console.log('Data', data);
      this.props.onFeatureConfigAttrChange(data);
    } else {
      console.log('configData', data);
      console.log('features', data.features);
    }
  }

  onFeatureConfigTextValueChange(configAttribute, isCategory, categoryId, featureId) {
    const data = this.props.reConfigureProductData.toJS();
    if (isCategory) {
      const categories = data.categories;
      const foundCategory = _.find(categories, { id: categoryId });
      const foundFeature = _.find(foundCategory.features, { id: featureId });
      const foundConfigAttr = _.find(foundFeature.configAttribute, { id: configAttribute.id });
      foundConfigAttr.values = configAttribute.values;
      foundConfigAttr.value = configAttribute.value;
      this.props.onFeatureConfigAttrChange(data);
    } else {
      console.log('configData', data);
      console.log('features', data.features);
    }
  }

  onQuoteLineTextValueChange(configAttribute, value) {
    const quoteLine = this.state.quoteLine;
    const foundConfig = _.find(quoteLine.configAttribute, { id: configAttribute.id });
    foundConfig.values = [{ id: '', value, isSelected: true }];
    this.setState({ quoteLine });
  }

  onQuoteLineCheckboxValueChange(configAttribute, value, selectedValue) {
    const quoteLine = this.state.quoteLine;
    const foundConfig = _.find(quoteLine.configAttribute, { id: configAttribute.id });
    const foundCheckbox = _.find(foundConfig.values, { value });
    foundCheckbox.isSelected = selectedValue;
    this.setState({ quoteLine });
  }

  onQuoteLineRadioValueChange(configAttribute, selectedValue) {
    const quoteLine = this.state.quoteLine;
    const foundConfig = _.find(quoteLine.configAttribute, { id: configAttribute.id });
    _.forEach(foundConfig.values, (value) => {
      value.isSelected = false;
    });
    const foundItem = _.find(foundConfig.values, { value: selectedValue });
    foundItem.isSelected = true;
    this.setState({ quoteLine });
  }

  onFeatureConfigRadioValueChange(configAttribute, isCategory, categoryId, featureId) {
    const data = this.props.reConfigureProductData.toJS();
    if (isCategory) {
      const categories = data.categories;
      const foundCategory = _.find(categories, { id: categoryId });
      const foundFeature = _.find(foundCategory.features, { id: featureId });
      const foundConfigAttr = _.find(foundFeature.configAttribute, { id: configAttribute.id });
      foundConfigAttr.values = configAttribute.values;
      console.log('foundConfigAttr.values', foundConfigAttr.values);
      this.props.onFeatureConfigAttrChange(data);
    } else {
      console.log('configData', data);
      console.log('features', data.features);
    }
  }

  saveProducts() {
    if (!this.validateConfigAttribute()) {
      return;
    }
    const updatedQuote = this.props.reconfigureQuote;
    const updatedProducts = [];
    const intialProductBundleData = this.props.productBundleData.toJS();
    const updatedProductBundleData = this.props.reConfigureProductData.toJS();
    if (updatedProductBundleData.categories.length > 0) {
      updatedProductBundleData.categories.forEach((category) => {
        category.features.forEach((feature) => {
          feature.products.forEach((currrentProduct) => {
            const product = currrentProduct;
            if (product.tempId) {
              product.id = product.tempId;
            }
            if (category.name === 'Other') {
              product.categoryId = null;
            }
            if (feature.name === 'Other Options') {
              product.featureId = null;
            }
            updatedProducts.push(product);
          }, this);
        }, this);
      }, this);
    } else if (updatedProductBundleData.features.length > 0) {
      updatedProductBundleData.features.forEach((feature) => {
        feature.products.forEach((currrentProduct) => {
          const product = currrentProduct;
          if (product.tempId) {
            product.id = product.tempId;
          }
          if (feature.name === 'Other Options') {
            product.featureId = null;
          }
          updatedProducts.push(product);
        }, this);
      }, this);
    }

    intialProductBundleData.products = [];
    intialProductBundleData.products = updatedProducts;

    const quoteProductData = {
      quote: updatedQuote,
      productBundle: intialProductBundleData,
    };
    console.log('quoteProductData', quoteProductData);
    // this.props.saveConfiguredProducts(quoteProductData, this.props.location.query);
  }

  toggleSidebar() {
    this
      .props
      .toggleFilter(!this.props.showFilter);
    this.forceUpdate();
  }
  cancelReconfiguration() {
    const quote = this.props.quote.toJS();
    const line = _.find(quote.lines, { reconfigured: true });
    if (line) {
      const reconfigureObj = {
        id: line.id,
        reconfigured: false,
      };
      this.props.toggleReconfigureLineStatus(reconfigureObj);
    }
    if (this.props.location.query.groupId !== null && this.props.location.query.groupId !== undefined && this.props.location.query.mainTab !== undefined && this.props.location.query.tab !== undefined) {
      browserHistory.push(`/EditQuote?groupId=${this.props.location.query.groupId}&mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else if ((this.props.location.query.groupId === null || this.props.location.query.groupId === undefined) && this.props.location.query.mainTab !== undefined) {
      browserHistory.push(`/EditQuote?mainTab=${this.props.location.query.mainTab}&tab=${this.props.location.query.tab}`);
    } else {
      browserHistory.push('/EditQuote');
    }
  }

  toggleCheckboxChange(productObj) {
    this.props.toggleCheckboxChange(productObj);
  }

  render() {
    const reconfigurationData = this.props.reConfigureProductData.toJS();
    const quote = this.props.quote.toJS();
    const params = {
      bundleId: reconfigurationData.productBundleId,
      quoteName: quote.name,
      priceBookId: quote.priceBookId,
      quoteId: reconfigurationData.productBundleQuoteId,
      bundleLineId: reconfigurationData.quoteLineId,
      groupId: reconfigurationData.groupId,
    };
    const style = this.props.loading ? { display: 'inline' } : { display: 'none' };
    if (this.props.loading) {
      return (<div className="loader" style={style}></div>);
    }
    return (
      <div>
        <Modal
          show={this.props.error} onHide={this.props.cancel} style={{ width: '50%' }}
          autoFocus keyboard
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: 'center' }}><Glyphicon glyph="warning-sign" /> Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: 'center', fontSize: '18px' }}>
            {this.props.errorMsg}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.cancel} >Cancel</Button>
            <Button bsStyle="primary" onClick={this.props.cancel} >Continue</Button>
          </Modal.Footer>
        </Modal>
        <div
          style={{
            zIndex: '9999999',
          }}
        >
          <ReconfigureProductHeader
            showFilter={this.props.showFilter}
            toggleFilter={this.toggleSidebar}
            data={this.state.dataProd}
            saveProducts={this.saveProducts}
            quoteName={params.quoteName}
            language={this.props.language}
            languageChange={this.props.changeLocale}
            cancelReconfiguration={this.cancelReconfiguration}
          />
          <ReconfigureProductTab
            reConfigureData={this.props.reConfigureProductData.toJS()}
            dataProd={this.state.dataProd}
            products={this.props.dataProd}
            showFilter={this.props.showFilter}
            toggleSidebar={this.toggleSidebar}
            toggleCheckboxChange={this.toggleCheckboxChange}
            addProductsWait={this.addProductsWait}
            checkAll={this.state.checkAll}
            toggleCheckAll={this.checkAll}
            deleteProduct={this.props.deleteProduct}
            updateField={this.props.updateField}
            params={params}
            quoteLine={this.state.quoteLine}
            toggleAddOptionsState={this.props.toggleAddOptionsState}
            activeTab={this.props.activeTab}
            currency={quote.currency}
            onFeatureConfigRadioValueChange={this.onFeatureConfigRadioValueChange}
            onFeatureConfigTextValueChange={this.onFeatureConfigTextValueChange}
            onFeatureConfigCheckBoxValueChange={this.onFeatureConfigCheckBoxValueChange}
            onQuoteLineRadioValueChange={this.onQuoteLineRadioValueChange}
            onQuoteLineCheckboxValueChange={this.onQuoteLineCheckboxValueChange}
            onQuoteLineTextValueChange={this.onQuoteLineTextValueChange}
          />
        </div>
      </div>
    );
  }
}

ReConfigureProducts.propTypes = {
  toggleFilter: PropTypes.func,
  showFilter: PropTypes.any,
  dataProd: PropTypes.any,
  reConfigureProductData: PropTypes.any,
  productBundleData: PropTypes.any,
  getProductsData: PropTypes.func,
  saveConfiguredProducts: PropTypes.func,
  onFeatureConfigAttrChange: PropTypes.func,
  deleteProduct: PropTypes.func,
  location: PropTypes.any,
  updateField: PropTypes.func,
  toggleCheckboxChange: PropTypes.func,
  fromAddOption: PropTypes.any,
  toggleAddOptionsState: PropTypes.any,
  activeTab: PropTypes.any,
  loading: PropTypes.any,
  language: PropTypes.any,
  changeLocale: PropTypes.any,
  quote: PropTypes.any,
  reconfigureQuote: PropTypes.any,
  toggleReconfigureLineStatus: PropTypes.any,
  error: React.PropTypes.any,
  cancel: React.PropTypes.any,
  continue: React.PropTypes.any,
  errorMsg: React.PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  ReConfigureProducts: makeSelectReConfigureProducts(),
  productBundleData: getProductBundle(),
  reConfigureProductData: getReConfigureProductData(),
  fromAddOption: getAddOptionState(),
  activeTab: getActiveTabState(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  language: getLanguage(),
  quote: getGlobalQuoteData(),
  reconfigureQuote: getReconfigureQuoteData(),
  errorMsg: getSelectErrorMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsData: (data) => {
      dispatch(loadReConfigureProductsData(data));
    },
    saveConfiguredProducts: (data, locationQuery) => {
      dispatch(saveConfiguredProductsData(data, locationQuery));
    },
    deleteProduct: (product) => {
      dispatch(deleteProduct(product));
    },
    updateField: (productObj) => {
      dispatch(updateProduct(productObj));
    },
    toggleCheckboxChange: (productObj) => {
      dispatch(toggleCheckboxChange(productObj));
    },
    toggleAddOptionsState: (fromAddOption, activeTab) => {
      dispatch(toggleAddOptionsState(fromAddOption, activeTab));
    },
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
    onFeatureConfigAttrChange: (data) => {
      dispatch(onFeatureConfigAttrChange(data));
    },
    toggleReconfigureLineStatus: (reconfigureObj) => {
      dispatch(toggleReconfigureLineStatus(reconfigureObj));
    },
    cancel: () => {
      dispatch(cancel());
    },
    continue: () => {
      dispatch(continueSave());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReConfigureProducts);
