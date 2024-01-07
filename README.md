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

The aim of the site is to create a community for music/technology enthusiasts with a particular emphasis on the ability to share memories and reminisce.  The term 'nostalgia' can be defined as "a feeling of sadness mixed with pleasure and affection when you think of happy times in the past".  This is a powerful emotion to tap into and cyclical patterns can be seen in fashion, music and technology.  Some music events and festivals are promoted with the emphasis on nostalgia, but this does not limit the market to those who witnessed trends and movements the first time round.  It is also engaging a new generation and there is enthusiasm for 'Retro'.  The resurgence in the Vinyl market is a great demonstration of this.  There was a point

* People who experienced these trends and technologies the first time round
* Younger who are only now being exposed to these technologies

<br>

[Back to top &uarr;](#contents)

## **AGILE METHODOLOGY**

This project was approached following the principles of Agile Development, building the solution incrementally through repeated iterations.  Initially, 6 [epics](#Epics) were defined.  These were broad definitions of functionality for the site that would not fit into a single iteration.

Epics were then broken down into user stories and logged as issues on GitHub using the following [customised template](https://github.com/rkillickdev/rewind/blob/main/.github/ISSUE_TEMPLATE/user-story.md).  Acceptance Criteria were defined as part of each user story to clearly present the objectives and conditions that must be satisfied for the user story to be marked as complete.  Implementation of the user story was then broken down into tasks - technical work required to facilitate execution of the user story.  Each user story was given a story points label to indicate the estimated amount of work required to complete the story.

A 7th [DRF API Epic](https://github.com/rkillickdev/rewind/issues/30) was defined to plan work required to build the backend API using the Django REST Framework.  This epic was broken down into the key backend resources required to implement the functionality of the site.  Relevant user stories were linked and tasks allocated to complete the build of each resource. 

A [Product Backlog](https://github.com/rkillickdev/rewind/milestone/1) milestone was created on GitHub to establish a 'single authoritative source of work'.  I initially moved all user stories to the backlog before they were allocated to sprints.  The product backlog was refined throughout the course of development with user stories reprioritised as the project evolved.

Timeboxing was used throughout the development of the project.  Week long 'sprints' (otherwise referred to as iterations) were defined using Milestones on Github.  User stories from the product backlog were then allocated to a sprint following the principles of MoSCoW prioritisation.  Each user story was assigned a label specifying "Must Have", "Could Have" or "Should Have" to indicate expectation of its completion.  Stories were then tackled according to level of priority.  When defining prioritisation levels for each user story in a sprint, I was mindful that the percentage of "Must Haves" should 'not exceed 60% of the overall effort planned for the iteration'.  A 20% contingency of "Could Haves" was set, therefore leaving the remaining 20% for "Should Haves".  If it was clear that a user story would not be completed in the current sprint, it was labelled as "Won't Have" and returned to the Product Backlog.  This was then allocated to a future sprint with a higher prioritisation level.

Throughout the development process, I used a kanban board to provide up to date information about the status of progress for each iteration.  The board was created and managed using GitHub Projects and can be viewed [here](https://github.com/users/rkillickdev/projects/5).

User stories for each sprint were initially allocated to the 'Todo' column and then transferred to the 'In Progress' column as they were worked on.  Once each task for the user story had been completed and all acceptance criteria satisfied, the issue was marked as complete and moved to the 'Done' column.

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

#### **EPIC: Recommend and Pin Snapshots [#21](https://github.com/rkillickdev/rewind/issues/21)**

`
As the user is viewing content on the site, they should have the ability to recommend snapshots and also pin any snapshot that catches their interest that they might want to return to later.
`

#### **EPIC: Profiles [#24](https://github.com/rkillickdev/rewind/issues/24)**

`
Logged in users should have the ability to update and tailor their own profile details. They should also be able to view the profiles of other site users and their associated snapshot posts. Users should be recommended other profiles to follow based on musical genre preferences specified in their own profiles
`

[Back to top &uarr;](#contents)

### **User Stories**

#### **EPIC: Navigation & User Authentication [#1](https://github.com/rkillickdev/rewind/issues/1)**

* As a user I can access a navbar on every page so that navigation of the site is intuitive [#2](https://github.com/rkillickdev/rewind/issues/2)
* As a user I can navigate the content of the site without the page refreshing so that content is accessed quickly and user experience is enhanced [#3](https://github.com/rkillickdev/rewind/issues/3)
* As a user I can sign up and create a user account so that I can access additional site functionality only available to authenticated users [#4](https://github.com/rkillickdev/rewind/issues/4)
* As a user I can sign in using my existing credentials so that I can view my account and continue enjoying site functionality only accessible to authenticated users [#5](https://github.com/rkillickdev/rewind/issues/5)
* As a user I can see whether I am already logged in so that I am aware of my status and the features of the site I can access [#6](https://github.com/rkillickdev/rewind/issues/6)
* As a user I can sign out from the site so that no one else using my device can access my account [#7](https://github.com/rkillickdev/rewind/issues/7)

#### **EPIC: Snapshot Lists [#8](https://github.com/rkillickdev/rewind/issues/8)**

* As a user I can view all snapshots posted so that I can get an overview of the type of content available on the site and decide whether I would like to sign up [#9](https://github.com/rkillickdev/rewind/issues/9)
* As a user I can search snapshots by keywords so that I can filter results displayed by their text content or by the profile of the poster [#10](https://github.com/rkillickdev/rewind/issues/10)
* As a user I can choose to order the list by 'most liked' or 'most talked about' so that I can view most popular snapshots first [#11](https://github.com/rkillickdev/rewind/issues/11)
* As a user I can filter the list of snapshots on the home page by era, genre and category so that I can view snapshots most relevant to my interests [#39](https://github.com/rkillickdev/rewind/issues/39)

#### **EPIC: Create Snapshots [#12](https://github.com/rkillickdev/rewind/issues/12)**

* As a logged in user I can post image snapshots so that I can share my nostalgic memories with other site users [#13](https://github.com/rkillickdev/rewind/issues/13) 
* As a logged in user I can upload audio clips when creating a snaphot so that I can share audio memories with other site users [#14](https://github.com/rkillickdev/rewind/issues/14)

#### **EPIC: Snapshot Details [#15](https://github.com/rkillickdev/rewind/issues/15)**

* As a user I can view a snapshot detail page so that I can read the full description of the snapshot and any associated comments [#16](https://github.com/rkillickdev/rewind/issues/16)
* As a logged in user I can edit my own snapshots so that I can update and amend the details of my original post [#17](https://github.com/rkillickdev/rewind/issues/17)
* As a logged in user I can comment on another user's snapshot so that I can share my thoughts and interact with the Rewind community [#18](https://github.com/rkillickdev/rewind/issues/18)
* As a logged in user I can edit my own comments so that I can amend and update my thoughts [#19](https://github.com/rkillickdev/rewind/issues/19)
* As a logged in user I can delete my own comments so that I can control whether a previous comment remains visible to other site users [#20](https://github.com/rkillickdev/rewind/issues/20)

#### **EPIC: Recommend and Pin Snapshots [#21](https://github.com/rkillickdev/rewind/issues/21)**

* As a logged in user I can recommend a snapshot so that I can show my appreciation of another user's post and encourage others to view it [#22](https://github.com/rkillickdev/rewind/issues/22)
* As a logged in user I can pin any snapshots of interest while browsing the site so that I can build a list of posts to return to later [#23](https://github.com/rkillickdev/rewind/issues/23)

#### **EPIC: Profiles [#24](https://github.com/rkillickdev/rewind/issues/24)**

* As a logged in user I can edit the details of my profile so that I can update my profile pic, bio details and preferences for era, musical genre and category [#25](https://github.com/rkillickdev/rewind/issues/25)
* As a user I can view the profile pages of other site users so that I can learn more about them and the type of content they are posting [#26](https://github.com/rkillickdev/rewind/issues/26)
* As a logged in user I can update my username and password so that I can choose how my name is displayed to other users and to ensure my login credentials remain secure [#27](https://github.com/rkillickdev/rewind/issues/27)
* As a logged in user I can view suggested profiles so that I can decide whether their previous snapshot posts are of interest to me [#28](https://github.com/rkillickdev/rewind/issues/28)
* As a logged in user I can choose to follow profiles that are posting interesting content so that I can be updated with more of their posts in the future [#29](https://github.com/rkillickdev/rewind/issues/29)

[Back to top &uarr;](#contents)

## **SCOPE PLANE**

In order to satisfy the goals and user stories outlined in the [strategy plane](#strategy-plane), I will implement the following features:

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

![rewind final database schema](docs/database-schema/pp5-rewind-database-schema.png)

The following custom models have been implemented as part of the development process:

### **PROFILE**

An instances of the Profile model is created automatically when a user signs up for an account and is connected to the User model via a one to one field.  Users are able to edit the `name`, `bio` and `image` fields.

There is a many to many relationship connecting the Profile model to the Era, Genre and Category models.  This gives the user the ability to set their preferences for the type of snapshot posts they are most interested in viewing.  The many to many link means that a user could attach several different eras/ genres/ categories to their profile, and a single instance of an Era/ Genre/ Category can belong to many different profiles.

### **Profile API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /profiles | List all profiles | LIST |
| GET | /profiles/:id | Retrieve a profile by id | DETAIL |
| PUT | /profiles/:id | Update a profile by id | DETAIL |

### **ERA / GENRE/ CATEGORY**

Multiple instances of Era / Genre/ Category can belong to multiple profiles.  This data will then be used to tailor content presented to site users and make suggestions for other profiles to follow.  

The Era / Genre / Category models are linked to the Snapshot model via a foreign key field.  For example, a single instance of Era,Genre or Category can belong to many different instances of Snapshot.

The API endpoints detailed below have been built to allow for eventual implementation of 'Create', 'Read' and 'Update' functionality on these models from the front end.  Although not included in the initial scope of the project, building this functionality into the backend will allow for a future feature whereby a site administrator can add additional eras/ generes/ categories via the site interface rather than using the Django admin panel.  This functionality could be implemented in future sprints.

The `IsAdminUser` class from the rest_framwork permissions has been included in the views for eras, genres and categories to ensure only staff users can access the following API endpoints.

### **Era API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /eras | List all eras | LIST |
| POST | /eras | Create an era | LIST |
| GET | /eras/:id | Retrieve an era by id | DETAIL |
| PUT | /eras/:id | Update an era by id | DETAIL |

### **Genre API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /genres | List all genres | LIST |
| POST | /genres | Create a genre | LIST |
| GET | /genres/:id | Retrieve a genre by id | DETAIL |
| PUT | /genres/:id | Update a genre by id | DETAIL |

### **Category API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /categories | List all categories | LIST |
| POST | /categories | Create a category | LIST |
| GET | /categories/:id | Retrieve a category by id | DETAIL |
| PUT | /categories/:id | Update a category by id | DETAIL |

### **SNAPSHOT**

As noted above, there is a 'One To Many' relationship linking the Era, Genre and Category models to the Snapshot model.  The User model is also linked to the Snapshot model via a 'One To Many' relationship, whereby a single instance of User can own many instances of Snapshot.  When a new instance of Snapshot is created (only avaialable to authenticated users), the owner field of the Snapshot model is automatically populated with the logged in user.  The perform_create method defined in the [snapshots/views](snapshots/views.py) takes care of this task.  Authenticated users are able to perform full CRUD functionality on the Snaphot model, although the ability to Update or Delete an instance is only available if the user owns the specified instance.

### **Snapshot API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /snapshots | List all snapshots | LIST |
| POST | /snapshots | Create a snapshot | LIST |
| GET | /snapshots/:id | Retrieve a snapshot by id | DETAIL |
| PUT | /snapshots/:id | Update a snapshot by id | DETAIL |
| DELETE | /snapshots/:id | Delete a snapshot by id | DETAIL |

### **RECOMMENDATION**

The Snapshot model is linked to the Recommendation model via a 'One To Many relationship' - Many instances of Recommendation can belong to a single instance of Snapshot.  As was the case with the Snapshot model above, the User model is also linked to the Recommendation model via a 'One To Many' relationship.  The relationship is automatically established each time a new instance of Recommendation is created. Authenticated users are able Create and Retrieve instances of Recommendation and delete them if the user owns the instance.  There is no need to provide the ability to update an istance of Recommendation, and this is reflected in the specified API Endpoints below.

### **Recommendation API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /recommendations | List all recommendations | LIST |
| POST | /recommendations | Create a recommendation | LIST |
| GET | /recommendations/:id | Retrieve a recommendation by id | DETAIL |
| DELETE | /recommendations/:id | Delete a recommendation by id | DETAIL |

### **COMMENT**

There are 'One To Many' relationships between User / Snapshot models and Comment Model.  Many comments could be associated with either a single User or Snapshot.  All users can retrieve comments, authenticated users can create an instance and update/delete an instance if they are the owner. 

### **Comment API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /comments | List all comments | LIST |
| POST | /comments | Create a comment | LIST |
| GET | /comments/:id | Retrieve a comment by id | DETAIL |
| PUT | /comments/:id | Update a comment by id | DETAIL |
| DELETE | /comments/:id | Delete a comment by id | DETAIL |

### **FOLLOWER**

There are two relationships between the User model and the Follower model.  Both are 'One To Many' relationships.  It is important to include 'related_names' in this case to distinguish between the two.  A user could be connected to an instance of Follower because they are the owner (i.e. following another user), or because they are being 'followed'.  Either way, many instances of Follower can be associated with a User.  They might be following many others, or being followed by many others.  Authenticated users can 'follow' another user (i.e. create an instance).  There is no need to include an API endpoint for updating an instance of Follower.  Deleting an instance is the equivalent of 'unfollowing' another user and can only be carried out by an authenticated user who owns the instance.

### **Follower API Endpoints**
___

| HTTP REQUEST | URI | CRUD Operation | View Type |
| ------------ | --- | -------------- | --------- |
| GET | /followers | List all followers | LIST |
| POST | /followers | Create a follower | LIST |
| GET | /followers/:id | Retrieve a follower by id | DETAIL |
| DELETE | /followers/:id | Delete a follower by id | DETAIL |

### **PIN**

Relationship between User and Snapshot models via 'One To Many' relationship.  Authenticated users can create a new pin.  If the authenticated user also owns the pin they can delete it. 

### **Pin API Endpoints**
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
* [psycopg2](https://pypi.org/project/psycopg2/) - A Python PostgreSQL Database Adapter.

# **Deployment and Local Development**

I made sure to keep my requirements.txt file up to date throughout, running the command `pip3 freeze > requirements.txt` from the terminal whenever any new libraries were installed.  It is important that all requirements are added to this before deployment so Heroku installs the necessary dependencies.

In development mode, the sqlite3 database provided by Django was used but this was not suitable for use in a production environment.  The deployed site uses a PostreSQL database hosted by [elephantSQL](https://www.elephantsql.com/) that Heroku can access.  It was therefore necessary to create an account with elephantSQL, and create a new database instance selecting the Tiny Turtle(free) plan.  My database instance is also named 'rewind'.  From the ElephantSQL dashboard, clicking on the database reveals a 'details' page where you can access the database URL, which is necessary for use in both the production and development environments.

To implement functionality of the PostgreSQL database with Django, the following libraries were installed using the terminal command:

```
pip3 install dj_database_url==0.5.0 psycopg2
```

The database URL contains information that should not be exposed publicly and therefore must not be pushed to the GitHub repository.  For development purposes I stored the database URL in the env.py file which had been added to the gitignore file.  I did not connect to the production Postgres database from my development environment until I was sure that the models were functioning and included all the fields I required.  I used the following code in my settings.py file to enable switching between development and production databases.

```python
if 'DEV' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get("DATABASE_URL"))
    }
```

Once happy with the functionality of my models, I temporarily commented out the 'DEV' environment variable so that the IDE could connect with the external database and migrated changes using the following command in the terminal:

```
python3 manage.py migrate
```

Any time I made an amendment to a model, once I had thoroughly tested in development mode I then switched and migrated these changes to the production database.

## **Heroku Deployment**

The following steps were followed to deploy the site to Heroku:

1.  Create an account and login to [Heroku](https://id.heroku.com/login)
2.  In the Heroku dashboard, click the 'New' button at the top right of the screen and then select "Create new app".
3.  I selected the name 'rkdev-rewind' ,set my region to Europe and clicked on the 'Create app' button.

4.  Click on the settings tab and then click the 'Reveal Config Vars' button.

<br>

# **Credits**

## **Code Used and Referenced**

<br>

* [Display string representation of Many To Many Fields in json response rather than IDs](https://stackoverflow.com/questions/64079111/how-can-i-display-the-values-of-a-manytomany-field-in-django-rest-framework-inst)

* [Implementing Staff Only Permissions with Django REST Framework](https://stackoverflow.com/questions/31714198/staff-only-permissions-in-django-rest-framework)



