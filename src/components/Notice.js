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
        <th><h1>通知</h1></th>
      </tr>
    {timeTable.map((timeTable) => {
      if (timeTable.workStart === "null" && timeTable.workLeave === "null"){
        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{timeTable.date}のタイムカードを押していません</th>
          </tr>
        )
    }else if (timeTable.workStart === "null") {
      return (
        <tr class="CDcolumn" key={timeTable.id}>
          <th>{timeTable.name}さんは{timeTable.date}の始業時のタイムカードを押していません</th>
        </tr>
      )
      }else if (timeTable.workLeave == "null") {
        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{timeTable.date}の終業時のタイムカードを押していません</th>
          </tr>
        )
      }
    })}
    </table>
  </div>
 );
}

export default Notice