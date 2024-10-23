document.addEventListener('DOMContentLoaded', () => {
    const taskNameInput = document.getElementById('taskName');
    const dateTimeInput = document.getElementById('dateTime');
    const reminderList = document.getElementById('reminderList');
  
    function addReminder() {
      const taskName = taskNameInput.value.trim();
      const dateTime = dateTimeInput.value.trim();
  
      if (taskName === '' || dateTime === '') {
        alert('Please enter both task name and date/time.');
        return;
      }
  
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="task-name">${taskName}</span>
        <span class="task-date">${dateTime}</span>
        <button class="complete-btn" onclick="completeReminder(this)">Complete</button>
      `;
      document.getElementById('reminderList').appendChild(li);
      
  
      // Schedule notification
      scheduleNotification(taskName, dateTime);
  
      // Clear input fields
      taskNameInput.value = '';
      dateTimeInput.value = '';
    }
  
    function completeReminder(button) {
      const li = button.parentElement;
      li.classList.add('completed');
    }
  
    function scheduleNotification(taskName, dateTime) {
      const notificationTime = new Date(dateTime);
      const currentTime = new Date();
  
      // Calculate the time difference in milliseconds
      const timeDifference = notificationTime - currentTime;
  
      if (timeDifference > 0) {
        setTimeout(() => {
          displayNotification(taskName);
        }, timeDifference);
      }
    }
  
    function displayNotification(taskName) {
      if (Notification.permission === 'granted') {
        const notification = new Notification('Reminder', {
          body: `It's time for ${taskName}!`,
        });
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            displayNotification(taskName);
          }
        });
      }
    }
  
    // Request notification permission on page load
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  
    window.addReminder = addReminder;
    window.completeReminder = completeReminder;
  });
  