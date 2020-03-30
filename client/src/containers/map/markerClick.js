
import axios from 'axios';


 export function markerClickSalesMonth (storeName)  {
       return axios.post('/api/salesTwoMonthStore', { name : storeName })
       .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
}


 export function markerClickSalesTotal (storeName)  {
       return axios.post('/api/totalSalesStore', { name : storeName })   
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
}


 export function markerClickProduct (storeName)  {
       return axios.post('/api/AllProductRankStore', { name : storeName })   
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
}

 export function markerClickCategory (storeName)  {
       return axios.post('/api/categorySalesStroe', { name : storeName })   
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
}

