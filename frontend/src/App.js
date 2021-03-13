
import React, { useState,useEffect } from 'react';
import Landdetails from "./Landdetails"
import Filters from './Filters';
import Select from 'react-select';
import api from './api/index.js';
import SlidingPane from "react-sliding-pane";
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';

function App() {

  const [isPaneOpenRight, setisPaneOpenRight] = useState(false);
  const [Land_details, setLand_details] = useState([]);
  const [size, setsize] = useState(0);
  const [feature, setfeature] = useState([]);
  const [feature_selected, setfeature_selected] = useState([]);
  const [budget_value, setbudget_value] = useState([10000,50000000]);
  const [prod_final, setprod_final] = useState([]);
  const places = []
  let checker = (arr, target) => target.every(v => arr.includes(v));
  
  const getdefault = {
    size: size,
    feature_selected:feature_selected,
    prod_final:prod_final,
    budget_value:budget_value,
  }
  

  useEffect(() =>{
  async function fetchData(){
  const request = await api.getAllDetails();
  setLand_details(request.data.data)
  return request
}
fetchData();
}, []);
let result_row = []
    let useproduct = []
    let budget_value_min = budget_value[0]
      let budget_value_max = budget_value[1]
      
    result_row = Land_details.filter(result => result.Size.split(" ")[0] > parseInt(size) && checker(result.Features[0].split(","), feature) && checker(result.Products[0].split(","), prod_final) && budget_value_min <= result.TotalBudget && budget_value_max >= result.TotalBudget)
     
   let handleParentData = (formModel) => {
    setsize(formModel.size)
    setfeature(formModel.feature_selected)
    setprod_final(formModel.prod_final)
    setbudget_value(formModel.budget_value)
    setisPaneOpenRight(false)
  }
  
  return (
    
    <div className="App">
    <div className="filter_location">
      <div class="places">
          <label for="location_option">Location</label>
          <div class="location_option">
              <Select options={places} placeholder="Select Location"/>
          </div>
           <FilterListSharpIcon onClick={() => setisPaneOpenRight(true)}>
        Click me for filters
      </FilterListSharpIcon>
      </div>
  </div>
  <Landdetails myProp={result_row}></Landdetails>
  
  <SlidingPane
      closeIcon={<div>Filters</div>}
      isOpen={isPaneOpenRight}
      from="right"
      width="357px"
      onRequestClose={() => setisPaneOpenRight(false)}
    >
   <Filters handleData={handleParentData} defaultValues={getdefault}/> 
    </SlidingPane>
</div>
  );
}

export default App;
