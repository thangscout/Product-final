import React, { Fragment, Component } from 'react';
import { addCategory, updateInfoCategory } from '../../actions/categories';
import { connect } from 'react-redux';

class CategoriesCreate extends Component {
  state = {
    title: '',
    description: '',
    isUpdate: false
  }

  _handleChangeValue = e => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
    console.log({ e: e.target.value})
  }
  
  _handleSubmitAdd = e => {
    e.preventDefault();
    
    const { title, description } = this.state;
    const { history } = this.props;
    console.log({ history})
    addCategory( title, description, history);
  }

  _handleSubmitUpdate = e => {
    e.preventDefault();
    
    const { history } = this.props;
    const {title, description, categoryID} = this.state;
    updateInfoCategory( categoryID, title, description, history );
  }

  componentDidUpdate(prevProps, prevState){
    const { categoryID } = prevState;
    const { infoCategoryPrepareUpdate} = this.props.categories;

    if(infoCategoryPrepareUpdate && categoryID !== infoCategoryPrepareUpdate._id){
      const { title, description, _id} = infoCategoryPrepareUpdate;
      this.setState({
        title, description, isUpdate: true, categoryID: _id
      })
    }
  }

  render(){
    const { categories: { requestingAddCategory, updatingInfo }} = this.props;
    const { title, description, isUpdate} = this.state;
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
                    value={title}
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
                  <textarea className="form-control" cols={40} name="description" rows={10}
                    value={description || ''}
                    onChange={e => this._handleChangeValue(e)} 
                  />
                </div>
                <div className="form-group">
                  <div>
                    {
                      !isUpdate ?
                      <button className="btn btn-primary " name="submit" type="submit"
                          onClick={ e => this._handleSubmitAdd(e)}
                        >
                          Add
                        {requestingAddCategory ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
                      </button> :
                        <button className="btn btn-primary " name="submit" type="submit"
                          onClick={ e => this._handleSubmitUpdate(e)}
                        >
                          Update
                        {updatingInfo ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
                      </button>
                    }
                    
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