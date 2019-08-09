import React, { Fragment, Component } from 'react';
import { connect }  from 'react-redux';
import { getCategories } from '../../actions/categories';
import { Link } from 'react-router-dom';

class Categories extends Component {
  componentDidMount = async () => {
    getCategories();
  }

  render(){
    const { categories: { listCategories }} = this.props;
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
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>    
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>{category.products}</td>
                    <td>
                      <button type="button" className="btn btn-danger">Xóa</button>
                    </td>
                  </tr>
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