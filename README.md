# nidirect-prototypeForm
**version 1.0.0**

This is a JavaScript based prototyping kit. The aim of the kit is to allow designers, with minimal coding skills, to create interactive prototypes for [nidirect]( https://www.nidirect.gov.uk/) services.

Interactive prototypes are good for usability testing because they act like a real application.

Your prototype will help you:
* explore and test design ideas much faster and at lower risk than using code
* ensure your design is the right one for your users before coding

## Limitations
Do not use the prototype kit for production. Prototypes made with the kit do not have the same security or accessibility provisions as a real service. You should only use the kit to create prototypes for user research and usability testing.

## Security
If you publish your prototypes online, you must protect them with a username and password. This is to stop members of the public finding prototypes and thinking they are real services.
You must protect user privacy at all times, even when using prototypes. Always make sure you are handling user data appropriately. 


## Installation
If you haven't yet, you should first [set up Git]( https://help.github.com/en/github/getting-started-with-github/set-up-git). Don't forget to [set up authentication to GitHub from Git]( https://help.github.com/en/articles/set-up-git#next-steps-authenticating-with-github-from-git) as well.

### Step 1: fork the nidirect-prototypeForm repository
1.	On [GitHub]( https://github.com/), navigate to the [nidirect-prototypeForm]( https://github.com/DavidMcClelland-uxm/nidirect-prototypeForm) repository

2.	In the top-right corner of the page, click **Fork**.

    ![click the fork button to create a copy of the nidirect-prototypeForm in your own repository](https://www.davidcreative.co.uk/github/prototypeForm_images/protoForm-guide-fork.png)

### Step 2: create a clone URL of your fork
1.	In your GitHub account, navigate to **your fork** of the nidirect-prototypeForm repository. 
2.	Under the repository name, click **Clone or download**.

    ![click the clone or download button](https://www.davidcreative.co.uk/github/prototypeForm_images/protoForm-guide-clone.png)
3.	Using the **Clone with HTTPS** option, copy the web URL

    ![click the copy to clipboard button to copy the web URL of your repository](https://www.davidcreative.co.uk/github/prototypeForm_images/protoForm-guide-copyURL.png)
    
### Step 3: download the clone to your computer via command line
4.	Open Terminal (macOS) or Command prompt (Windows)
5.	Type `cd` followed by the path of the folder, on your computer, you want to clone the repository to.
    
    For example `cd document/repos`    
6.	Type `git clone`, and then paste the URL you copied in **step 2**.

    It will look like this, with your GitHub username instead of `YOUR-USERNAME`:
    
    ```git clone https://github.com/YOUR-USERNAME/nidirect-prototypeForm.git```
7.	Press **Enter**. Your local clone will be created.


Now, you have a local copy of your fork of the nidirect-prototypeForm repository.

## Using the protoype kit

Once you have a local copy of the nidirect-prototypeForm repository you can start building your prototype in a HTML editor.

### Background
In January 2020, the [nidirect user experience model (UXM)](http://uxm.nidirect.gov.uk/index.html) moved from the [Bootstrap framework (version 3)](https://getbootstrap.com/docs/3.4/) to a nidirect branded version of the [GOV.UK frontend framework (version 3.6.0)]( https://github.com/alphagov/govuk-frontend).

The prototype kit reflects this change using the components in the [gov.uk design system](https://design-system.service.gov.uk/components/) to create the prototype alongside nidirect branded header and footer components.

