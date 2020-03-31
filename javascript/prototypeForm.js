// create form groups object to store and reference all divs, error spans and input IDs
var formGroups = {}

// hide error summary by default
var errorSummary = document.querySelectorAll('div.govuk-error-summary')
if (errorSummary.length > 0) {
  errorSummary[0].style.display = 'none'
}

// hide all error messges
var e
var errorGroup = document.querySelectorAll('span.govuk-error-message')
if (errorGroup.length > 0) {
  for (e = 0; e < errorGroup.length; e++) {
    errorGroup[e].style.display = 'none'
  }
}

function showData () {
  // establish variables
  var i
  var a

  if (typeof (Storage) !== 'undefined') {
    var data = window.sessionStorage

    // make a list of all divs with class govuk-form-group
    var formGorupBlocks = document.getElementsByClassName('govuk-form-group')

    // fill object with data from html doc

    for (i = 0; i < formGorupBlocks.length; i++) {
    // create default id for div
      var objName = 'div' + i

      // check if an id already exists for the div
      if (formGorupBlocks[i].id) {
        objName = formGorupBlocks[i].id
      } else {
      // otherwise give div default id
        formGorupBlocks[i].id = objName
      }
      // test to see if there are additional divs within current div that we should ignore
      var divNodes = document.getElementById(objName).querySelectorAll('.govuk-form-group')
      // found a div with div children
      if (divNodes.length > 0) {
        for (a = 0; a < divNodes.length; a++) {
        // give div children an id that can be ignored
          divNodes[a].id = 'ignore-' + (i + a)
        }
      }
      // check to see if div should be ignored - note it will retunr false if found
      if (searchStart(objName, 'ignore-')) {
      // div doesn't start with the id 'ignore-'
      // hide and collect error message for div
        var errorID
        var divError = document.getElementById(objName).querySelectorAll('.govuk-error-message')
        if (divError) {
          for (a = 0; a < divError.length; a++) {
            errorID = divError[a].id
          }
        }

        // save input ids for div in an array
        var inputID = []
        var divInputs = document.getElementById(objName).querySelectorAll('input, select, textarea')
        if (divInputs) {
          for (a = 0; a < divInputs.length; a++) {
            inputID.push(divInputs[a].id)
          }
        }
        // save ids for form group, its error message, and inputs in form groups object
        formGroups[objName] = { id: objName, errorId: errorID, inputId: inputID }
      }
    }
    // fill any saved session data into form elements
    for (i = 0; i < data.length; i++) {
      var dataKey = data.key(i)
      // check to see data key matches an element with the same id in current document
      if (document.getElementById(dataKey)) {
        if (document.getElementById(dataKey).type === 'checkbox' || document.getElementById(dataKey).type === 'radio') {
          document.getElementById(dataKey).checked = true
        } else if (document.getElementById(dataKey).type === 'file') {
          var uploadMessage = document.createElement('span')
          uploadMessage.id = dataKey + '--message'
          uploadMessage.classList.add('govuk-hint')
          uploadMessage.innerText = '1 file selected - ' + data.getItem(dataKey)
          document.getElementById(dataKey).parentNode.insertBefore(uploadMessage, document.getElementById(dataKey))
        } else {
          document.getElementById(dataKey).value = data.getItem(dataKey)
        }
      }
    }
  } else {
    window.alert('This prototype uses session storage to save inputted information. Unfortunately this browser cannot use session storage')
  }
}

