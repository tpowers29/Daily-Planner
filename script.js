// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
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
  let htmlCode = ""
  let currentHour = dayjs().hour()
  for(let i=9;i<=17;i++){
    var plannedEntry = localStorage.getItem(i) || ""
    var currentTime;
    if(i < 12){
      currentTime = i+"am"
    }else if( i === 12){
      currentTime = i +"pm"
    }else{
      currentTime = i-12 + "pm"
    }
    let currentColor;
    if(i < currentHour){
    currentColor = "past"
    }else if(i === currentHour){
      currentColor = "present"
    }else{
      currentColor = "future"
    }
    htmlCode += `   <div id="hour-${i}" class="row time-block">
    <div class="col-2 col-md-1 hour text-center py-3"> ${currentTime}</div>
    <textarea value="${plannedEntry}" class="col-8 col-md-10 description ${currentColor}" id="${i}-text" rows="3">${plannedEntry} </textarea>
    <button class="btn saveBtn col-2 col-md-1"id="${i}-save" data-id = "${i}" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`
  }
  $(".container-lg").html(htmlCode)
  
  $(".saveBtn").on ("click",function(){
    let id = $(this).attr("data-id")
    let userEntry = $("#"+id +"-text").val()
    console.log(id,userEntry,"On click")
    localStorage.setItem (id,userEntry)
  })
});
