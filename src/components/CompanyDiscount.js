import React from 'react'
import { useState,useEffect} from 'react'
import axios, { } from 'axios'
import '../css/main.css';
import db from "../firebase";
import { collection, getDocs} from "firebase/firestore";

const CompanyDiscount = () => {
//   const purchaseHistory = [
//     {
//     "id":1,
//     "name":"A",
//     "purchaseDate":"2023-05-06T09:00:00.000+09:00",
//     "productCode":"AAAAAABBBB",
//     "productPrice":2000
//     },
//     {
//     "id":1,
//     "name":"A",
//     "purchaseDate":"2023-05-06T09:00:00.000+09:00",
//     "productCode":"AAAAAABBBB",
//     "productPrice":4000
//     },
//     {
//     "id":2,
//     "name":"B",
//     "purchaseDate":"2023-05-06T09:00:00.000+09:00",
//     "productCode":"AAAAAABBBB",
//     "productPrice":4000
//     },
//     {
//       "id":3,
//       "name":"C",
//       "purchaseDate":"2023-05-06T09:00:00.000+09:00",
//       "productCode":"SOfAGG2937",
//       "productPrice":12000
//       }
// ]
//   const [purchaseHistory,setUsers] = useState([]);

//   useEffect(() => {
//   const getUser = async () => {
//     const res = await axios.get("http://localhost:3100/purchaseHistory");
//     setUsers(res.data);
//   };
//   getUser();
// },[]);
const [purchaseHistory, setPurchaseHistory] = useState([]);
useEffect(() => {
  //データベースからデータを取得
  const purchaseHistoryData = collection(db,"CompanyDiscount");
  getDocs(purchaseHistoryData).then((snapShot) => {
    setPurchaseHistory(snapShot.docs.map((doc) => ({ ...doc.data()})));
  })
},[]);

return (
  <div class="CD">
    <table>
      <tr>
        <th>日付</th>
        <th>従業員番号</th>
        <th>名前</th>
        <th>商品コード</th>
        <th>定価金額</th>
        <th>返金額(割引額)</th>
      </tr>
    {purchaseHistory.map((purchaseHistory) => {
      function showDate() {
        let date = new Date(purchaseHistory.purchaseDate);
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        return (year +"/"+month+ "/"+ day);
      }
      
      return (
        <tr class="CDcolumn" key={purchaseHistory.purchasDate}>
          <th>{showDate()}</th>
          <th>{purchaseHistory.id}</th>
          <th>{purchaseHistory.name}</th>
          <th>{purchaseHistory.productCode}</th>
          <th>{purchaseHistory.productPrice}</th>
          <th>{purchaseHistory.productPrice/2}</th>
        </tr>
      )
    })}
    </table>
  </div>
 );
};

export default CompanyDiscount