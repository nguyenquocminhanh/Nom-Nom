import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {sortByDate} from '../../../shared/utility';

import classes from './OrderHistory.css';

import Order from './Order/Order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Pagination from '../../../components/Pagination/Pagination';

import axios from '../../../axios/axios-orders';

class OrderHistory extends Component {
    state = {
        isLoading: false,
        confirmationNumbers: null,  // array
        historyOrders: null,         // array
        numberOfOrders: 0,
        nodeIsSelected: 1
    }

    // Find number of Items in 1 order
    numberOfItemsHandler = (order) => {
        let numberOfItem = 0;
        order['order'].forEach (item => {
            numberOfItem = numberOfItem + item.quantity
        });

        return numberOfItem;
    }

    // Generate array of Images in 1 order
    arrayOfItemImagesHandler = (order) => {
        let arrayOfDishes = [];

        order['order'].forEach(item => {
            // for (let i = 0; i < item['quantity']; i++) {
            arrayOfDishes.push({image: this.props.dishes[item['id']].image, label: item['label'], quantity: item['quantity'], id: item['id']})
            // }
        })
        // console.log(arrayOfImages)
        return arrayOfDishes;
    }

    // Pagination

    previousIsClickedHandler = () => {
        if (this.state.nodeIsSelected > 1) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    nodeIsSelected: prevState.nodeIsSelected - 1
                }
            })
        }
        return;
    }

    nextIsClickedHandler = () => {
        if (this.state.nodeIsSelected < Math.ceil(this.state.historyOrders.length/10)) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    nodeIsSelected: prevState.nodeIsSelected + 1
                }
            })
        }
        return;
    }

    nodeIsClickedHandler = node => {
        this.setState({
            nodeIsSelected: node
        })
    }
 
    componentDidMount = () => {
        if (localStorage.getItem('orderHistoryPageNumber')) {
            this.setState({nodeIsSelected: Number(localStorage.getItem('orderHistoryPageNumber'))});
        }

        this.setState({isLoading: true});
        // Only fetch orders belong to the owner users
        const queryParams = '?auth=' + localStorage.getItem('token') + '&orderBy="userId"&equalTo=' + '"' + this.props.userId + '"';

        // ?auth = .. only authentic user can get orders
        axios.get('/orders.json' + queryParams)
            .then(response => {
                // response.data is an object
                this.setState({isLoading: false, historyOrders: Object.values(response.data), confirmationNumbers: Object.keys(response.data), numberOfOrders: Object.values(response.data).length});
                // console.log(Object.values(response.data));
                // console.log();
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.nodeIsSelected !== this.state.nodeIsSelected) {
            localStorage.setItem('orderHistoryPageNumber', this.state.nodeIsSelected);
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    render() {
        // add confirmation to each historyOrders
        let updatedHistoryOrders = [];
        if (this.state.historyOrders && this.state.confirmationNumbers) {
            // sort historyOrder by date
            let cloneHistoryOrders = [...this.state.historyOrders];
            for (let i=this.state.historyOrders.length-1; i>=0; i--) {
                updatedHistoryOrders.push({...sortByDate(cloneHistoryOrders)[i], confirmation: this.state.confirmationNumbers[i].substring(1)})
            }
        }

        // get orders based on nodeIsSelected - 10 orders each node
        let orders = updatedHistoryOrders ? updatedHistoryOrders.slice((this.state.nodeIsSelected - 1) * 10, (this.state.nodeIsSelected - 1) * 10 + 10).map(order => {
            return <Order 
                key={order.confirmation}
                confirm={order.confirmation}
                date={order.date}
                price={order.price}
                numberOfItem={this.numberOfItemsHandler(order)}
                arrayDishes={this.arrayOfItemImagesHandler(order)}
                isPickUp={order.isPickUp}
                fullName={order.shippingInfo.firstName + ' ' + order.shippingInfo.lastName}
                addressLine1={order.shippingInfo.shippingAddress.street + ' ' + order.shippingInfo.shippingAddress.apt}
                addressLine2={order.shippingInfo.shippingAddress.city + ', ' + order.shippingInfo.shippingAddress.state + ' ' + order.shippingInfo.shippingAddress.zipcode}
                phone={order.shippingInfo.phone}
                email={order.shippingInfo.email}
            />
        }) : null;
        
        let spinner = this.state.isLoading ? <Spinner/> : null;

        
        return (
            <div className={classes.OrderHistory}>
                {/* Title */}
                <h2>Your Orders</h2>

                {/* Spinner */}
                {spinner}

                {!this.state.isLoading && this.state.numberOfOrders === 0 ?
                    (<div className={classes.NoOrders}>
                        <span>You haven't had any Orders yet...</span>
                    </div>) :
                    /* Array of History Orders */
                    orders
                }
                
                {/*Pagination */}

                {this.state.historyOrders && this.state.numberOfOrders !== 0 ? 
                    <Pagination
                        numberOfNode={Math.ceil(this.state.numberOfOrders/10)}
                        nodeIsSelected={this.state.nodeIsSelected}
                        nextIsClicked={this.nextIsClickedHandler}
                        previousIsClicked={this.previousIsClickedHandler}
                        nodeIsClicked={this.nodeIsClickedHandler}
                        />: null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.menuBuilder.dishes,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, null)(OrderHistory);