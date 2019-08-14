import React, { Fragment, Component } from 'react';
import { addProduct, updateInfoProduct } from '../../actions/products';
import { getCategories} from '../../actions/categories';
import { connect } from 'react-redux';
import { URI_FETCH } from '../../constant/index';

class ProductCreate extends Component {

  state = {
    title: '',
    description: '',
    price: '',
    categoryID: '',
    image: null,
    isUpdate: false,
    productID: '',
    nameImage: ''
  }

  _handleChangeValue = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  _handleChangeFile = e => {
    this.setState({
      image: e.target.files[0],
      nameImage: e.target.files[0].name
    })
  }
  
  _handleSubmitAdd = e => {
    e.preventDefault();

    const { title, description, price, image, categoryID } = this.state;
    const {  history } = this.props;
    addProduct(title, description, price, categoryID, image, history);
  }

  _handleSubmitUpdate = e => {
    e.preventDefault();
    const { title, description, price, categoryID, productID, image } = this.state;
    const { history } = this.props;
    updateInfoProduct(productID, title, description, price, categoryID, image, history);
  }

  componentDidUpdate(prevProps, prevState){
    const { productID } = prevState;
    const { infoProductPrepareUpdate } = this.props.products;

    if(infoProductPrepareUpdate && productID !== infoProductPrepareUpdate._id){
      const { title, description, price, categoryID, image, _id } = infoProductPrepareUpdate;
      this.setState({
        title, description, price, categoryID, isUpdate: true, productID: _id, nameImage: image
      })
    }
  }

  componentDidMount = async () => {
    getCategories();
  }

  render(){
    const { categories:{ listCategories} } = this.props;
    const { title, description, price, isUpdate, nameImage} = this.state;
    const { products: { requestingAddProduct, updatingInfo } } = this.props;

    return(
      <Fragment>
        <div className="container-fluid">
          <h2>Products</h2>
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
                    onChange={ e => this._handleChangeValue(e)}
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
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="price">
                    Price
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <input className="form-control" name="price" type="number" 
                    value={price}
                    onChange={ e => this._handleChangeValue(e)}
                  />
                </div>
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="category">
                    Category
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <select className="select form-control"  name="categoryID"
                    onChange={ e => this._handleChangeValue(e)}
                  >
                    {
                      listCategories && listCategories.map((category, index) => (
                        <option value={category._id} key={index}>
                          {category.title}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group ">
                  <label className="control-label " htmlFor="image">
                    Image
                  </label>
                  <div className="row">
                    <div className="col-md-6">
                        
                        <input 
                            name="image" 
                            type="file" 
                            onChange={ e => this._handleChangeFile(e)}/>
                    </div>
                    <div className="col-md-6 d-flex">
                      <img className="ml-auto" 
                      src={!isUpdate ? "https://via.placeholder.com/150" :
                          (nameImage && nameImage.length > 0 ? `${URI_FETCH}/images/products/${nameImage}` : "https://via.placeholder.com/150")
                      }
                      alt="" width={150}/>
                    </div>
                  </div>
                </div>
                
                <div className="form-group mb-5">
                  <div>
                    {!isUpdate ? 
                    <button className="btn btn-primary " name="submit" type="submit"
                      onClick={ e => this._handleSubmitAdd(e)}
                    >
                      Add
                      {requestingAddProduct ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
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
  products: state.products,
  categories: state.categories
});

export default connect(mapStateToProps, null)(ProductCreate);