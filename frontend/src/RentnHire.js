import React, { Component } from 'react'
import "./RentnHire.css"


class RentnHire extends Component {
    onChange = (e) => {
        console.log(this.props.history)
       // this.props.history.push(`/${e.value}`);
      }
    constructor(props) {
        super(props)
        this.state = {
            selected_land:[],
            product_selected:[],
            columns: [],
            isLoading: false,
            selectimg: 'non-caption',
        }
    }

    imgselection = (e) => {
        console.log(e.target.className.split(" "))
        let selected_id = e.target.className.split(" ")[1]
        this.setState({selectimg: "caption"})
    }

    productChangeHandler = (e) => {
        console.log("Selected product "+e.target.className.split(" ")[0])
       let product_picked = e.target.className.split(" ")[0]
        if(this.state.product_selected.indexOf(product_picked) != -1)
        this.state.product_selected.splice(this.state.product_selected.indexOf(product_picked), 1)
        else
         this.state.product_selected.push(product_picked)
        // this.setState({username: event.target.value});
        console.log("After click")
        console.log(this.state.product_selected)
        this.setState({
            product_selected: this.state.product_selected
       })
       }
   
    render() {
        const images = require.context('../public/Picture', true);
        let someVariable = "onion"
        const dog = images(`./${someVariable}.png`).default;
        console.log("Selected from rentnhire")
        console.log(dog)
        
        const selected_land = this.props.selectedLand
        
        //const { selected_land, isLoading } = this.state
        console.log('TCL: MoviesList -> render -> movies', selected_land)
        let productArray = selected_land.Products.split(",").map(product => {
            return product.trim()
        })
    
      console.log(productArray)
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
                            if(this.state.product_selected.includes(product)) {
                           return <div class="grid-two imageandtext">
                           
                       
                          
                                <p class="img__description">
                                {product}</p>
                           
                            <img class={product+" caption"}  onClick={this.productChangeHandler} src={veggi}  alt="img1"  style={{width:"100px"},{height:"100px"}} />
                           
                            <input type="checkbox" name="selimg" id="selimg1"/>
                           
                            
                        </div>
                            }
                            else {
                               return <div class="grid-two imageandtext">
                              
                                    <p class="img__description">
                                    {product}</p>
                               
                                <img class={product+" non-caption"}  onClick={this.productChangeHandler} src={veggi}  alt="img1"  style={{width:"100px"},{height:"100px"}} />
                                
                                <input type="checkbox" name="selimg" id="selimg1"/>
                                
                               
                            </div>
                                }
                            
                            
   })}
                </div>
                <div><button className="submit__selected">Proceed</button></div>
            </div>
        )
    }
}

export default RentnHire