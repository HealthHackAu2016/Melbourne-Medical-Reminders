import React from 'react';

export default class PatientForm extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: {},
      photo: ''
    }
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  // Preview selected image
  handleFileChange(event) {
    console.log(event);
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        photo: e.target.result
      });
    }

    reader.readAsDataURL(this.refs['photo-upload'].files[0]);
  }

  render() {
    return (
      <div>
        <h2>{this.props.params.patientId ? 'Edit' : 'Add'} Patient</h2>
        <form>
          <div className='row'>
            <div className='col-sm-8'>
              <div className='form-group'>
                <label>Patient name</label>
                <input type='text' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Date of Birth</label>
                <input type='date' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Scale</label>
                <input type='number' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Phone no</label>
                <input type='text' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Emergency contact name</label>
                <input type='text' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Emergency contact phone no.</label>
                <input type='text' className='form-control' />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='form-group'>
                <label>Photo</label>
                <input type='file' ref='photo-upload' onChange={this.handleFileChange} className='form-control' accept='image/*' />
              </div>
              <div id='photo-preview'>
                <img className='img-responsive' src={this.state.photo} alt='upload preview' />
              </div>
            </div>
          </div>
          <div>
            <button type='submit' className='btn btn-success'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
