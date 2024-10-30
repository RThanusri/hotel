import React from 'react';


const UserCard = ({ userId, userName, email, role, remove }) => {
  return (
    <div className="user-card">
      <h3>User ID: {userId}</h3>
      <p>User Name: {userName}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>

      <button style={{backgroundColor:'#cc0000'}}onClick={() => remove(userId)}>Remove User</button>
    </div>
  );
};

export default UserCard;