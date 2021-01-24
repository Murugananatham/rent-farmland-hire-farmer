import React, { Component } from 'react';
import Landdetails from "./Landdetails"
import Filters from './Filters';
import "./App.css"
import Select from 'react-select';
import api from './api/index.js';
import SlidingPane from "react-sliding-pane";
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';


export default class App extends Component {
   constructor(props){
      super(props);

      this.state = {
          Land_details: [],
          columns: [],
          feature_selected:[],
          isLoading: false,
          size: 0,
          feature:[],
          budget_value:[10000,50000000],
          prod_final:[],
          isPaneOpenRight: false,
      };
    }

    handleParentData = (formModel) => {
      this.setState({...formModel});
      console.log("formModel==")
      console.log(formModel)
    }
    handleclose = () => {
      this.setState({ isPaneOpenRight: false })
    }

    componentDidMount = async () => {
      this.setState({ isLoading: true })
  
      await api.getAllDetails().then(Land_details => {
          this.setState({
              Land_details: Land_details.data.data,
              isLoading: false
          })
      })
  }
  filteroptions = (e) => {
    this.setState({isPaneOpenRight:true})
  }

  render() {
    const places = []
    let checker = (arr, target) => target.every(v => arr.includes(v));
    let checker_product = (pro1, pro2) => pro2.every(val => pro1.includes(val));
    const { Land_details, isLoading, size, feature, prod_final, budget_value } = this.state

    let result_row = []
    let useproduct = []
    let budget_value_min = budget_value[0]
      let budget_value_max = budget_value[1]
      
    result_row = Land_details.filter(result => result.Size.split(" ")[0] > parseInt(size) && checker(result.Features.split(","), feature) && checker(result.Products.split(", "), prod_final) && budget_value_min <= result.TotalBudget && budget_value_max >= result.TotalBudget)
    
   
     /* if(size || feature || prod_final || budget_value)
     {
      let budget_value_min = budget_value[0]
      let budget_value_max = budget_value[1]
      for(var i=0,j=0;i<Land_details.length;i++)
      {
        if (Land_details[i].Size.split(" ")[0] > parseInt(size) && checker(Land_details[i].Features.split(","), feature) && checker(Land_details[i].Products.split(", "), prod_final) && budget_value_min <= Land_details[i].TotalBudget && budget_value_max >= Land_details[i].TotalBudget)
        
      }
     } 
     else */
     
     
   
    return (
      <div className="App">
        <div className="filter_location">
          <div class="places">
              <label for="location_option">Location</label>
              <div class="location_option">
                  <Select options={places} placeholder="Select Location"/>
              </div>
               <FilterListSharpIcon onClick={this.filteroptions}>
          </FilterListSharpIcon>
          </div>
      </div>
      <Landdetails myProp={result_row}></Landdetails>
      
      <SlidingPane
          closeIcon={<div>FILTERS</div>}
          isOpen={this.state.isPaneOpenRight}
          from="right"
          width="357px"
          onRequestClose={() => this.setState({ isPaneOpenRight: false })}
        >
         <Filters handleData={this.handleParentData} defaultValues={this.state}/>
        </SlidingPane>
    </div>
      
    )
  }
}
