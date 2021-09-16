// Creating Axios instance

import axios from 'axios';

const instance = axios.create({
    // API endpoint of Firebase database should be /orders.json
    // base URL dùng chung khi post lưu trữ orders & get orders
    baseURL: 'https://my-bakery-e5df0-default-rtdb.firebaseio.com/'
})

export default instance;