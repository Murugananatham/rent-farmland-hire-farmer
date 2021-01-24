import React, { Component } from 'react';
import "./Filters.css"
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.defaultValues.size,
          feature_selected:this.props.defaultValues.feature_selected,
          feature:[],
          init:true,
          isPaneOpenRight:false,
          budget_value:this.props.defaultValues.budget_value,
          prod_final:this.props.defaultValues.prod_final,
      product:[],
    }
  }
  onselectchange = (e) => {
   
    
    this.state.product.push(e)
    this.state.prod_final = this.state.product[this.state.product.length -1]
   // this.setState({username: event.target.value});
  }

  myChangeHandler = (e) => {
    this.setState({
      size: e.target.value
    });
    //this.props.handleData(this.state)
   // this.setState({username: event.target.value});
  }

  featureChangeHandler = (e) => {
    
   if(this.state.feature_selected.indexOf(e.target.value) != -1)
   this.state.feature_selected.splice(this.state.feature_selected.indexOf(e.target.value), 1)
   else
    this.state.feature_selected.push(e.target.value)
   // this.setState({username: event.target.value});
   console.log("After click")
   console.log(this.state.feature_selected)
   this.setState({
    feature_selected: this.state.feature_selected
  })
  }
  submitForm = (e) => {
    
    this.props.handleData(this.state)
  } 

  

  render() {
    console.log("in filter before")
    console.log(this.props.defaultValues.size) 
    console.log(this.props.defaultValues.prod_final)
    console.log(this.props.defaultValues.budget_value)
    console.log("Selected")
    console.log(this.props.defaultValues.feature_selected)
    const features = ["Feng Shui / Vaastu Compliant", "Maintenance Staff", "Water Storage", "Security Personnel", "Rain Water Harvesting"]
    
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
    
  
    const handleChange = (event, newValue) => {
      this.setState({ budget_value: newValue })
    };
    
    const handlebudgetChange = (event, newValue) => {
      this.setState({ budget_value: newValue })
    };
   
    const { options, selected , budget_value} = this.state;
      const land = [{value:"sq.ft." ,selected:"selected",label:"sq.ft."},{value:"sq.yards",label:"sq.yards"},{value:"sq.m.",label:"sq.m."}]
      const budget = [{value:"1 Lac" ,label:"1 Lac",class:"min"},{value:"30 Lacs",label:"30 Lacs",class:"min"},{value:"60 Lacs",label:"60 Lacs",class:"min"},{value:"100 Lacs",label:"100 Lacs",class:"min"},{value:"120 Lacs",label:"120 Lacs",class:"min"}]
      const budget_max = [{value:"30 Lacs",label:"30 Lacs",class:"max"},{value:"60 Lacs",label:"60 Lacs",class:"max"},{value:"100 Lacs",label:"100 Lacs",class:"max"},{value:"120 Lacs",label:"120 Lacs",class:"max"}]
      
      const products = [
        {id: 1, value: "Foods", isChecked: true},
        {id: 2, value: "Fibres", isChecked: false},
        {id: 3, value: "Fuels", isChecked: false},
        {id: 4, value: "Raw Material", isChecked: false},
      ]
     
      const places = []
      
      
      return (
        
            
        <div className="all__filters">
         <div className="size__filter">
         <label className="size__title">
           <b>Land Size(Minimum)</b>
           </label>
           <input type="text" name="name" placeholder="Size in sq.ft."  defaultValue = {this.props.defaultValues.size} onChange={this.myChangeHandler}></input>
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
      <Multiselect onChange={this.onselectchange} defaultValue={this.props.defaultValues.prod_final}
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
          onChange={handlebudgetChange}
          value={budget_value[0]}
        />
         <input type="text" className="max" readonly="readonly"
          onChange={handlebudgetChange}
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
         if(this.state.feature_selected.includes(result)) {
            return   <div className="feature__div">
               <input type="checkbox" class="feature" checked="true" value={result}  onChange={this.featureChangeHandler}></input>
               <label for="features">{result}</label>
               </div>
               
              }
              else{
               return  <div className="feature__div">
               <input type="checkbox" class="feature"  value={result}  onChange={this.featureChangeHandler}></input>
               <label for="features">{result}</label>
               </div>
            
             }
            })}
     
         </div>
         <div class="bg-primary-button"><div><button className="apply__changes" onClick={this.submitForm}>Apply</button></div></div>
         
        </div>
       
       
      
   )
     
  }
}


export default Filters
