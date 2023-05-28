import React from 'react'
import { useState,useEffect} from 'react'
import axios, { } from 'axios'
import '../css/main.css';

const CompanyDiscount = () => {
  const [purchaseHistory,setUsers] = useState([]);

  useEffect(() => {
  const getUser = async () => {
    const res = await axios.get("http://localhost:3100/purchaseHistory");
    setUsers(res.data);
  };
  getUser();
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
          <th>{purchaseHistory.refundAmount}</th>
          <th>{purchaseHistory.refundAmount/2}</th>
        </tr>
      )
    })}
    </table>
  </div>
 );
};

export default CompanyDiscount