import React, { Fragment, Component } from 'react';
import { addCategory } from '../../actions/categories';
import { connect } from 'react-redux';

class CategoriesCreate extends Component {
  state = {
    title: '',
    description: ''
  }

  _handleChangeValue = e => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
    console.log({ e: e.target.value})
  }
  
  _handleSubmit = e => {
    e.preventDefault();
    
    const { title, description } = this.state;
    const { history } = this.props;
    addCategory( title, description, history);
  }
  render(){
    const { categories: { requestingAddCategory }} = this.props;
    return(
      <Fragment>
        <div className="container-fluid">
        <h2>Categories</h2>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <form method="post">
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="title">
                    Title
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <input className="form-control" name="title" type="text"
                    onChange={e => this._handleChangeValue(e)} 
                  />
                </div>
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="description">
                    Description
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <textarea className="form-control" cols={40} name="description" rows={10} defaultValue={""}
                    onChange={e => this._handleChangeValue(e)} 
                  />
                </div>
                <div className="form-group">
                  <div>
                    <button className="btn btn-primary " name="submit" type="submit"
                      onClick={ e => this._handleSubmit(e)}
                    >
                      Add
                    {requestingAddCategory ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});
export default connect(mapStateToProps, null)(CategoriesCreate);