import '../css/main.css';
import React from 'react';
import { useState,useEffect} from 'react'
import axios, { } from 'axios'

const Notice = () => {
//   const [timeTable,setUsers] = useState([]);

//   useEffect(() => {
//   const getUser = async () => {
//     const res = await axios.get("http://localhost:3100/timetable");
//     setUsers(res.data);
//   };
//   getUser();
// },[]);

const timeTable = [
  {
    "id":1,
    "name":"A",
    "workStartS":"2023-05-05T09:00:00.000+09:00",
    "workLeaveS":"2023-05-05T18:00:00.000+09:00", 
    "workStart":"null",
    "workLeave":"null"
  },
  {
    "id":2,
    "name":"B",
    "workStartS":"2023-05-05T09:10:02.000+09:00",
    "workLeaveS":"2023-05-05T18:00:00.000+09:00", 
    "workStart":"2023-05-05T10:10:11.000+09:00",
    "workLeave":"null"
  },
  {
    "id":3,
    "name":"C",
    "workStartS":"2023-05-05T09:00:00.000+09:00",
    "workLeaveS":"2023-05-05T18:00:00.000+09:00",
    "workStart":"null",
    "workLeave":"null"
  },
  {
    "id":1,
    "name":"A",
    "workStartS":"2023-05-06T09:00:00.000+09:00",
    "workLeaveS":"2023-05-06T18:00:00.000+09:00", 
    "workStart":"2023-05-06T08:55:00.000+09:00",
    "workLeave":"2023-05-06T18:12:00.000+09:00"
  },
  {
    "id":2,
    "name":"B",
    "workStartS":"2023-05-06T09:00:00.000+09:00",
    "workLeaveS":"2023-05-06T18:00:00.000+09:00", 
    "workStart":"null",
    "workLeave":"2023-05-06T18:50:00.000+09:00"
  },
  {
    "id":3,
    "name":"C",
    "workStartS":"2023-05-06T09:00:00.000+09:00",
    "workLeaveS":"2023-05-06T18:00:00.000+09:00", 
    "workStart":"2023-05-06T09:01:00.000+09:00",
    "workLeave":"2023-05-06T18:40:01.000+09:00"
  }
  
]

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