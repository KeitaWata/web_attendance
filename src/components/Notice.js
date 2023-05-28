import '../css/main.css';
import React from 'react';
import { useState,useEffect} from 'react'
import axios, { } from 'axios'

const Notice = () => {
  const [timeTable,setUsers] = useState([]);

  useEffect(() => {
  const getUser = async () => {
    const res = await axios.get("http://localhost:3100/timetable");
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
    {// eslint-disable-next-line
    timeTable.map((timeTable) => {
      function showDate() {
        let date = new Date(timeTable.workStartS);
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        return (year +"/"+month+ "/"+ day);}

      function stampMinutes(time) {
        let date = new Date(time)
        let hour = date.getHours()*60
        let minutes = date.getMinutes()
        return (hour + minutes )
      }
      if (timeTable.workStart === "null" && timeTable.workLeave === "null"){
        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{showDate()}のタイムカードを押していません</th>
          </tr>
        )
    }else if (timeTable.workStart === "null") {
      return (
        <tr class="CDcolumn" key={timeTable.id}>
          <th>{timeTable.name}さんは{showDate()}の始業時のタイムカードを押していません</th>
        </tr>
      )
      }else if (timeTable.workLeave === "null") {
        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{showDate()}の終業時のタイムカードを押していません</th>
          </tr>
        )
      }else if (stampMinutes(timeTable.workLeave) - stampMinutes(timeTable.workStart) - 540 > 20) {
        return (
        <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{showDate()}に{Math.round(stampMinutes(timeTable.workLeave) - stampMinutes(timeTable.workStart) - 540)}分残業しています</th>
          </tr>
        )
      }
    })}
    </table>
  </div>
 );
}

export default Notice