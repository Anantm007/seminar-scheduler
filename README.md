# seminar-scheduler

## About the Project

This is a Seminar Hall/Auditorium Scheduler project built for my college Maharaja Surajmal Institute (MSI) and Maharaja Surajmal Institute of Technology (MSIT), Janakpuri, New Delhi. The main purpose of the project is to ease out the process of booking and conducting various workshops, seminars and other sessions in the auditoriums and various seminar halls of the college.

## Project Setup

```javascript
1. Clone the repo
2. cd seminar-scheduler
3. npm install
4. make a .env file with the following keys: MONGOURI, JWTSECRET, EmailId, EmailPass, EmailName
5. cd client
6. npm install
7. cd ..
5. npm run dev
6. Open the project on 127.0.0.1:3000
```

## The Problem / Need for this application

Whenever a seminar or workshop or placement drive has to be conducted in any hall or auditorium in the college there is a formal process of “booking” the respective seminar hall by enquiring with the respective hall/auditorium incharges. This not only wastes the time of the students as well as the incharges but also increases the chances of disputes or confusions with respect to the availability of the seminar hall. So, there was an urgent need to automate this process and that’s why IEEE MSIT took the initiative to solve this by building a Seminar Scheduler web application for MSI and MSIT.

## Features of the Application

1. The starting point of this application is that anybody can check whether a particular seminar hall is available at a particular time slot or not, on a particular working day. This feature is public at the moment so that any society can check whether the hall is available or not quickly.

2. Coming to the main part of the application, we have set up an authentication system for both societies and hall incharges. That means, to book a "slot", a society needs to login, enter the seminar hall details (the date, time, hall number along with event details such as name and a short description). An email intimation is sent to the respective incharge. When the incharge logs in, they can view all the requests in an organised manner and then accept or reject the request based on their sole discretion.

3. If the seminar hall is not available for booking then an error message is displayed and no request for booking is made to the respective incharge.

4. If the seminar hall is available then the incharge confirms it via their dashboard and confirmation is sent back to the organizer.

5. Emails with a formal request are generated and sent, so the societies can take a print out and submit to the college for offline record.

- We have not made any registration feature as this application is not meant to be used by all the students in the college. So, we will just sign up the seminar hall incharges and societies ourselves and send them the credentials. They can change the password if they wish to via the forgot password feature.

## Technology Stack

##### MERN stack

- MongoDB
- Express.js
- React.js
- Node.js

##### Dependencies

- axios
- bcryptjs
- body-parser
- dotenv

* jsonwebtoken
* nodemailer
* mongoose
* react-bootstrap

## Missing Features / Future Improvements

- [ ] Manage approval for multiple incharges for one seminar hall.
- [ ] Forming a priority queue based system.
- [ ] Sending reminders a day before the event.
