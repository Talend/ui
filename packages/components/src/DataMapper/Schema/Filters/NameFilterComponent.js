import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterBar from '../../../FilterBar';

export default class NameFilterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { docked: true };
    this.onToggle = this.onToggle.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  onToggle() {
    this.props.filter.setActive(false);
    this.props.filter.setName(null);
    this.setState(prevState => ({
      docked: !prevState.docked,
    }));
    if (!this.state.docked) {
      this.props.onFilterChange(this.props.filter);
    }
  }

  onFilter(ev, value) {
    this.props.filter.setActive(value);
    this.props.filter.setName(value);
    this.props.onFilterChange(this.props.filter);
  }

  render() {
    return (
      <FilterBar
        id="filter-schema"
        className="filter"
        placeholder="Filter..."
        dockable
        docked={this.state.docked}
        navbar
        onToggle={this.onToggle}
        onFilter={this.onFilter}
      />
    );
  }
}

NameFilterComponent.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
};
