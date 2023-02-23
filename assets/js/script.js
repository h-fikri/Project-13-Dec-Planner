// Set current date at the top of the page
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// Update timeblocks color based on past, present, or future
function updateTimeBlocks() {
  // Get the current hour from the Moment.js library
  var currentHour = moment().hours();

  // Loop over each time block on the page
  $(".time-block").each(function () {
    // Get the hour for the current time block from the ID attribute
    // Get the id attribute of the current time block
    var idAttr = $(this).attr("id");

    // Split the id attribute into an array at the "-" character
    var idParts = idAttr.split("-");

    // Get the second element of the idParts array, which is the hour value as a string
    var hourStr = idParts[1];

    // Convert the hour value string to an integer
    var blockHour = parseInt(hourStr);

    // Combine them all to make alternative way to extract hour value from ID attribute:
    // var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Check time block is in the past, present, or future
    if (blockHour < currentHour) {
      // If the time block is in the past, add the "past" class to the element
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    } else if (blockHour === currentHour) {
      // If the time block is the current hour, add the "present" class to the element
      $(this).removeClass("past");
      $(this).addClass("present");
      $(this).removeClass("future");
    } else {
      // If the time block is in the future, add the "future" class to the element
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });
}

// Save to local storage:
// Add event listener to save buttons
$(".saveBtn").on("click", function () {
  // Get the id of the parent element of the clicked save button (the hour block)
  var hour = $(this).parent().attr("id");

  // Get the value of the description textarea element for the current hour block
  var description = $(this).siblings(".description").val();

  // Save the description to local storage using the hour value as the key
  localStorage.setItem(hour, description);
});

// Function to load events from local storage
function loadEvents() {
  // Loop over each time block on the page
  $(".time-block").each(function () {
    // Get the id of the current time block
    var hour = $(this).attr("id");

    // Get the description for the current time block from local storage
    var description = localStorage.getItem(hour);

    // Set the value of the textarea element inside the current time block to the description from local storage
    $(this).children(".description").val(description);
  });
}

// Call functions on page load
updateTimeBlocks();
loadEvents();

// Update timeblocks
setInterval(function () {
  updateTimeBlocks();
}, 60 * 60 * 1000); // 1 hour