function saveData (gotoURL) {
  // set variables
  var pageTitle = document.title
  if (typeof (Storage) !== 'undefined') {
    // save all errors to display in error summary box
    var errorSummaryList = ''
    var loopNum
    var data = window.sessionStorage
    // loop through form group object to get ids of inputs to gather, check , and save data
    for (loopNum in formGroups) {
      var currentDivId = formGroups[loopNum]
      var currentInputId = ''
      var arrayCounter
      var valid = false
      // variable to log how many of the text inputs within 1 form group are valid i.e. filled
      // if 1 or all of the text inputs are invalid the error msg will display
      var validCounter = 0
      // for divs with multiple inputs e.g. date pattern, radios or checkboxes are stored as an array
      // go through all inputs in current div, check if there is data entered if not show error
      var inputsAvailable = currentDivId.inputId.length
      // loop through array to check and save all inputs within current div
      for (arrayCounter = 0; arrayCounter < inputsAvailable; arrayCounter++) {
        // get input id from array
        currentInputId = document.getElementById(currentDivId.inputId[arrayCounter])
        // check if it is a checkbox or radio so we can save the value of the associated label
        if (currentInputId.type === 'checkbox' || currentInputId.type === 'radio') {
          // clear previous saved value from session storage
          data.removeItem(currentInputId.id)
          // check if current input is checked
          if (currentInputId.checked === true) {
            // input checked
            var label = currentInputId.labels
            // add data to session storage
            data[currentInputId.id] = label[0].textContent
            validCounter = inputsAvailable
          }
        }
        if (currentInputId.tagName === 'SELECT') {
          // check that the select
          if (currentInputId.value === '0') {
            // clean away deleted text in fields from session storage
            data.removeItem(currentInputId.id)
          } else {
            // save value to session storage
            data[currentInputId.id] = currentInputId.value
            validCounter = inputsAvailable
          }
        }
        if (currentInputId.tagName === 'TEXTAREA') {
          if (currentInputId.value === '') {
            // clean away deleted text in fields from session storage
            data.removeItem(currentInputId.id)
            // highlight textfield with error class that are not maked as optional fields
            if (searchEnd(currentInputId.id, '--opt')) {
              currentInputId.classList.add('govuk-textarea--error')
            }
          } else {
            // text area has a value to save
            // remove textarea error class
            currentInputId.classList.remove('govuk-textarea--error')
            // save value to session storage
            data[currentInputId.id] = currentInputId.value
            validCounter = inputsAvailable
          }
        }
        if (currentInputId.type === 'text' || currentInputId.type === 'number' || currentInputId.type === 'email' || currentInputId.type === 'tel') {
          if (currentInputId.value === '') {
            // clean away deleted text in fields from session storage
            data.removeItem(currentInputId.id)
            // highlight textfield with error class that are not maked as optional fields
            if (searchEnd(currentInputId.id, '--opt')) {
              currentInputId.classList.add('govuk-input--error')
            }
          } else {
            // text field has a value to save
            // remove text field error class
            currentInputId.classList.remove('govuk-input--error')
            // save value to session storage
            data[currentInputId.id] = currentInputId.value
            validCounter++
          }
        }
        if (currentInputId.type === 'file') {
          if (currentInputId.value === '') {
            if (data[currentInputId.id]) {
              // data already saved therefore dont show error
              validCounter++
            } else {
              // clean away deleted text in fields from session storage
            // data.removeItem(currentInputId.id)
            // highlight textfield with error class that are not maked as optional fields
              if (searchEnd(currentInputId.id, '--opt')) {
                currentInputId.classList.add('govuk-file-upload--error')
              }
            }
          } else {
            // file upload has a value to save
            // remove file upload error class
            currentInputId.classList.remove('govuk-file-upload--error')
            // save file name to session storage
            // get file name
            var fileUploadName = currentInputId.value.split('\\').pop()

            // check to see if there is already a file saved for upload
            if (data[currentInputId.id]) {
              // file already saved just update session storage and message above upload component
              data[currentInputId.id] = fileUploadName
              var uploadMessageId = currentInputId.id + '--message'
              document.getElementById(uploadMessageId).innerText = '1 file selected - ' + fileUploadName
            } else {
              data[currentInputId.id] = fileUploadName
              // create and display name of file selected to upload
              var uploadMessage = document.createElement('span')
              uploadMessage.id = currentInputId.id + '--message'
              uploadMessage.classList.add('govuk-hint')
              uploadMessage.innerText = '1 file selected - ' + fileUploadName
              document.getElementById(currentInputId.id).parentNode.insertBefore(uploadMessage, document.getElementById(currentInputId.id))
            }
            validCounter++
          }
        }
      }

      if (validCounter === inputsAvailable) {
        valid = true
      }

      // show or hide error messages and vertical bar on form group container div
      if (valid === true) {
        // no errors found for this div
        // hide error message and div vertical bar
        document.getElementById(currentDivId.errorId).style.display = 'none'
        document.getElementById(currentDivId.id).classList.remove('govuk-form-group--error')
      } else {
        // errors found in div
        // make sure field is NOT optional
        if (searchEnd(currentInputId.id, '--opt')) {
          document.getElementById(currentDivId.errorId).style.display = 'block'
          document.getElementById(currentDivId.id).classList.add('govuk-form-group--error')
          // get error message for form group div
          var currentError = document.getElementById(currentDivId.errorId)
          // add error to error summary list
          errorSummaryList += "<li> <a href='#" + currentDivId.inputId[0] + "'>" + currentError.innerHTML + '</a> </li>'
        }
      }
    }
    // show or hide error summary based upon number of errors logged on page
    if (errorSummaryList !== '') {
      // errors found
      // add errors to error summary
      var errorList = document.querySelectorAll('ul.govuk-error-summary__list')
      if (errorList) {
        errorList[0].innerHTML = errorSummaryList
        errorSummary[0].style.display = 'block'
        // change page title to have error preceeding it
        // check page title doesn't already have an error at the start of it
        if (searchStart(pageTitle, 'Error: ')) {
          document.title = 'Error: ' + pageTitle
        } else {
          document.title = pageTitle
        }

        // focus on error summary
        errorSummary[0].focus()
      }
    } else {
      // no errors found okay to proceeed to next page
      // change page title remove error preceeding it
      if (searchStart(pageTitle, 'Error: ')) {
        document.title = pageTitle
      }
      errorSummary[0].style.display = 'none'

      // check to see if we have come to this page via the review page
      if (data.reviewUrl) {
        window.location.href = data.reviewUrl
      } else {
        window.location.href = gotoURL
      }
    }
  } else {
    window.alert('This prototype uses session storage to save inputted information. Unfortunately this browser cannot use session storage')
  }
}

