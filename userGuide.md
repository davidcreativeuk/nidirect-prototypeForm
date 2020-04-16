# nidirect-prototypeForm: user guide

Once you have a local copy of the nidirect-prototypeForm repository you can start building your prototype in a HTML editor.
## Background
In January 2020, the [nidirect user experience model (UXM)](http://uxm.nidirect.gov.uk/index.html) moved from the [Bootstrap framework (version 3)](https://getbootstrap.com/docs/3.4/) to a nidirect branded version of the [GOV.UK frontend framework (version 3.6.0)]( https://github.com/alphagov/govuk-frontend).
The prototype kit reflects this change by using the [gov.uk design system - components](https://design-system.service.gov.uk/components/) to create the prototype.
## How does it work?
The prototype kit uses JavaScript and the browser’s Session Storage to save and retrieve values entered by the user.

The kit consists of 3 HTML template pages to build your prototype with:

```
|_ formPage-1.html
|_ checkPage.html
|_ endPage.html
```
### formPage
The form page is used to display the [gov.uk design system - components](https://design-system.service.gov.uk/components/) that make up your service prototype.

Each form page collects, validates, and saves the entered values into the browser’s Session Storage. 

### checkPage
The check page uses the GOV.UK Design System [check answers pattern](https://design-system.service.gov.uk/patterns/check-answers/) to let users check and change their answers saved in the Session Storage. 

You can have only one check page per service prototype in this version of the prototype kit.

### endPage
The end page is used to let the users know they’ve completed the service successfully.

