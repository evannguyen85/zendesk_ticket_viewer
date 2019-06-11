# zendesk_ticket_viewer
#1. Description: The app is to respond to internship code challenge: Zendesk Ticket Viewer with following requirements:
- hh
  + Connect to the Zendesk API
  + Request the tickets for your account, page through tickets when more than 25 are returned
  + Display them in a list
  + Display individual ticket details

#2: Installation:
- The app is written using node.js, express. Connection to the Zendesk API is handled by a library named: request.
- Please ensure you have the following in your local machine:
  + node.js version: v11.14.0 or above
  + npm version: 6.9.0 or above

#3: Usage:
- Open terminal
- Clone the source code from githut at https://github.com/evannguyen85/zendesk_ticket_viewer.git
- After clone completed, cd to the source code folder (zendesk_ticket_viewer)
- Run the app by typing command: node app
    + Please ensure that there is no node running in your local machine before you start running this app :)
- Open chrome (preferred) or your favourite browser.
- Access the app: http://localhost:3000/tickets
    + Showing all tickets (100 tickets), 25 tickets per page.
    + Scroll down to see paging.
    + Click details button to see the details of a ticket.

#4: Important Notes:
- When you clone the source code from github, please make sure there is node_modules folder. If for some reason, the folder is missing, please do an install: "npm install --save express ejs request" to install required libraries.

- Due to time constraints (I got the challenge at the last minutes), I have not done styling for the app yet. So it might not look good for now :)