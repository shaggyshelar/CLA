import React from 'react';
import SuggestionProductGrid from 'components/SuggestionProductGrid';
// import styled from 'styled-components';


class SuggestionProductPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const crossSellList = [];
    const accessoryList = [];
    const upSellList = [];
    const substituteList = [];
    let name = '';
    const suggestionsData = this.props.suggestionsData.toJS();
    if (suggestionsData && suggestionsData.productRelatedData) {
      name = suggestionsData.productRelatedData.name;
      suggestionsData.productRelatedData.relatedProducts.forEach((item) => {
        if (item.suggestionType === 'CrossSell') {
          crossSellList.push(item.relatedProduct);
        }
        if (item.suggestionType === 'Accessory') {
          accessoryList.push(item.relatedProduct);
        }
        if (item.suggestionType === 'UpSell') {
          upSellList.push(item.relatedProduct);
        }
        if (item.suggestionType === 'Substitute') {
          substituteList.push(item.relatedProduct);
        }
      }, this);
    }
    return (
      <div className="qoute-container reconfigureContainer">
        <div className="margin-tabs">
          <div className="configureRow row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <span className="categoryLabel">{name}</span>
            </div>
          </div>
        </div>
        <div className="reconfigureDivScroll">
          <div className="group panelMargin reconfigurePanel">
            <div className="group-card">
              <span className="group-header configureGroupHeader">CrossSell</span>
            </div>
            <SuggestionProductGrid
              suggestionsData={crossSellList}
              toggleCheckboxChange={this.props.toggleCheckboxChange}
              updateField={this.props.updateField}
            />
          </div>
          <div className="group panelMargin reconfigurePanel">
            <div className="group-card">
              <span className="group-header configureGroupHeader">Accessory</span>
            </div>
            <SuggestionProductGrid
              suggestionsData={accessoryList}
              toggleCheckboxChange={this.props.toggleCheckboxChange}
              updateField={this.props.updateField}
            />
          </div>
          <div className="group panelMargin reconfigurePanel">
            <div className="group-card">
              <span className="group-header configureGroupHeader">UpSell</span>
            </div>
            <SuggestionProductGrid
              suggestionsData={upSellList}
              toggleCheckboxChange={this.props.toggleCheckboxChange}
              updateField={this.props.updateField}
            />
          </div>
          <div className="group panelMargin reconfigurePanel">
            <div className="group-card">
              <span className="group-header configureGroupHeader">Substitute</span>
            </div>
            <SuggestionProductGrid
              suggestionsData={substituteList}
              toggleCheckboxChange={this.props.toggleCheckboxChange}
              updateField={this.props.updateField}
            />
          </div>
        </div>
      </div>
    );
  }
}

SuggestionProductPanel.propTypes = {
  suggestionsData: React.PropTypes.any,
  toggleCheckboxChange: React.PropTypes.any,
  updateField: React.PropTypes.any,
};

export default SuggestionProductPanel;
