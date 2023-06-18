import React from 'react'
import { useState,useEffect} from 'react'
import axios, { } from 'axios'
import '../css/main.css';
import db from "./firebase"
import { collection, getDocs} from "firebase/firestore"


// const Timetable = () => {
//   const timeTable = [
//     {
//       "id":1,
//       "name":"A",
//       "workStartS":"2023-05-05T09:00:00.000+09:00",
//       "workLeaveS":"2023-05-05T18:00:00.000+09:00", 
//       "workStart":"null",
//       "workLeave":"null"
//     },
//     {
//       "id":2,
//       "name":"B",
//       "workStartS":"2023-05-05T09:10:02.000+09:00",
//       "workLeaveS":"2023-05-05T18:00:00.000+09:00", 
//       "workStart":"2023-05-05T10:10:11.000+09:00",
//       "workLeave":"null"
//     },
//     {
//       "id":3,
//       "name":"C",
//       "workStartS":"2023-05-05T09:00:00.000+09:00",
//       "workLeaveS":"2023-05-05T18:00:00.000+09:00",
//       "workStart":"null",
//       "workLeave":"null"
//     },
//     {
//       "id":1,
//       "name":"A",
//       "workStartS":"2023-05-06T09:00:00.000+09:00",
//       "workLeaveS":"2023-05-06T18:00:00.000+09:00", 
//       "workStart":"2023-05-06T08:55:00.000+09:00",
//       "workLeave":"2023-05-06T18:12:00.000+09:00"
//     },
//     {
//       "id":2,
//       "name":"B",
//       "workStartS":"2023-05-06T09:00:00.000+09:00",
//       "workLeaveS":"2023-05-06T18:00:00.000+09:00", 
//       "workStart":"null",
//       "workLeave":"2023-05-06T18:50:00.000+09:00"
//     },
//     {
//       "id":3,
//       "name":"C",
//       "workStartS":"2023-05-06T09:00:00.000+09:00",
//       "workLeaveS":"2023-05-06T18:00:00.000+09:00", 
//       "workStart":"2023-05-06T09:01:00.000+09:00",
//       "workLeave":"2023-05-06T18:40:01.000+09:00"
//     }
    
//   ]
//   const [timeTable,setUsers] = useState([]);

//   useEffect(() => {
//   const getUser = async () => {
//     const res = await axios.get("http://localhost:3100/timetable");
//     setUsers(res.data);
//   };
//   getUser();
// },[]);
const [timetable, setTimeteble] = useState([]);
useEffect(() => {
  //データベースからデータを取得
  const timetableData = collection(db,"TimeTable");
  getDocs(timetableData).then((snapShot) => {
    setTimeteble(snapShot.docs.map((doc) => ({ ...doc.data()})));
  })
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
    {timetable.map((timetable) => {
      function showDate() {
        let date = new Date(timetable.workStartS);
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
          if (timetable.workLeave === "null" || timetable.workStart=== "null") {
            return ("00:00")
          }else {
            let hour = 0
            let minutes = Math.round(stampMinutes(timetable.workLeave) - stampMinutes(timetable.workStart) - 540)
            for (let i = minutes; i>60 ; i-=60){
              hour += 1
            }
            let hogg = minutes - (hour * 60)
            return (hour +":"+ hogg)
          }
        }

        return (
          <tr class="CDcolumn" key={timetable.id}>
            <th>{showDate()}</th>
            <th>{timetable.id}</th>
            <th>{timetable.name}</th>
            <th>{timeSchedule(timetable.workStartS)}</th>
            <th>{timeSchedule(timetable.workLeaveS)}</th>
            <th>{timeSchedule(timetable.workStart)}</th>
            <th>{timeSchedule(timetable.workLeave)}</th>
            <th>{minutesToHours()}</th>
            <th>1:00</th>
          </tr>
        )
    }
    )}
    </table>
  </div>
 );

export default Timetable