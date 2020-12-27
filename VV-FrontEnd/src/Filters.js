import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./Filters.css"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import DropdownWrapper from "react-dropdown-wrapper";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
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




function Filters() {

  const handleminValue = newValue => {
    console.log(newValue)
  }
  const handlemaxValue = e => {
    console.log(e);
    setValue([10, e.value.split(" ")[0]])
  }

  const classes = useStyles();
  const [value, setValue] = React.useState([10000, 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handlebudgetChange = (event, newValue) => {
    setValue(newValue);
  };


    const land = [{value:"sq.ft." ,selected:"selected",label:"sq.ft."},{value:"sq.yards",label:"sq.yards"},{value:"sq.m.",label:"sq.m."}]
    const budget = [{value:"1 Lac" ,label:"1 Lac",class:"min"},{value:"30 Lacs",label:"30 Lacs",class:"min"},{value:"60 Lacs",label:"60 Lacs",class:"min"},{value:"100 Lacs",label:"100 Lacs",class:"min"},{value:"120 Lacs",label:"120 Lacs",class:"min"}]
    const budget_max = [{value:"30 Lacs",label:"30 Lacs",class:"max"},{value:"60 Lacs",label:"60 Lacs",class:"max"},{value:"100 Lacs",label:"100 Lacs",class:"max"},{value:"120 Lacs",label:"120 Lacs",class:"max"}]
    const features = [
      {id: 1, value: "Feng Shui / Vaastu Compliant", isChecked: true},
      {id: 2, value: "Maintenance Staff", isChecked: false},
      {id: 3, value: "Water Storage", isChecked: false},
      {id: 4, value: "Security Personnel", isChecked: false},
      {id: 5, value: "Rain Water Harvesting", isChecked: false} 
    ]
    const products = [
      {id: 1, value: "Foods", isChecked: true},
      {id: 2, value: "Fibres", isChecked: false},
      {id: 3, value: "Fuels", isChecked: false},
      {id: 4, value: "Raw Material", isChecked: false},
    ]
    const Foods = [
      {id: 1, value: "Foods", isChecked: true},
      {id: 2, value: "Fibres", isChecked: false},
      {id: 3, value: "Fuels", isChecked: false},
      {id: 4, value: "Raw Material", isChecked: false}
    ]
    const places = []
    

    const fetchData = async () => {
    return await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        data.map(result => {
         
          places.push({value:result.name,label:result.name});
         });
       });}

       
          
    useEffect( () => {fetchData()},[]);
   
    return (
        <div>
            <div className="filter_location">
            <div class="places">
                        <label for="location_option">Location</label>
                        <div class="location_option"><Select options={places} placeholder="Select Location"/></div>
                    </div>
        </div>
         <div className="all__filters">
          <div className="size__filter">
          <label>
            Size:
            </label>
            <input type="text" name="name"></input>
           <div><Select className="selectsize" defaultValue="sq.ft."  placeholder=" "  options={land}/></div>
          
          </div>
          <div className="product__filter">
          <label class="filter__title">
           Products
         </label>
        
          {products.map((result) => (
            <div className="products__div">
               <DropdownWrapper
                closeOnEsc
                onStateChange={console.log}
                wrapperProps={{
                  className: "bg-primary"
                }}
              >
                {({ changeStatus, isShow }) => (
                  <div>
                    <button onClick={() => changeStatus(!isShow)}>
                      {result.value}
                    </button>
                    
                    {isShow && <div> {Foods.map((result) => (
                       <div className="product__checkbox">
                       <input type="checkbox" class="foods" value={result.value}></input>
                       <label for="foods">{result.value}</label>
                     </div>
                    ))}</div>}
                  </div>
                )}
          </DropdownWrapper>
            </div>
          ))}
          </div>
          <div className="budget__filter">
          <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
      Budget(Min-Max)
      </Typography>
      <Slider
        min={10000}
        max={5000000}
        value={value}
        valueLabelFormat={numFormatter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      
     
    </div>
    <span class="inline">
    <input type="text" className="min" readonly="readonly"
        onChange={handlebudgetChange}
        value={value[0]}
      />
       <input type="text" className="max" readonly="readonly"
        onChange={handlebudgetChange}
        value={value[1]}
      />
            </span>
          </div>
          <div className="feature__filter">
         <label class="filter__title">
           Land's Feature
         </label>
          {features.map((result) => (
            <div className="feature__div">
              <input type="checkbox" class="feature" value={result.value}></input>
              <label for="features">{result.value}</label>
            </div>
          ))}
      
          </div>
         </div>
        </div>
        
       
    )
}

export default Filters
