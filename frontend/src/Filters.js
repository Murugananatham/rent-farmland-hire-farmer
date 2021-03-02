import React, { useState } from 'react';
import Select from 'react-select';
import "./Filters.css"
// import DropdownWrapper from "react-dropdown-wrapper";
// import BudgetSlider from "./BudgetSlider.js";
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
// import "./BudgetSlider.css"

function Filters(props) {
  const [size, setsize] = useState(props.defaultValues.size);
  const [feature_selected, setfeature_selected] = useState(props.defaultValues.feature_selected);
  const [isPaneOpenRight, setisPaneOpenRight] = useState(false);
  const [budget_value, setbudget_value] = useState(props.defaultValues.budget_value);
  const [prod_final, setprod_final] = useState(props.defaultValues.prod_final);
  const [product, setproduct] = useState([]);
  const features = ["Feng Shui / Vaastu Compliant", "Maintenance Staff", "Water Storage", "Security Personnel", "Rain Water Harvesting"]
  function onselectchange(e){
    product.push(e)
    setprod_final(product[product.length -1])
   // this.setState({username: event.target.value});
  }

  function myChangeHandler(e){
    setsize(e.target.value)
    //props.handleData(this.state)
   // this.setState({username: event.target.value});
  }

  function featureChangeHandler(e){
    
   if(feature_selected.indexOf(e.target.value) != -1)
   feature_selected.splice(feature_selected.indexOf(e.target.value), 1)
   else
    feature_selected.push(e.target.value)
    
   setfeature_selected(feature_selected)
  }
  function numFormatter(num) {
         
    if (num >= 10000 && num < 100000) {
      return Math.floor(num/1000) + " k"; // convert to M for number from > 1 million
    }
     else if (num == 100000) {
      return Math.floor((num / 100000)) + " Lac"; // if value < 1000, nothing to do
    }
    else if (num > 100000) {
      return Math.floor(num / 100000) + " Lacs"; // if value < 1000, nothing to do
    }
  
  }
  const submitForm = (e) => {
    const getchange = {
      size: size,
      feature_selected:feature_selected,
      prod_final:prod_final,
      budget_value:budget_value,
      isPaneOpenRight:false
    }
    props.handleData(getchange)
  } 
  
  const handleChange = (event, newValue) => {
    setbudget_value(newValue)
  };
      
      return (
        
           
        <div className="all__filters">
         <div className="size__filter">
         <label className="size__title">
           <b>Land Size(Minimum)</b>
           </label>
           <input type="text" name="name" placeholder="Size in sq.ft."  defaultValue = {props.defaultValues.size} onChange={(e) => myChangeHandler(e)}></input>
          {/* <div><Select className="selectsize" defaultValue="sq.ft."  placeholder=" "  options={land}/></div> */}
         
         </div>
         <div className="product__filter">
         <label class="product__title">
          <b>Products</b>
        </label>
        <div className="products__div">
      {/*   <MultiSelectnpm 
        options={options}
        value={selected}
        onChange={this.onselectchange}
        labelledBy={"Select"}
      /> */}
      <Multiselect defaultValue={props.defaultValues.prod_final} onChange={(e) => onselectchange(e)}
    data={["Onion","Tomato","Potato","Peanut","Radish","Beetroot","Carrot","Cabbage","Chilli pepper","Ginger","Garlic","Mushroom","Pumpkin"]}
    />
             </div>
         </div>
         <div>
            <div className="budget__filter">
           
        <Typography id="range-slider" gutterBottom>
        <b>Budget(Min-Max)</b>
        </Typography>
        <Slider
          min={10000}
          max={50000000}
          value={budget_value}
          valueLabelFormat={numFormatter}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      <span class="inline">
      <input type="text" className="min" readonly="readonly"
          onChange={handleChange}
          value={budget_value[0]}
        />
         <input type="text" className="max" readonly="readonly"
          onChange={handleChange}
          value={budget_value[1]}
        />
              </span>
            </div>
        </div>
         <div className="feature__filter">
        <label class="filter__title">
          <b>Land's Feature</b>
        </label>
        {features.map((result) => {
          console.log("INSIDE")
          console.log(feature_selected)
          console.log(result)
         if(feature_selected.includes(result)) {
            return   <div className="feature__div">
               <input type="checkbox" class="feature" checked="true" value={result} onChange={(e) => featureChangeHandler(e)} ></input>
               <label for="features">{result}</label>
               </div>
               
              }
              else{
               return  <div className="feature__div">
               <input type="checkbox" class="feature"  value={result} onChange={(e) => featureChangeHandler(e)} ></input>
               <label for="features">{result}</label>
               </div>
            
             }
            })}
     
         </div>
         <div class="bg-primary-button"><div><button className="apply__changes"  onClick={(e) => submitForm(e)} >Apply</button></div></div>
         
        </div>
       
      
   )
     
  
}


export default Filters
