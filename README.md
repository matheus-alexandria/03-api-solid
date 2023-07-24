# GymPass style app
The third application in development during the Ignite Node 2022 course from Rocketseat, an API to a gympass style application.

## Functional Requirements:

- [x] It must be possible to sign up;
- [x] It must be possible to authenticate;
- [x] It must be possible to get the profile of a loged user;
- [x] It must be possible to get the number of check-ins made by the logged user;
- [x] It must be possible for the user to get his check-in history;
- [x] It must be possible for the user to search for near gyms;
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check-in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible register a gym;

## Business Rules:

- [x] The user shouldn't be able to register with a duplicated email;
- [x] The user shouldn't be able to check-in twice at the same day;
- [x] The user shouldn't be able to check-in if far away from the gym (more than 100m);
- [x] The check-in can only be validated 20 min after created;
- [  ] The check-in can only be validated by admin users;
- [  ] A gym can only be registred by admin users;


## Non-functional Requirements:

- [x] User's password must be encrypted;
- [x] Data must be persisted in a PostgreSQL database;
- [x] Every data list need to be paginated with 20 items per page;
- [  ] Each user must be identified by a JWT (JSON web token);