document.addEventListener('DOMContentLoaded', () => {
  // Get references to the task name input, date/time input, and the reminder list
  const taskNameInput = document.getElementById('taskName');
  const dateTimeInput = document.getElementById('dateTime');
  const reminderList = document.getElementById('reminderList');

  // Function to add a new reminder
  function addReminder() {
    // Trim input values to avoid leading/trailing spaces
    const taskName = taskNameInput.value.trim();
    const dateTime = dateTimeInput.value.trim();

    // Check if both task name and date/time are entered, otherwise show an alert
    if (taskName === '' || dateTime === '') {
      alert('Please enter both task name and date/time.');
      return; // Stop execution if inputs are empty
    }

    // Create a new list item (li) for the reminder
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="task-name">${taskName}</span>
      <span class="task-date">${dateTime}</span>
      <button class="complete-btn" onclick="completeReminder(this)">Complete</button>
    `; // Add task name, date/time, and a "Complete" button inside the list item

    // Append the new reminder to the reminder list
    document.getElementById('reminderList').appendChild(li);
    
    // Schedule a notification for the reminder based on the date and time
    scheduleNotification(taskName, dateTime);

    // Clear the input fields after adding the reminder
    taskNameInput.value = '';
    dateTimeInput.value = '';
  }

  // Function to mark a reminder as complete when the "Complete" button is clicked
  function completeReminder(button) {
    const li = button.parentElement; // Get the parent <li> element of the button
    li.classList.add('completed'); // Add a 'completed' class to the <li> to style it as completed
  }

  // Function to schedule a notification for a task at the specified date/time
  function scheduleNotification(taskName, dateTime) {
    const notificationTime = new Date(dateTime); // Convert dateTime string to a Date object
    const currentTime = new Date(); // Get the current date/time

    // Calculate the time difference between now and the notification time in milliseconds
    const timeDifference = notificationTime - currentTime;

    // If the notification time is in the future, schedule a notification
    if (timeDifference > 0) {
      setTimeout(() => {
        displayNotification(taskName); // Display the notification after the time difference has passed
      }, timeDifference);
    }
  }

  // Function to display the notification for a task
  function displayNotification(taskName) {
    // Check if notification permission has already been granted
    if (Notification.permission === 'granted') {
      // If granted, create and show the notification
      const notification = new Notification('Reminder', {
        body: `It's time for ${taskName}!`, // Notification message body
      });
    } else {
      // If not granted, request permission to show notifications
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          displayNotification(taskName); // If granted after the request, display the notification
        }
      });
    }
  }

  // Request notification permission on page load if not already granted
  if (Notification.permission !== 'granted') {
    Notification.requestPermission(); // Request permission for browser notifications
  }

  // Expose the addReminder and completeReminder functions globally
  window.addReminder = addReminder;
  window.completeReminder = completeReminder;
});
