// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// Wrap your code in a jQuery document ready function

$(document).ready(function() {
  // Your DOM interaction code goes here

  // Example: Add a click event listener to the save buttons
  $('.saveBtn').on('click', function() {
    // Accessing the id of the parent time-block
    var timeBlockId = $(this).closest('.time-block').attr('id');
    
    // Get the user input from the textarea within the same time-block
    var userInput = $(this).siblings('.description').val();

    // Store the user input in local storage using the timeBlockId as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Example: Apply past, present, or future classes to time blocks based on the current hour
  var currentHour = dayjs().hour();

  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var timeBlockHour = parseInt(timeBlockId.split('-')[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Example: Retrieve user input from local storage and set it in the corresponding textarea
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var storedInput = localStorage.getItem(timeBlockId);
    
    if (storedInput) {
      $(this).find('.description').val(storedInput);
    }
  });

  // Example: Display the current date in the header
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);

   // Add an event listener for the "Clear All" button
   $('#clear-all').on('click', function() {
    // Clear all data from local storage
    localStorage.clear();

    // Reset all textareas
    $('.description').val('');
  });
});