function searchStart (inputIdName, searchString) {
  if (inputIdName.substring(0, searchString.length) === searchString) {
    return false
  } else {
    return true
  }
}

function searchEnd (inputIdName, searchString) {
  if (inputIdName.substring(inputIdName.length - searchString.length, inputIdName.length) === searchString) {
    return false
  } else {
    return true
  }
}

function reviewData () { // fill saved values into corresponding spans with same ID
  if (typeof (Storage) !== 'undefined') {
    var i
    var reviewPage = window.location.href
    var data = window.sessionStorage
    for (i = 0; i < data.length; i++) {
      var dataKey = data.key(i)
      // check element exists
      var element = document.getElementById(dataKey)
      if (element) {
      // check how the output should be formatted based upon the name given to span
        if (element.getAttribute('name') === 'newline') {
          element.innerHTML = data.getItem(dataKey) + '<br>'
        } else {
          element.innerHTML = data.getItem(dataKey) + ' '
        }
      }
    }
    data.reviewUrl = reviewPage
  } else {
    window.alert('This prototype uses session storage to save inputted information. Unfortunately this browser cannot use session storage')
  }
}

// link function to go to end of transaction page url
function goTo (pageUrl) {
  if (pageUrl) {
    window.location.href = pageUrl
  }
}
// clear all saved data in sessionStorage
function clearData () {
  if (typeof (Storage) !== 'undefined') {
    window.sessionStorage.clear()
    window.alert('All data entered has been deleted from the session storage.')
  } else {
    window.alert('This prototype uses session storage to save inputted information. Unfortunately this browser cannot use session storage')
  }
}
