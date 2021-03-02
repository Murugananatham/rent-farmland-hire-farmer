import React,{useState,useEffect} from 'react'
import "./Landdetails.css"
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import RentnHire from "./RentnHire"

function Landdetails(props) {
  const [selected_land, setselected_land] = useState([]);
  const [isPaneOpenLeft, setisPaneOpenLeft] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [todosPerPage, settodosPerPage] = useState(9);

  function selectedid(e)  {
    let selected_id = e.target.className.split(" ")[1]
    props.myProp.map((result) =>{
          if(selected_id == result._id )
          {
            setselected_land(result)
             setisPaneOpenLeft(true)
          }
     
     
    })
  }
  function handleClick(event) {
      setcurrentPage(Number(event.target.id))
  }

const Land_details = props.myProp


// Logic for displaying current todos
const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
const currentTodos = Land_details.slice(indexOfFirstTodo, indexOfLastTodo);

const renderTodos = currentTodos.map((result, index) => {

  return <li className="land__li">
   
      <div className={"results "+result._id} onClick={(e) => selectedid(e)}>
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
   
  </li>

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
      onClick={(e) => handleClick(e)}
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
      isOpen={isPaneOpenLeft}
     
      title="Rent Farmland & Hire Farmer"
      subtitle="VivasayaVelai.com"
      onRequestClose={() => {
        // triggered on "<" on left top click or on outside click
        setisPaneOpenLeft(false)
      }}
    >
        <RentnHire selectedLand={selected_land}></RentnHire> 
    </SlidingPane>
   
</div>
);
}



export default Landdetails;