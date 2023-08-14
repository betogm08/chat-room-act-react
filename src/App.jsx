import { React, useEffect, useState } from 'react';
import { useSocket } from './hooks/useSocket';
import './App.css';

function App() {
  const [userActivity, setUserActivity] = useState([]);

  const { message } = useSocket();

  const findUser = (name) => {
    return userActivity.find(user => user.name === name);
  }

  const sortUserActivity = (userActivityArray) => {
    return userActivityArray.sort((a, b) => b.totalWords - a.totalWords);
  }

  const updateUserActivity = (name, totalWords) => {
    const isUserFound = findUser(name);

    if (isUserFound) {
      const existingUserUpdate = userActivity.map(user =>
        user.name === name ? { ...userActivity, name: user.name, totalWords: user.totalWords + totalWords } : user
      );

      const sortedResults = sortUserActivity(existingUserUpdate);

      setUserActivity(sortedResults);
    } else {
      const newUserActivity = { name, totalWords };
      setUserActivity([...userActivity, newUserActivity]);
    }
  }

  useEffect(() => {
    if (message !== '') {
      const name = message.substring(0, message.indexOf(':'));
      const totalWords = message.substring(message.indexOf(':')).split(' ').length;
      updateUserActivity(name, totalWords);
    }
  }, [message]);

  return (
    <main className='main'>
      <h1>Chat Room Activity</h1>
      <div className='user-activity'>
        <p className='chat-room-title'>User Message Count </p>
        <div className='user-activity-cards-group'>
          { userActivity && userActivity.map((user, i) => (
            <div className='user-activity-card' key={i}>
              <p className='user-name'>{user.name}</p>
              <p className='total-words'>{user.totalWords}</p>
            </div>
          )) }
        </div>
      </div>
    </main>
  );
}

export default App;
