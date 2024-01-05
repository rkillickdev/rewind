# **Rewind**

<br>

Rewind has been developed as part of the [Code Institute](https://codeinstitute.net/) Diploma in Full Stack Software Development (Advanced Front End Portfolio Project #5).  The Django REST Framework has been used to build a backend API.  This returns JSON data to the front end which has been built using React.  The aim of the site is to provide a platform for a community of like minded music/technology enthusiasts who enjoy sharing snippets of nostalgia to evoke memories of the past and engaging in conversations about these snapshots in time.

## **CONTENTS**

* [User Experience (UX)](#user-experience-ux)
    * [Strategy Plane](#strategy-plane)
        * [Project Goals](#project-goals)
    * [Agile Methodology](#agile-methodology)
        * [Epics](#epics)
        * [User Stories](#user-stories)
    * [Scope Plane](#scope-plane)
    * [Skeleton Plane](#skeleton-plane)
        * [Wireframes](#wireframes)
        * [Database Schema](#database-schema)
    * [Structure Plane](#structure-plane)
        * [Features](#features)
    * [Surface Plane](#surface-plane)
* [Technologies Used](#technologies-used)
    * [Languages Used](#languages-used)
    * [Programs and Tools Used](#programs-and-tools-used)
    * [Frameworks and Libraries Used](#frameworks-and-libraries-used)
* [Testing](#testing)
* [Deployment and Local Development](#deployment-and-local-development)
* [Bugs](#bugs)
    * [Known Bugs](#known-bugs)
    * [Solved Bugs](#solved-bugs)
* [Credits](#credits)
    * [Code Used and Referenced](#code-used-and-referenced)
    * [Media](#media)
    * [Acknowledgements](#acknowledgements)

# **User Experience (UX)**

## **STRATEGY PLANE**

## **Project Goals**

<br>

[Back to top &uarr;](#contents)

## **AGILE METHODOLOGY**

[Back to top &uarr;](#contents)

### **Epics**

#### **EPIC: Navigation & User Authentication [#1](https://github.com/rkillickdev/rewind/issues/1)**

`
Users should be able to navigate the site effortlessly and access the site content in an intuitive manner. Certain features should only be accessible to authenticated users that have created a user profile.
`

#### **EPIC: Snapshot Lists [#8](https://github.com/rkillickdev/rewind/issues/8)**

`
Snapshots posted to the site should be available for all user to view, with authenticated users given additional control over the type of content they want to view.
`

#### **EPIC: Create Snapshots [#12](https://github.com/rkillickdev/rewind/issues/12)**

`
Logged in users should have the ability to post snapshots that will then be attached to their profile and available for other site users to enjoy.
`

#### **EPIC: Snapshot Details [#15](https://github.com/rkillickdev/rewind/issues/15)**

`
The detail page should display a specified snapshot post. All site users should have the ability to 'read' snapshots, logged in users should have the ability to comment on other user's snapshots and update/delete their own.
`

#### **EPIC: Like and Pin Snapshots [#21](https://github.com/rkillickdev/rewind/issues/21)**

`
As the user is viewing content on the site, they should have the ability to like snapshots and also pin any snapshot that catches their interest that they might want to return to later.
`

#### **EPIC: Profiles [#24](https://github.com/rkillickdev/rewind/issues/24)**

`
Logged in users should have the ability to update and tailor their own profile details. They should also be able to view the profiles of other site users and their associated snapshot posts. Users should be recommended other profiles to follow based on musical genre preferences specified in their own profiles
`

[Back to top &uarr;](#contents)

### **User Stories**

[Back to top &uarr;](#contents)

## **SCOPE PLANE**

In order to satisfy the goals outlined in the [strategy plane](#strategy-plane), I will implement the following features:

* Implement functionality for all users to read snapshots posted by other site users.
* Implement functionality for all users to read comments relating to user's snapshot posts.
* Implement functionality for all users to view the profiles of other site users.
* Implement functionality for users to create a user account and access additional site features.
* Implement functionality for logged in users to create and update their own snapshot posts.
* Implement functionality for logged in users to create, update and delete their own comments about a particular snapshot post. 
* Implement functionality for logged in users to like snapshots posted by other site users
* Implement functionality for logged in users to pin snapshots posted by other site users so they can easily return to it
* Implement functionality for displaying suggested profiles to logged  in users, based on their own musical preferences
* Implement functionality to allow logged in users to follow profiles they want to hear more from

[Back to top &uarr;](#contents)

## **SKELETON PLANE**

## **Wireframes**

Wireframes were created using [Balsamiq](https://balsamiq.com/wireframes/) and used as a blueprint for development of the site layout and structure.

## **Database Schema**

<br>

The following custom models have been implemented as part of the development process:

### **Profile**

An instances of the Profile model is created automatically when a user signs up for an account and is connected to the User model via a one to one field.  Users are able to edit the `name`, `bio` and `image` fields.

There is a many to many relationship connecting the Profile model to the Era, Genre and Category models.  This gives the user the ability to set their preferences for the type of snapshot posts they are most interested in viewing.  The many to many link means that a user could attach several different eras/ genres/ categories to their profile, and a single instance of an Era/ Genre/ Category can belong to many different profiles.

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /profiles | List all profiles | LIST |
| GET | /profiles/:id | Retrieve a profile by id | DETAIL |
| PUT | /profiles/:id | Update a profile by id | DETAIL |

<br>

### **Era / Genre/ Category**

Multiple instances of Era / Genre/ Category can belong to multiple profiles.  This data will then be used to tailor content presented to site users and make suggestions for other profiles to follow.  

The Era / Genre / Category models are linked to the Snapshot model via a foreign key field.  For example, a single instance of Era,Genre or Category can belong to many different instances of Snapshot.

The API endpoints detailed below have been built to allow for eventual implementation of 'Create', 'Read' and 'Update' functionality on these models from the front end.  Although not included in the initial scope of the project, building this functionality into the backend will allow for a future feature whereby a site administrator can add additional eras/ generes/ categories via the site interface rather than using the Django admin panel.  This functionality could be implemented in future sprints. 

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /eras | List all eras | LIST |
| POST | /eras | Create an era | LIST |
| GET | /eras/:id | Retrieve an era by id | DETAIL |
| PUT | /eras/:id | Update an era by id | DETAIL |

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /genres | List all genres | LIST |
| POST | /genres | Create a genre | LIST |
| GET | /genres/:id | Retrieve a genre by id | DETAIL |
| PUT | /genres/:id | Update a genre by id | DETAIL |

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /categories | List all categories | LIST |
| POST | /categories | Create a category | LIST |
| GET | /categories/:id | Retrieve a category by id | DETAIL |
| PUT | /categories/:id | Update a category by id | DETAIL |

<br>

### **Snapshot**

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /snapshots | List all snapshots | LIST |
| POST | /snapshots | Create a snapshot | LIST |
| GET | /snapshots/:id | Retrieve a snapshot by id | DETAIL |
| PUT | /snapshots/:id | Update a snapshot by id | DETAIL |
| DELETE | /snapshots/:id | Delete a snapshot by id | DETAIL |

<br>

### **Recommendation**

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /recommendations | List all recommendations | LIST |
| POST | /recommendations | Create a recommendation | LIST |
| GET | /recommendations/:id | Retrieve a recommendation by id | DETAIL |
| DELETE | /recommendations/:id | Delete a recommendation by id | DETAIL |

<br>

### **Comment**

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /comments | List all comments | LIST |
| POST | /comments | Create a comment | LIST |
| GET | /comments/:id | Retrieve a comment by id | DETAIL |
| DELETE | /comments/:id | Delete a comment by id | DETAIL |

<br>

### **Follower**

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /followers | List all followers | LIST |
| POST | /followers | Create a follower | LIST |
| GET | /followers/:id | Retrieve a follower by id | DETAIL |
| DELETE | /followers/:id | Delete a follower by id | DETAIL |

<br>

### **Pin**

### **API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /pins | List all pins | LIST |
| POST | /pins | Create a pin | LIST |
| GET | /pins/:id | Retrieve a pin by id | DETAIL |
| DELETE | /pins/:id | Delete a pin by id | DETAIL |

<br>

# **Technologies Used**

## **Languages Used**

## **Programs and Tools Used**

* [Git](https://en.wikipedia.org/wiki/Git) -  Version control.
* [GitHub](https://github.com/) - All files for the project stored and saved in a repository.
* [Gitpod](https://www.gitpod.io/) - IDE used to write the code, make git commits and push to GitHub.
* [Heroku](https://dashboard.heroku.com/apps) - For deployment of the project.
* [ElephantSQL](https://www.elephantsql.com/) - a PostgreSQL database used for the deployed production site.
* [Cloudinary](https://www.cloudimage.io/) - Used to store user uploaded images and audio files.
* [PEP8](https://pep8ci.herokuapp.com/) - CI Python Linter.
* [Black](https://www.freecodecamp.org/news/auto-format-your-python-code-with-black/) - Python Auto Formatter.
* [dbdiagram](https://dbdiagram.io/home) - Database Relationship Diagrams Design Tool.
* [Balsamiq](https://balsamiq.com/wireframes/) - Used to create wireframes.
* [Stackoverflow](https://stackoverflow.com/) - Used for researching solutions/ fixing bugs.

## **Frameworks and Libraries Used**

* [Django 3.2.23](https://www.djangoproject.com/) - High level Python web framework used in conjunction with DRF for development of the project backend.
* [Django REST Framework](https://www.django-rest-framework.org/) - Framework used to develop the backend API.

The [requirements.txt](requirements.txt) file provides information on required installations for this project.  Below are libraries that I installed to implement site functionality:

* [cloudinary](https://cloudinary.com/) - Python library to facilitate integration of cloudinary with Django
* [dj-databse-url](https://pypi.org/project/dj-database-url/) - A utility that allows use of the DATABASE_URL environment variable to configure a Django application.  This was used for connection to the PostgreSQL database.
* [dj3-cloudinary-storage](https://pypi.org/project/dj3-cloudinary-storage/) - A Django package that facilitates Cloudinary storage for media files used in the project.
* [django-filter](https://django-filter.readthedocs.io/en/stable/#) - Enables filtering of a queryset based on a Model's fields.
* [pillow](https://pypi.org/project/pillow/) - A Python Imaging Library that adds image processing capabilities to your Python interpreter.
* [django-allauth](https://docs.allauth.org/en/latest/) - An integrated set of Django applications addressing authentication, registration and account management.  Used to implement role based login functionality across the site.
* [djangorestframework-simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) - Provides a JSON Web Token authentication backend for the Django REST Framework.
* [dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/) - Provides a set of REST API endpoints to handle User Registration and Authentication tasks.

# **Credits**

## **Code Used and Referenced**

<br>

* [Display string representation of Many To Many Fields in json response rather than IDs](https://stackoverflow.com/questions/64079111/how-can-i-display-the-values-of-a-manytomany-field-in-django-rest-framework-inst)

* [Implementing Staff Only Permissions with Django REST Framework](https://stackoverflow.com/questions/31714198/staff-only-permissions-in-django-rest-framework)



