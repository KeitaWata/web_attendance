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
      // function formatDate() {
      //   var y = purchaseHistory.purchaseDate.getFullYear();
      //   var m = ('00' + (purchaseHistory.purchaseDate.getMonth()+1)).slice(-2);
      //   var d = ('00' + purchaseHistory.purchaseDate.getDate()).slice(-2);
      //   return (y + '-' + m + '-' + d);
      // }
      function showDay() {
        let hoge = new Date(purchaseHistory.purchaseDate);
        let year = hoge.getFullYear()
        let month = hoge.getMonth()+1
        let day = hoge.getDate()
        return (year +"/"+month+ "/"+ day);
      }
        // let hoge = new Date(purchaseHistory.purchaseDate)
        // let day = hoge.getDate(),
      
      return (
        <tr class="CDcolumn" key={purchaseHistory.purchasDate}>
          <th>{showDay()}</th>
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