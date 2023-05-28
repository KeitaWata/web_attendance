import React from 'react'
import { useState,useEffect} from 'react'
import axios, { } from 'axios'
import '../css/main.css';


const TimeTable = () => {
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
        <th>日付</th>
        <th>従業員ID</th>
        <th>名前</th>
        <th>出勤予定時刻</th>
        <th>退勤予定時刻</th>
        <th>出勤時刻</th>
        <th>退勤時刻</th>
        <th>残業時間</th>
        <th>休憩時間</th>


      </tr>
    {timeTable.map((timeTable) => {
      function showDate() {
        let date = new Date(timeTable.workStartS);
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        return (year +"/"+month+ "/"+ day);}

        function timeSchedule(time) {
          if (time === "null") {
            return ("00:00")
          } else {
          let date = new Date(time)
          let hour = date.getHours()
          let minutes = date.getMinutes().toString().padStart(2, '0');
          return (hour + ':' + minutes)
        }
        }

        function stampMinutes(time) {
          let times = new Date(time)
          let hour = times.getHours()*60
          let minutes = times.getMinutes()
          return (hour + minutes )
       
        }
        function minutesToHours(){
          if (timeTable.workLeave === "null" || timeTable.workStart=== "null") {
            return ("00:00")
          }else {
            let hour = 0
            let minutes = Math.round(stampMinutes(timeTable.workLeave) - stampMinutes(timeTable.workStart) - 540)
            for (let i = minutes; i>60 ; i-=60){
              hour += 1
            }
            let hogg = minutes - (hour * 60)
            return (hour +":"+ hogg)
          }
        }

        return (
          <tr class="CDcolumn" key={timeTable.id}>
            <th>{showDate()}</th>
            <th>{timeTable.id}</th>
            <th>{timeTable.name}</th>
            <th>{timeSchedule(timeTable.workStartS)}</th>
            <th>{timeSchedule(timeTable.workLeaveS)}</th>
            <th>{timeSchedule(timeTable.workStart)}</th>
            <th>{timeSchedule(timeTable.workLeave)}</th>
            <th>{minutesToHours()}</th>
            <th>1:00</th>
          </tr>
        )
    }
    )}
    </table>
  </div>
 );
};

export default TimeTable