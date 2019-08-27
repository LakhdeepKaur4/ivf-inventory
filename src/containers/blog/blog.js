import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {getBlog} from '../../actions/blogAction';
import Pagination from 'react-js-pagination';
import HostResolver from '../../components/resolveHost/resolveHost';
import Dashboard from '../../components/dashboard/dashboard';

class Blog extends Component{
    constructor(props){
        super(props);

        this.state={
            activePage: '1',
            limit:'5',
            totalItemsCount:'',
            ids:[],
            host:''
                    
        }
    }

    btnClick=()=>{
        this.setState({checked:true})
        console.log(this.state.checked)

    }
    

    handlePageChange=(pageNumber)=> {
        console.log(`active page is ${pageNumber}`);    
            }

    setHost = async host => {
        await this.setState({ host });
        this.props.getBlog(this.state.host);
            }       
          
    viewBlog=({blog})=>{console.log(blog)
          if(blog){
              return blog.map((item)=>{ 
               return(
                <tr>
                <td scope="row"><input type="checkbox" checked={this.state.checked} onClick={(e)=>this.pickIds(item.id)}/></td>
                <td style={{width:"157px"}} >{item.title}</td>
                <td>{item.author}</td>
                <td>{item.pubes}</td>
              
                <td>
                <div className="dropdown">
                  <button
                    className="btn"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    ...
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton">
                    <a
                      className="dropdown-item">Edit
                    </a>        
                    <a 
                    className="dropdown-item">Delete
                    </a>
                  </div>
                </div></td>
                </tr>
               )
                
              })
          }
    }


    selectAll = (action) => {
        if (action === true) {
            this.setState({ ids: this.state.allIds });
        } else {
            this.setState({ ids: [] });
        }  
    }
    render(){
        
        let tableData=
        <div className="table-responsive card text-dark">
               <table className="table">
                <thead>
                    <tr>
                    <th scope="col"><input type="checkbox" onClick={
                                (e) => {
                                    this.selectAll(e.currentTarget.checked);
                                }
                            } /></th>
                    <th scope="col">TITLE</th>
                    <th scope="col">AUTHOR</th>
                    <th scope="col">PUBES.ON</th>
                    <th scope="col">ACTIONS</th>
                    <th scope="col">...</th>
                    </tr>
                </thead>
                <tbody>
                    {this.viewBlog(this.props.BlogReducer)}                
                </tbody>
                </table>
        </div>
        
        let heading=
          <div style={{color: "#555555"}}> <h5 >BLOG</h5>
            <div className="pt-4">
            <span>&#x2b;<span style={{marginLeft: '5px'}}>Create</span></span>
            <span className="pl-4"><i class="fas fa-cog" aria-hidden="true" style={{marginLeft: '5px'}}></i><span style={{marginLeft: '5px'}}>Blog Settings</span></span>
            <span className="pl-4"><i class="fas fa-eye" aria-hidden="true" style={{marginLeft: '5px'}}></i><span style={{marginLeft: '5px'}}>Vissible</span></span>
            </div>
           </div>

     
  
        
        return(  
             <HostResolver hostToGet="mockup" hostResolved={host => {
            this.setHost(host)
        }}>
        <div>
            <Dashboard>
            
        
           <div>
               {heading}
           </div>
               
           
           <div style={{float: 'right'}}>
           <Pagination activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={this.state.totalItemsCount}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'
                             />
            </div>
           
              <div>
                 {tableData}
              </div>
             
              
      
        </Dashboard>
        </div>
        </HostResolver>
       
        )
    }
}

function mapStateToProps(state){
      
    return{
       BlogReducer: state.BlogReducer      
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getBlog}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Blog);