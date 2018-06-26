The name of this project is Collaborate, it was built for teams to help them collaborate. 
In this app, a teamlead can log in, create projects, add team members to project. Each project created have 4 features; a 'Schedule' page that allows team leads to add calendar items, it also syncs with google calendar, a 'Manage Task' page that allows team leads to create and assign task to team members, a visual page that shows a the current status of task completed vs task pending, a 'Message Board' that allows project members to add,delete & edit messages. The app also had a chat functionality that allows team leads and team members to chat.
There is an option to alert a team member by SMS when they are added to a project but that is currently only available in test and not on production.

The app allows team mebers to sign in, view assigned task, mark task off as completed and post itmes to the message board. 

Whenever a team member is added to a project or assigned a task, an email is sent to the team member and whenever a team member marks a task off as completed, an email is sent to the team lead,

Technologies used are React, Express, Postgres, SendGrid(for emails), Pusher(for chat messaging), firebase(for storage), Twilio(for text messaging), Froala Editor, ChartJS for visualization.