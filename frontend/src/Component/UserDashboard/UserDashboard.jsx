
import React, { useState, useEffect, useContext } from 'react'; 

import axios from 'axios';
import styles from './UserDashboard.module.css';
import useAuthRedirect from '../../../Context/useAuth';
import { UserContext } from '../../../Context/UserContext';


export const shortenText = (text, n) => {
    if (text.length > n) {
      const shoretenedText = text.substring(0, n).concat("...");
      return shoretenedText;
    }
    return text;
  };

const UserDashboard = () => {
    useAuthRedirect();
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [checkedInCount, setCheckedInCount] = useState(0);
    const [checkedOutCount, setCheckedOutCount] = useState(0);
    const [checkIn, setCheckIn] = useState([]);
    const [checkOut, setCheckOut] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get("/api/user/");
            const users = response.data;
    
            setData(users);
    
            const checkedInStudents = students.filter((student) => student.checkedIn);
            setCheckedInCount(checkedInStudents.length);
            setCheckIn(checkedInStudents);
    
            const checkedOutStudents = students.filter((student) => !student.checkedIn);
            setCheckedOutCount(checkedOutStudents.length);
            setCheckOut(checkedOutStudents);
          } catch (error) {
            console.error("Error fetching student data:", error);
          }
        };
        fetchUsers();
      }, []);

      const formatDate = (dateTime) => {
        if (!dateTime) {
          return "Invalid Date";
        }
    
        const date = new Date(dateTime);
        if (isNaN(date.getTime())) {
          return "Invalid Date";
        }
    
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC"
        };
    
        return new Intl.DateTimeFormat("en-US", options).format(date);
      };
 


    const handleLogout = () => {
        alert('Logged out!');
    };

    return (
        <div className="--flex-center __homeDashCon">
          <div className="__paraCon">
            <h1 className="__paraHeader">Hi {shortenText(user.fullname, 8)}</h1>
          </div>
    
          <div className="__secondCon">
            <h3 className="__quickTitle">Quick Stats</h3>
            <div className="__flex __boardss">
              <div className="__board">
                <p className="__boardHead">{data.length}</p>
                <p className="__boardDetails">Total students</p>
              </div>
              <div className="__board">
                <p className="__boardHead">{checkedInCount}</p>
                <p className="__boardDetails">Active students</p>
              </div>
              <div className="__board">
                <p className="__boardHead">{checkedOutCount}</p>
                <p className="__boardDetails">Inactive students</p>
              </div>
            </div>
          </div>
    
          <div className="--flex-center  __firstCon">
            <h4 className="__title">Recent Activity</h4>
            <div className="__users">
              <table className="home_table">
                <tbody>
                  {checkIn.length > 0 ? (
                    checkIn.map((student) => {
                      const { name, checkedInTime, _id } = student;
                      return (
                        <tr key={_id} className="table_data">
                          <td className="table_data">
                            {name}
                            <p>{shortenText(name, 5)} has checked In</p>
                          </td>
                          <td className="table_data">
                            {formatDate(checkedInTime)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2">No recent check-ins</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="__users">
              <table className="home_table">
                <tbody>
                  {checkOut.length > 0 ? (
                    checkOut.map((student) => {
                      const { name, checkedOutTime, _id } = student;
                      return (
                        <tr key={_id} className="table_data">
                          <td className="table_data">
                            {name}
                            <p>{shortenText(name, 5)} has checked out</p>
                          </td>
                          <td className="table_data">
                            {formatDate(checkedOutTime)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2">No recent check-outs</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
    
          <div className="__lastCon">
            <h3 className="__lastTitle">Quick Actions</h3>
            <div className="__homeBtn">
              <button className="__addBtn">
                <Link to="/studentreg">Add student</Link>
              </button>
              <button className="__attendBtn">
                <Link to="/attendance">Attendance</Link>
              </button>
            </div>
          </div>
        </div>
      );
};

export default UserDashboard;
















