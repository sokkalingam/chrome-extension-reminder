
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
  localStorage.frequencyMin = 1;        // The display frequency, in Min
  localStorage.frequencySec = 0;  // Frequency in seconds
  localStorage.isInitialized = true; // The option initialization.
  localStorage.content = 'No message has been set! Set your reminder message in options page';
  localStorage.daysofweek = [0,1,2,3,4,5,6];
  localStorage.startHr = 12;
  localStorage.startMin = 0;
  localStorage.startMdn = 'am';
  localStorage.endHr = 11;
  localStorage.endMin = 59;
  localStorage.endMdn = 'pm';
// }

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  // if (JSON.parse(localStorage.isActivated)) { show(); }
  var interval = 0; // The display interval, in seconds.
  setInterval(function() {
    var freq = parseInt(localStorage.frequencyMin * 60) + parseInt(localStorage.frequencySec);
    console.log(freq);
    interval++;
    if (JSON.parse(localStorage.isActivated) &&
        interval >= freq &&
        withinWorkingHours(localStorage.daysofweek,
          localStorage.startHr, localStorage.startMin, localStorage.startMdn,
          localStorage.endHr, localStorage.endMin, localStorage.endMdn)) {
      show();
      interval = 0;
    }
  }, 1000);
}

function withinWorkingHours(includedDays = [0,1,2,3,4,5,6], startHr = 0, startMin = 0, startMdn, endHr = 24, endMin = 60, endMdn) {
  var date        = new Date();
  var dayOfWeek   = date.getDay();
  var currentTime = calculateTime(date.getHours(), date.getMinutes());
  var startTime   = calculateTime(startHr, startMin, startMdn);
  var endTime     = calculateTime(endHr, endMin, endMdn);
    
  if ((includedDays.indexOf(dayOfWeek) > -1) &&
      (startTime < currentTime) && (currentTime < endTime))
    return true;
  return false;
}

function calculateTime(hr, min, mdn='am') {
  var time = 0;
  if (mdn === 'pm')
    time += 12 * 60;
  else if (mdn === 'am' && parseInt(hr) === 12)
    hr = 0;
  time += parseInt(hr) * 60;
  time += parseInt(min);
  
  return time; 
}
