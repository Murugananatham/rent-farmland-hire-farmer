import React, { useState } from 'react'
import api from './api/index.js'
import "./RentnHire.css"
import Select from 'react-select'

function RentnHire(props) {
    //const [selected_land, setselected_land] = useState([]);
    const [product_selected, setproduct_selected] = useState([]);
    
	
    function productChangeHandler(e) {
       let product_picked = e.target.className.split(" ")[0]
        if(product_selected.indexOf(product_picked) != -1)
        product_selected.splice(product_selected.indexOf(product_picked), 1)
        else
        product_selected.push(product_picked)
        // this.setState({username: event.target.value});
    
        
            setproduct_selected(product_selected)
       }
       
		const images = require.context('../public/Picture', true);
        const selected_land = props.selectedLand
        
        //const { selected_land, isLoading } = this.state
        let productArray = selected_land.Products.split(",").map(product => {
            return product.trim()
        })
    

      return (
        <div class="details">
            <h2>{selected_land.Place}</h2>
            
                    <h3>Owner's Name</h3>
                  
                    <label>{selected_land.Place}</label>
                   
                    <h3>Address</h3> 
                    
                    <label>{selected_land.Address}</label>
                   
                    <h3>Products</h3>
           
        <div class="row">
        
        {productArray.map(product =>{
                        let veggi = images(`./${product.toLowerCase()}.png`).default
                        if(product_selected.includes(product)) {
                       return <div class="grid-two imageandtext">
                       
                   
                      
                            <p class="img__description">
                            {product}</p>
                       
                        <img class={product+" caption"}  onClick={(e) => productChangeHandler(e)} src={veggi}  alt="img1"  style={{width:"100px"},{height:"100px"}} />
                           
                            <input type="checkbox" name="selimg" id="selimg1"/>
                       
                        
                    </div>
                        }
                        else {
                           return <div class="grid-two imageandtext">
                              
                                    <p class="img__description">
                                    {product}</p>
                               
                                <img class={product+" non-caption"}   onClick={(e) => productChangeHandler(e)} src={veggi}  alt="img1"  style={{width:"100px"},{height:"100px"}} />
                                
                                <input type="checkbox" name="selimg" id="selimg1"/>
                                
                               
                            </div>
                            }
                        
                        
})}
            </div>
            <div><button className="submit__selected">Proceed</button></div>
        </div>
    )
}
export default RentnHire