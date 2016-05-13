

var notification = null;
function show() {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  if (notification !== null)
    notification.close();
  notification = new Notification(hour + time[2] + ' ' + period, {
    icon: '../assets/128.png',
    body: localStorage.content
  });
}

// Conditionally initialize the options.
// if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
  localStorage.content = 'No message has been set! Set your reminder message in options page';
  localStorage.daysofweek = [0,1,2,3,4,5,6];
  localStorage.startHr = 0;
  localStorage.startMin = 0;
  localStorage.endHr = 24;
  localStorage.endMin = 60;
// }

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval &&
        withinWorkingHours(localStorage.daysofweek, localStorage.startHr, localStorage.startMin, localStorage.endHr, localStorage.endMin)) {
      show();
      interval = 0;
    }
  }, 1000);
}

function withinWorkingHours(includedDays = [0,1,2,3,4,5,6], startHr = 0, startMin = 0, endHr = 24, endMin = 60) {
  console.log(includedDays);
  var date = new Date();
  var dayOfWeek = date.getDay();
  var hr = date.getHours();
  var min = date.getMinutes();
    if ((includedDays.indexOf(dayOfWeek) !== -1) &&
      ((endHr > hr) || ((endHr == hr) && (endMin >= min))) &&
      ((hr > startHr) || ((hr == startHr) && (min >= startMin))))
      return true;
    return false;
}
