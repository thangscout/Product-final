import React, { Fragment, Component } from 'react';
import { connect }  from 'react-redux';
import { getCategories, removeCategory, getInfoCategory } from '../../actions/categories';
import { Link } from 'react-router-dom';
import CategoriesDetail from './Categories-detail';

class Categories extends Component {
  componentDidMount = async () => {
    getCategories();
  }

  _handleRemoveCategory = categoryID => {
    removeCategory(categoryID);
  }

  _handleGetInfoPrepareUpdate = categoryID => {
    getInfoCategory(categoryID);
  }

  render(){
    const { categories: { listCategories, requestingRemoveCategory, requestingGetInfoCategory }} = this.props;
    // console.log({ _: listCategories})
    return(
      <Fragment>
        <div className="container-fluid">
          <h2>Categories</h2>
          <Link to="/dashboard/categories/create" className="btn btn-primary mb-3">New</Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Products</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                listCategories && listCategories.length > 0 && listCategories.map((category, index)=> (
                  <CategoriesDetail 
                    category={category}
                    key={index}
                    index={index}
                    _handleRemoveCategory={this._handleRemoveCategory}
                    requestingRemoveCategory={requestingRemoveCategory}
                    _handleGetInfoPrepareUpdate={this._handleGetInfoPrepareUpdate}
                    requestingGetInfoCategory={requestingGetInfoCategory}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});
export default connect(mapStateToProps, null)(Categories);