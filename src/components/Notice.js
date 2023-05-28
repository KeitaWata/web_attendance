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
  // const currentDate = new Date()
},[]);

return (
  <div class="CD">
    <table>
      <tr>
        <th><h1>通知</h1></th>
      </tr>
    {timeTable.map((timeTable) => {
      function showDay() {
        let hoge = new Date(timeTable.workStartS);
        let year = hoge.getFullYear()
        let month = hoge.getMonth()+1
        let day = hoge.getDate()
        return (year +"/"+month+ "/"+ day);}

      function stampQuickly(time) {
        let hoge = new Date(time)
        let hour = hoge.getHours()*60
        let minutes = hoge.getMinutes()
        return (hour + minutes )
      }
      if (timeTable.workStart === "null" && timeTable.workLeave === "null"){
        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{showDay()}のタイムカードを押していません</th>
          </tr>
        )
    }else if (timeTable.workStart === "null") {
      return (
        <tr class="CDcolumn" key={timeTable.id}>
          <th>{timeTable.name}さんは{showDay()}の始業時のタイムカードを押していません</th>
        </tr>
      )
      }else if (timeTable.workLeave === "null") {
        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{showDay()}の終業時のタイムカードを押していません</th>
          </tr>
        )
      }else if (stampQuickly(timeTable.workLeave) - stampQuickly(timeTable.workStart) - 540 > 20) {
        return (
        <tr class="CDcolumn" key={timeTable.id}>
            <th>{timeTable.name}さんは{showDay()}に{Math.round(stampQuickly(timeTable.workLeave) - stampQuickly(timeTable.workStart) - 540)}分残業しています</th>
          </tr>
        )
      }
    })}
    </table>
  </div>
 );
}

export default Notice