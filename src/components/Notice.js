import '../css/main.css';
import React from 'react';
import { useState,useEffect} from 'react'
import axios, { } from 'axios'

const Notice = () => {
  const [timeTable,setUsers] = useState([]);

  useEffect(() => {
  const getUser = async () => {
    const res = await axios.get("http://localhost:3100/timeTable");
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
      </tr>
    {timeTable.map((timeTable) => {
      return (
        <tr class="CDcolumn" key={timeTable.id}>
          <th>{timeTable.purchaseDate}</th>
          <th>{timeTable.id}</th>
          <th>{timeTable.name}</th>
        </tr>
      )
    })}
    </table>
  </div>
 );
}

export default Notice