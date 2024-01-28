# **Rewind Testing**

## **CONTENTS**

* [Manual Testing](#manual-testing)
    * [User Story Testing](#user-story-testing)
    * [Full Testing](#full-testing)
    * [Defensive Testing](#defensive-testing)
    * [Form Testing](#form-testing)
    * [Javascript Testing](#javascript-testing)
* [Automated Testing](#automated-testing)
    * [Unit Testing](#unit-testing)
* [Validators](#validators)
    * [PEP8 Validation](#pep8-validation)
    * [JSHint Javascript Validation](#jshint-javascript-validation)
    * [W3C Markup HTML Validator](#w3c-html-markup-validator)
    * [W3C CSS Validator](#w3c-css-validator)
* [Performance](#performance)
    * [Lighthouse](#lighthouse)
    * [Wave Accessibility](#wave-accessibility)
* [Responsiveness](#responsiveness)

# **Manual Testing**

## **User Story Testing**

## **Full Testing**

## **ALL USERS**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User enters site url https://rkdev-rewind-ed88f8459fe7.herokuapp.com/ in a web browser  | User directed to home page  | Pass |

## NavBar

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on brand name on the left of the navbar | User redirected to the home page | |
| Hover over  and move away from brand name in nav bar | Link opacity added to brand name on hover and no opacity on moving away |
| User hovers over nav bar links  | Link colour transformed on hover and returns to original on moving away |   |
| User hovers over hamburger toggler on screens below 768px | Link colour transformed on hover and returns to original on moving away |   | 
| User clicks on hamburger toggler on screens below 768px when menu items collapsed | Vertical navbar links expanded | |
| User clicks on hamburger toggler on screens below 768px when menu items expanded | Vertical navbar links collapsed | |
| Navigate between pages from nav bar links | Navbar link for active page text colour changes to site primary colour | |


## Footer

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |
| Hover over and move away from each footer icon link | Link colour transformed on hover and returns to original on moving away | |
| User clicks on GitHub Icon in footer | New browser tab opens displaying GitHub repo for Rewind | |

## SnapshotsPage - HOME

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |

## **UNAUTHENTICATED USER**

## NavBar

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User enters site url https://rkdev-rewind-ed88f8459fe7.herokuapp.com/ in a web browser | Navbar displays links for Home, Sign In and Sign Up | |
| User clicks on 'Home' navbar link | User redirected to the home page | |
| User clicks on 'Sign Up' navbar link | User redirected to SignUpForm | |
| User clicks on 'Sign In' navbar link | User redirected to SignInForm | |

## SignUpForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |
| User hovers over 'Sign Up' button on sign up form | Button hover transformation applied | |
| User clicks on 'Sign Up' button with a valid form | User redirected to Sign In Form prepopulated with new user details | |
| User hovers over 'Sign In' redirect link | Link text colour changes to site primary colour | |
| User clicks on 'Sign In' redirect link | User redirected to Sign In Form | |


### **CRUD**

### **Form Validation**

### **Defensive Programming**

## SignInForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User hovers over 'Sign In' button on login form  | Button hover transformation applied |  |
| User clicks on 'Log In' button with a valid form | User redirected to the home page and a bootstrap toast displayed to inform the user they are sucessfully logged in | |
| User hovers over 'Sign Up' redirect link | Link text colour changes to site primary colour | |
| User clicks on 'Sign Up' redirect link | User redirected to Sign Up Form | |

### **CRUD**

### **Form Validation**

### **Defensive Programming**

## **AUTHENTICATED USER**

## NavBar

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User enters site url https://rkdev-rewind-ed88f8459fe7.herokuapp.com/ in a web browser | Navbar displays links: Home, For You, Pinned, Sign Out and Profile Avatar | |
| User clicks on 'Home' navbar link | User redirected to the home page | |
| User clicks on 'For You' navbar link | User redirected to page displaying profiles they are following | |
| User clicks on 'Pinned' navbar link | User redirected to page displaying profiles they have pinned | |
| User clicks on 'Sign Out' navbar link | User logged out | |

## SnapshotsPage - FOR YOU

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |

### **CRUD**

### **Form Validation**

### **Defensive Programming**

## SnapshotsPage - PINNED

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |

### **CRUD**

### **Form Validation**

### **Defensive Programming**

## SnapshotsCreateForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |

### **CRUD**

### **Form Validation**

### **Defensive Programming**



