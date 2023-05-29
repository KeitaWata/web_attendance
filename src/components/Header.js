import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return  (
    <header>
        <div className='logo'>
            <h2>勤怠管理アプリ</h2>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/web_attendance/">通知</Link>
                </li>
                <li>
                    <Link to="/web_attendance/timetable">タイムテーブル</Link>
                </li>
                <li>
                    <Link to="/web_attendance/companydiscount">社割履歴</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;