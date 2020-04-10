# nidirect-prototypeForm
## user guide
Once you have a local copy of the nidirect-prototypeForm repository you can start building your prototype in a HTML editor.
### Background
In January 2020, the [nidirect user experience model (UXM)](http://uxm.nidirect.gov.uk/index.html) moved from the [Bootstrap framework (version 3)](https://getbootstrap.com/docs/3.4/) to a nidirect branded version of the [GOV.UK frontend framework (version 3.6.0)]( https://github.com/alphagov/govuk-frontend).
The prototype kit reflects this change using the [gov.uk design system - components](https://design-system.service.gov.uk/components/) to create the prototype.
### How does it work?
The prototype kit consists of 3 HTML template pages to build your prototype with:
```
|_ formPage-1.html
|_ checkPage.html
|_ endPage.html
```
#### formPage
The form page is used to display the [gov.uk design system - components](https://design-system.service.gov.uk/components/) that make up your service prototype.

Each form page collects, validates, and saves the entered values into the browser’s session storage. 

When the **save and continue** button is pressed, if there are no errors to show, the browser will go  to the next form page.

You can have as many form pages as you need for your service. I would suggest naming each form page sequentially, i.e. `formPage-1.html`, `formPage-2.html`, `formPage-3.html`


#### checkPage
The check page uses the GOV.UK Design System [check answers pattern](https://design-system.service.gov.uk/patterns/check-answers/) to let users check and change their answers saved in the session storage. 
You can have only one check page per service in this version of the prototype kit.
#### endPage
The end page is used to let the users know they’ve completed the service successfully.
The end page contains a link `clear session` in the footer. 
```
<li>
    <!-- clear data entered and return to start page -->
    <a class="govuk-link" href="formPage-1.html" onclick="clearData()">Clear session</a>
</li>
```
In usability testing, use this link to clear the user data saved in the session storage and return to the first page of your service. In the example above, the browser will go to the page `formPage-1.html`.
