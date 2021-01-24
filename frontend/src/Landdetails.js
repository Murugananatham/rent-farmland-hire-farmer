import React,{Component} from 'react'
import "./Landdetails.css"
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import RentnHire from "./RentnHire"

class Landdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_land:[],
      columns: [],
      isLoading: false,
      isPaneOpenLeft: false,
      currentPage: 1,
      todosPerPage: 9
     
  }
  this.handleClick = this.handleClick.bind(this);
  }
  selectedid = (e) => {
    let selected_id = e.target.className.split(" ")[1]
    this.props.myProp.map((result) =>{
        if(selected_id == result._id )
        {
          this.setState({selected_land : result,isPaneOpenLeft: true}) 
        }
    })
   // this.setState({username: event.target.value});
  }
  
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
 

  render() {
    const Land_details = this.props.myProp
    const {  currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = Land_details.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((result, index) => {
      
      return <li className="land__li">
         <div className={"results "+result._id} onClick={this.selectedid}>
                   <div class={"itemTableImage "+ result._id}></div>
                   <div className= {"content "+ result._id}>
                       <h3 className="result__place">{result.Place}
                       <span className="result__size">{result.Size}
                         </span>
                       </h3>
                       <label>Products:</label>
                       <h4 id="result__products">{result.Products}</h4>
                       <label>Price:</label>
                       <h4 id="result__price">{result.Price}
                       <span className="approx">approx.,
                         </span></h4>

                   </div>
               </div>
      </li>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Land_details.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        
      
      <div className="land__row">
          <div className="land__details">
            
           <ul className="land__ul">
              {renderTodos}
            </ul>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
      </div>
      <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isPaneOpenLeft}
          title="Rent Farmland & Hire Farmer"
          subtitle="VivasayaVelai.com"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ isPaneOpenLeft: false });
          }}
        >
            <RentnHire selectedLand={this.state.selected_land}></RentnHire>
        </SlidingPane>
       
  </div>
    );
  }
}



export default Landdetails;