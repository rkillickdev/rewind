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
| User clicks on brand name on the left of the navbar | User redirected to the home page | Pass |
| Hover over  and move away from brand name in nav bar | Link opacity added to brand name on hover and no opacity on moving away. Cursor turns to pointer | Pass |
| User hovers over nav bar links  | Link colour transformed on hover and returns to original on moving away. Cursor turns to pointer | Pass   |
| User hovers over hamburger toggler on screens below 992px | Link colour transformed on hover and returns to original on moving away. Cursor turns to pointer | Fail | 
| User clicks on hamburger toggler on screens below 992px when menu items collapsed | Vertical navbar links expanded | Pass |
| User clicks on hamburger toggler or anywhere else on the screen on screens below 992px when menu items expanded. | Vertical navbar links collapsed | Pass |
| Navigate between pages from nav bar links | Navbar link for active page text colour changes colour to indicate active | Pass |


## Footer

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |
| Hover over and move away from each footer icon link | Link colour transformed on hover and returns to original on moving away | |
| User clicks on GitHub Icon in footer | New browser tab opens displaying GitHub repo for Rewind | Fail |

## SnapshotsPage - HOME

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User navigates to home page  | Snapshots listed in descending order and sorted by date created.  Search bar and sort icons appear at top of page above first snapshot  | Pass |
| User scrolls through snapshots | More snapshots load automatically as user scrolls (if more than 10 exist) | Fail |
| User enters text into the search bar | Results filter dynamically with a 1 second pause after the user stops typing.  Snapshots will be displayed if text input matches any text in the title, era, genre or category of the snapshot | Pass |
| User enters text into the search bar that does not match any text in the defined API search fields | Message displayed to user, informing that no snapshots could be found and recommending to adjust their search phrase | Pass |
| User hovers over each of the sort icons | Icon colour transformed on hover and returns to original on moving away | Pass |
| User clicks on 'Recommendations' sort icon | Snapshots sorted by recommendation count (descending) without the page refereshing | Pass |
| User clicks on 'Comments' sort icon | Snapshots sorted by comment count (descending) without the page refereshing | Pass |
| User clicks on 'Date' sort icon | Snapshots sorted by date created (descending) without the page refereshing | Pass |

## Snapshot

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User navigates to home page | Each snapshot in the list displays an image, title, description (if it exists), profile avatar and name of the snapshot owner, and date created.  The number of recommendations and number of comments should be displayed for each snapshot.  If samples belong to the snapshot a waveform icon should be displayed | Pass |
| User hovers or clicks on recommendation icon | Icon colour transformed on hover and returns to original on moving away.  Tooltip displayed, informing user that they must sign in to recommend a snapshot | Pass |
| User hovers over comment icon | Icon colour transformed on hover and returns to original on moving away | Pass |
| User clicks on comments icon | User redirected to detail page for associated snapshot | Pass |
| User hovers over waveform icon | Opacity effect applied on hover and returns to original on moving away.  Tooltip displayed, informing user that samples are available for this snapshot | Pass |
| User clicks on waveform icon | User redirected to detail page for associated snapshot | Pass |

## SnapshotPage

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on snapshot image,comments icon or waveform icon | User redirected to detail page for associated snapshot.  Approved samples associated with the snapshot are listed in date created descending order below the snapshot. First 10 comments associated with the snapshot are displayed in date created descending order below any samples.  If no comments exist, display message to inform user | Pass |
| User scrolls through comments | More comments load automatically as user scrolls (if more than 10 exist) | Pass |
| User clicks play button of audio player | Playback of sample begins | Pass |
| User clicks pause button of audio player | Playback of sample stops | Pass |

## ProfilePage

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on avatar of a profile | User redirected to the profile page of the associated profile.  Stats for the snapshots count, followers count and following count associated with the profile are displayed along side the profile image, name and bio(if it exists).  All snapshots owned by the profile are listed below | Pass |

## **UNAUTHENTICATED USER**

## NavBar

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User enters site url https://rkdev-rewind-ed88f8459fe7.herokuapp.com/ in a web browser | Navbar displays links for Home, Sign In and Sign Up | Pass |
| User clicks on 'Home' navbar link | User redirected to the home page | Pass |
| User clicks on 'Sign Up' navbar link | User redirected to Sign Up Form | Pass |
| User clicks on 'Sign In' navbar link | User redirected to Sign In Form | Pass |

## SnapshotsPage - HOME

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User navigates to home page | Hero Image, 'Take a trip back in time' heading and call to action button displayed to right of snapshot list. (Appears above snapshot list on mobile devices below 992px) | Pass |
| User hovers over 'Get started' call to action button | Button colour transformed on hover and returns to original on moving away | Pass | 
| User clicks on 'Get started' call to action button | User redirected to 'Sign Up' page | Pass |


## SignUpForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |
| User hovers over 'Sign Up' button on sign up form | Button hover transformation applied | Pass |
| User clicks on 'Sign Up' button with a valid form | User redirected to Sign In Form prepopulated with new user details | Pass |
| User hovers over 'Sign In' redirect link | Link text colour changes to site secondary colour | Pass |
| User clicks on 'Sign In' redirect link | User redirected to Sign In Form | Pass |


### **CRUD**

### **Form Validation**

### **Defensive Programming**

## SignInForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User hovers over 'Sign In' button on login form  | Button hover transformation applied | Pass |
| User clicks on 'Sign In' button with a valid form | User logged in and redirected to the home page. A bootstrap toast is displayed to inform the user they are sucessfully logged in | Pass |
| User hovers over 'Sign Up' redirect link | Link text colour changes to site secondary colour | Pass |
| User clicks on 'Sign Up' redirect link | User redirected to Sign Up Form | Pass |

### **CRUD**

### **Form Validation**

### **Defensive Programming**

## **AUTHENTICATED USER**

## NavBar

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User enters site url https://rkdev-rewind-ed88f8459fe7.herokuapp.com/ in a web browser | Navbar displays links: Home, For You, Pinned, Sign Out and Profile Avatar | Pass |
| User clicks on 'Home' navbar link | User redirected to the home page | Pass |
| User clicks on 'For You' navbar link | User redirected to page displaying snapshots for profiles they are following | Pass |
| User clicks on 'Pinned' navbar link | User redirected to page displaying snapshots they have pinned | Pass |
| User clicks on 'Profile/ Avatar' navbar link | User redirected to their own profile page | Pass |
| User clicks on 'Sign Out' navbar link | User logged out.  A bootstrap toast is displayed to inform the user they are sucessfully logged out | Pass |

## Snapshot

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User hovers over or clicks on recommendation icon when they own the snapshot | Tooltip dsiplayed, informing user that they cannot recommend their own snapshot | Pass |
| User clicks on recommendation icon for a snapshot owned by another user | Recommendation icon turns solid colour and recommendation count increments by 1. Toast message displayed informing user they have recommended the snapshot | Pass |
| User clicks on recommendation icon for a snapshot they have already recommended | Recommendation icon turns to outline and recommendation count decreases by 1. Toast message displayed informing user they have removed recommendation for the snapshot | Pass |
| Hover and click on bookmark icon below snapshot | Icon outline changes colour on hover and turns solid colour on click to indicate that the snapshot has been pinned.  Toast message displayed informing user they have pinned the snapshot | Pass |
| Hover and click on bookmark icon below snapshot that has already been pinned | Icon changes colour on hover and turns to outline icon on click to indicate that the snapshot has been unpinned.  Toast message displayed informing user they have unpinned the snapshot | Pass |

## SnapshotPage

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on snapshot image, comments icon or waveform icon | User redirected to detail page for associated snapshot.  Sample upload form and Comment submit form displayed above snapshot.  Any samples that have been approved by site admin are visible to all users.  Samples that have not been approved are only visible to the owner.  For any comments owned by the current user, an edit and delete icon is displayed next to the comment.  For any samples owned by the current user, a delete icon is displayed next to the sample.  An edit and delete button is also displayed for the snapshot itself if the user owns the snapshot | Pass |
| User clicks on edit icon next to a snapshot they own | User redirected to Snapshot Edit Form | Pass |
| User clicks on delete icon next to a snapshot they own | Modal displayed to confirm deletion.  Upon confirming the action, snapshot deleted and removed from snapshot list. Snapshot count for the profile of the owner should decrease by 1.  Toast message displayed informing user they have deleted their snapshot | Pass |
| User attempts to post an empty comment | 'Post' button has opacity effect applied to indicate that it is disabled and clicking has no effect | Pass |
| User creates and submits a new comment | 'Post' button becomes active as the user types text.  Once posted, the comment appears at top of the comments list and toast message is displayed informing user they have added a comment.  Created date should display as 'now' initially.  Comment count should increase by 1 | Pass |
| User selects sample file and submits | Sample appears below snapshot with opacity effect applied. message to say that approval is pending.  A delete icon is displayed next to the sample | Fail |
| User clicks on edit icon next to a comment they own | Comment edit form displayed, prepopulated with existing comment | Pass |
| User clicks on Comment edit form cancel button | Comment edit form hidden | Pass |
| User amends comment and clicks on Comment edit form save button | Comment edit form hidden and amended comment content displayed.  Toast message displayed informing user they have updated their snapshot  | Pass |
| User clicks on delete icon next to a comment they own | Comment deleted and removed from comment list. Comment count should decrease by 1. Toast message displayed informing user they have deleted their comment | Pass |
| User clicks on delete icon next to a sample they own | Sample deleted and removed from sample list. Toast message displayed informing user they have deleted their sample | Pass |

## SnapshotsCreateForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |

### **CRUD**

### **Form Validation**

### **Defensive Programming**

## SnapshotEditForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on Snapshot Edit Form cancel button | User redirected back to Snapshot detail Page | Pass |
| User updates snapshot information and clicks save button | User redirected back to Snapshot detail Page and amended information displayed.  Toast message displayed informing user they have updated their snapshot | Fail |

## SnapshotsPage - FOR YOU

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |
| User navigates to 'For You' page | All snapshots belonging to any profiles that the current user is following should be displayed.  If the current user is not following any profiles, a message should inform them of this and encourage them to start following | Pass |
| User sets preferences for their profile | Snapshots are filtered based on user preferences | Pass |
| User updates preferences for their profile | Filtering of snapshots adjusted based on the updated user preferences | Pass |

### **CRUD**

### **Form Validation**

### **Defensive Programming**


## SnapshotsPage - PINNED

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |
| User navigates to 'Pinned' page | All snapshots that the user has pinned should be displayed.  If they have not pinned any snapshots, a message should inform them of this | Pass |
| User unpins a snapshot | The list of snapshots should be updated to reflect this change, with the unpinned snapshot no longer visible | Pass |

### **CRUD**

### **Form Validation**

### **Defensive Programming**

## RelevantProfile - HOME, FOR YOU, PINNED, PROFILE PAGE

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User navigates to home, 'For You' or 'Pinned' page | If the user has not added any preference information to their profile, a button directing them to their profile edit page will be dsiplayed to right of snapshot list. (Appears above snapshot list on mobile devices below 992px).  Once preferences have been set, suggested profiles to follow should be displayed based on user preferences.  The current user's profile should not be displayed as part of these suggestions | Fail |
| User clicks on the 'follow' button next a profile | Button changes to display 'unfollow'.  The 'followers' count for the selected profile and the 'following' count for the current user should increment by 1. | Pass |
| User clicks on the 'unfollow' button next a profile | Button changes to display 'follow'.  The 'followed' count for the selected profile and the 'following' count for the current user should decrease by 1. | Pass |

## ProfilePage

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| Authenticated user navigates to their own profile page | Icons for edit profile, change username and change password are displayed below their profile stats | Pass |
| User clicks on edit profile icon | User redirected to Profile Edit Form | Pass |
| User clicks on change username icon | User redirected to Username Form | Pass |
| User clicks on change password icon | User redirected to User Password Form | Pass |

## ProfileEditForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on Profile Edit Form cancel button | User redirected back to Profile Page | Pass |
| User updates profile information and clicks save button | User redirected back to Profile Page and amended information displayed.  Toast message displayed informing user they have updated their profile | Fail |

## UsernameForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on Username Form cancel button | User redirected back to Profile Page | Pass |
| User updates username and clicks save button | User redirected back to Profile Page and amended information displayed.  Toast message displayed informing user they have updated their username | Fail |
| User signs out and attempts sign in using updated username | User signed in successfully | Pass |

## UserPasswordForm

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
| User clicks on User Password Form cancel button | User redirected back to Profile Page | Pass |
| User updates, confirms updated password and clicks save button | User redirected back to Profile Page.  Toast message displayed informing user they have updated their password | Pass |
| User signs out and attempts sign in using updated password | User signed in successfully | Pass |

## Sign Out

### **Features**

| Action | Expected Outcome | Pass/Fail |
| ---- | ---- | :----: |
|  |  |   |



[Back to top &uarr;](#contents)

## **Validators**

### **PEP8 Validation:**

<br>

I passed all python files through the [Code Institute Python Linter](https://pep8ci.herokuapp.com/) and no errors are found. Results of this testing can be seen below:

<br>

App: rewind

| File | Errors | Result |
| :----: | :-------: | :------: |
| asgi.py | 0 | Passed |
| permissions.py | 0 | Passed |
| serializers.py | 0 | Passed |
| settings.py | 0 | FAILED |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |
| wsgi.py | 0 | Passed |

App: categories

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: comments

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: eras

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: followers

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: genres

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: pins

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: profiles

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: recommendations

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: samples

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

App: snapshots

| File | Errors | Result |
| :----: | :-------: | :------: |
| admin.py | 0 | Passed |
| apps.py | 0 | Passed |
| models.py | 0 | Passed |
| serializers.py | 0 | Passed |
| tests.py | 0 | Passed |
| urls.py | 0 | Passed |
| views.py | 0 | Passed |

Main Directory:

| File | Errors | Result |
| :----: | :-------: | :------: |
| manage.py | 0 | Passed |

<br>

[Back to top &uarr;](#contents)







