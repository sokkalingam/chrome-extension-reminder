
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.isActivated.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {

  $(options.isActivated).bootstrapSwitch();
  $('#startTime').timepicker();
  $('#endTime').timepicker();

  $('#startTime').timepicker('setTime', '12:00 AM');
  $('#endTime')  .timepicker('setTime', '11:59 PM');

  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequencyMin.value = localStorage.frequencyMin;
  options.frequencySec.value = localStorage.frequencySec;
                                         // The display frequency, in minutes.
  options.content.value = localStorage.content;

  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  var frequencies = $("[name^='frequency']");
  frequencies.change(function() {
    localStorage.frequencyMin = options.frequencyMin.value;
    localStorage.frequencySec = options.frequencySec.value;
  });

  options.content.onchange = function() {
    localStorage.content = options.content.value;
  };

  var checkboxes = $("[name='daysofweek'] [type='checkbox']");
  checkboxes.change(function() {
    var daysofweek = [];
    for (cb of checkboxes)
      if (cb.checked)
        daysofweek.push(cb.value);
    // if no days are set, then all days are set
    if (daysofweek.length == 0)
      daysofweek = [0, 1, 2, 3, 4, 5, 6];
    localStorage.daysofweek = daysofweek;
  });

  $('#startTime').timepicker().on('changeTime.timepicker', function(e) {
    localStorage.startHr = e.time.hours;
    localStorage.startMin = e.time.minutes;
    localStorage.startMdn = e.time.meridian;
  });

  $('#endTime').timepicker().on('changeTime.timepicker', function(e) {
    localStorage.endHr = e.time.hours;
    localStorage.endMin = e.time.minutes;
    localStorage.endMdn = e.time.meridian;
  });

});
