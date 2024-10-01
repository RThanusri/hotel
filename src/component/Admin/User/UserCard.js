import React from 'react';
import './UserCard.css'

const UserCard = ({ userId, userName, email, role, remove }) => {
  return (
    <div className="user-card">
      <h3>User ID: {userId}</h3>
      <p>User Name: {userName}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>

      <button onClick={() => remove(userId)}>Remove User</button>
    </div>
  );
};

export default UserCard;