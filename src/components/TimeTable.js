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
  // const currentDate = new Date()
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
    {timeTable.map((timeTables) => {
      function showDay() {
        let hoge = new Date(timeTables.workStartS);
        let year = hoge.getFullYear()
        let month = hoge.getMonth()+1
        let day = hoge.getDate()
        return (year +"/"+month+ "/"+ day);}

        function timeSchedule(time) {
          if (time === "null") {
            return ("00:00")
          } else {
          let hoge = new Date(time)
          let hour = hoge.getHours()
          let minutes = hoge.getMinutes().toString().padStart(2, '0');
          return (hour + ':' + minutes)
        }
        }

        function stampQuickly(time) {
          let hoge = new Date(time)
          let hour = hoge.getHours()*60
          let minutes = hoge.getMinutes()
          return (hour + minutes )
       
        }
        function stampLL(){
          if (timeTables.workLeave === "null" || timeTables.workStart=== "null") {
            return ("00:00")
          }else {
            let hour = 0
            let hoge = Math.round(stampQuickly(timeTables.workLeave) - stampQuickly(timeTables.workStart) - 540)
            for (let i = hoge; i>60 ; i-=60){
              hour += 1
            }
            let hogg = hoge - (hour * 60)
            return (hour +":"+ hogg)
          }
        }

        return (
          <tr class="CDcolumn" key={timeTables.id}>
            <th>{showDay()}</th>
            <th>{timeTables.id}</th>
            <th>{timeTables.name}</th>
            <th>{timeSchedule(timeTables.workStartS)}</th>
            <th>{timeSchedule(timeTables.workLeaveS)}</th>
            <th>{timeSchedule(timeTables.workStart)}</th>
            <th>{timeSchedule(timeTables.workLeave)}</th>
            <th>{stampLL()}</th>
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