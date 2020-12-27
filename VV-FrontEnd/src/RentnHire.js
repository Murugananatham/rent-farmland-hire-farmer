import React, { Component } from 'react'
import api from './api/index.js'
import "./RentnHire.css"
import Select from 'react-select'

class RentnHire extends Component {
    onChange = (e) => {
        console.log(this.props.history)
       // this.props.history.push(`/${e.value}`);
      }
    constructor(props) {
        super(props)
        this.state = {
            Land_details: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllDetails().then(Land_details => {
            this.setState({
                Land_details: Land_details.data.data,
                isLoading: false,
            })
        })
    }
    render() {
        const locationArray = []
        const sizeArray = []
        const productArray = []
        const { Land_details, isLoading } = this.state
        console.log('TCL: MoviesList -> render -> movies', Land_details)
       Land_details.map( result => {
            locationArray.push({value:result.location,label:result.location});
            sizeArray.push({value:result.size,label:result.size});
            productArray.push(result.product)
       });
    
      
        return (
            <div>
                <div class="page__header">
                    <h1>Rent Farmland & Hire Farmer</h1>
                    <h2>VivasayaVelai.com</h2>
                </div>
                <div class="page__filter">
                    <div class="land__size">
                        <label for="sqrt_option">Land Size</label>
                        <div class="sqrt_option"><Select onChange={this.onChange} options={sizeArray} placeholder="Select land Size" /></div>
                    </div>
                    <div class="places">
                        <label for="location_option">Location</label>
                        <div class="location_option"><Select options={locationArray} placeholder="Select Location"/></div>
                    </div>
                </div>
                <div class="details">
                    
                    {productArray.map((result) => (
                    <div class="row">
                    {result.map((product) => (
                        <div class="grid-two imageandtext">
                                        <div class="imageandtext image_grid">
                                        <label for="selimg1">
                                        <img src='https://pngimage.net/wp-content/uploads/2018/05/bawang-bombay-png-3.png'  alt="img1"  style={{width:"200px"}} />
                                        </label>
                                        <input type="checkbox" name="selimg" id="selimg1"/>
                                        <div class="caption">
                                            <p class="img__description">
                                            {product}</p>
                                        </div>
                                        </div>
                                    </div>
    
                                 ))}
                                  </div>
                    ))}
                       
                    </div>
            </div>
        )
    }
}

export default RentnHire
