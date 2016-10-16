import React from 'react';

export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <form className='search-form'
        onSubmit={this.handleSubmit}>
        <div className='input-group'>
          <input type='text'
            className='form-control'
            placeholder='Patient name'
            onChange={this.handleChange} />
          <span className='input-group-btn'>
            <button type='button' className='btn btn-default'>Search</button>
          </span>
        </div>
      </form>
    );
  }
}
