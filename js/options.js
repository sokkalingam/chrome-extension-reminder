
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {

  loadTime();

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

  options.startHr.onchange = function() {
    localStorage.startHr = options.startHr.value;
  };

  options.startMin.onchange = function() {
    localStorage.startMin = options.startMin.value;
  };

  options.endHr.onchange = function() {
    localStorage.endHr = options.endHr.value;
  };

  options.endMin.onchange = function() {
    localStorage.endMin = options.endMin.value;
  };

});

function loadTime() {
  for (var i = 0; i <= 60; i++) {

    if (i <= 24) {
      $("select[name='startHr']").append("<option value='" + i + "'>" + i + "</option>");
      $("select[name='endHr']").append("<option value='" + i + "'>" + i + "</option>");  
    }

    $("select[name='startMin']").append("<option value='" + i + "'>" + i + "</option>");
    $("select[name='endMin']").append("<option value='" + i + "'>" + i + "</option>");
  }
}
