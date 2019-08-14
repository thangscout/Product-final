import React, { Fragment, Component } from 'react';

class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalRecords: '',
      pageLimit: '',
      totalPages: '',
      currentPage: '',
      initialPage: '',
      pagesToShow: ''
    };
  }

  componentDidMount(){
    const { totalRecords, pageLimit, initialPage, pagesToShow} = this.props;
    this.setState({
      totalRecords: totalRecords,
      pageLimit: pageLimit || 10,
      totalPages: Math.ceil(totalRecords / pageLimit),
      pagesToShow: pagesToShow || 5,
      currentPage: initialPage || 1
    })
  }

  componentDidUpdate(prevProps, prevState){
    const { totalRecords, pageLimit, currentPage} = this.state;
    if(
      totalRecords !== prevState.totalRecords ||
      pageLimit !== prevState.pageLimit
    ){
      this.setPage(currentPage)
    }
  }

  setPage(page){
    let { totalRecords, pageLimit, totalPages } = this.state;
    let { onChangePage } = this.props;

    if(page < 1 ){
      page = 1;
    }else if(page > totalPages){
      page = totalPages;
    }

    this.setState({
      currentPage: page
    })

    let startIndex = (page - 1) * pageLimit;
    let endIndex = Math.min(startIndex + pageLimit - 1, totalRecords -1);

    onChangePage({
      pageLimit,
      totalPages,
      page,
      startIndex,
      endIndex
    });
  }

  getPager(){
    let { pagesToShow, currentPage, totalPages } = this.state;
    let pages = [], startFromNumber;

    if(totalPages <= pagesToShow){
      startFromNumber = 1;
      pagesToShow = totalPages;
    }else{
      if(currentPage <= Math.ceil(pagesToShow / 2)){
        startFromNumber = 1;
      }else if( currentPage + Math.floor((pagesToShow - 1) / 2) >= totalPages){
        startFromNumber = totalPages - ( pagesToShow - 1);
      }else{
        startFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }
    for(let i = 1; i <= pagesToShow; i++){
      pages.push(startFromNumber++);
    }

    return {
      currentPage,
      totalPages,
      pages
    }
  }

  render(){
    const { totalRecords, totalPages } = this.state;
    if(!totalRecords || totalPages === 1) return null;

    let pager = this.getPager();

    return(
      <Fragment>
        <ul className="pagination">
          <li className={pager.currentPage === 1 ? 'page-item disabled': 'page-item'}>
            <button
              className="page-link"
              onClick={()=> this.setPage(pager.currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {
            pager.pages.map((page, index) => (
              <li key={index} className={pager.currentPage === page ? 'page-item active': 'page-item'}>
                <button 
                  className="page-link"
                  onClick={() => this.setPage(page)}
                >
                  {page}
                </button>
              </li>
            ))
          }
          <li className={pager.currentPage === pager.totalPages ? 'page-item disabled': 'page-item'}>
            <button 
              className="page-link"
              onClick={()=> this.setPage(pager.currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default Pagination;