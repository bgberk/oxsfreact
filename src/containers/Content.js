import React from 'react'
import MyCalendar from './MyCalendar'
import FormModal from './FormModal'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

/* HOME */

export const Home = () => {
	return (
		<div>
			<h2>This is the home component.</h2>
		</div>
		)
}

/* CALENDAR */

// const eventList = [
//   {
//     title: 'test event',
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3)),
//     desc: 'this is a test event.',
//     location: 'Wellington',
//     guestcount: 5,
//     type: 'Activity'
//   },
//   {
//     title: 'birthday',
//     start: new Date(new Date().setHours(new Date().getHours() - 10)),
//     end: new Date(new Date().setHours(new Date().getHours() - 8)),
//     desc: 'don\'t forget it\'s your birthday!',
//     location: 'Pomona',
//     guestcount: 42,
//     type: 'Meeting'
//   },
//   {
//     title: 'middle',
//     start: new Date(new Date().setHours(new Date().getHours() - 6)),
//     end: new Date(new Date().setHours(new Date().getHours() - 5)),
//     desc: 'this is the middle event',
//     location: 'Melbourne',
//     guestcount: 3,
//     type: 'Academic'
//   },
//   {
//     title: 'constant event',
//     start: new Date(2018, 4, 10, 8, 0, 0),
//     end: new Date(2018, 4, 10, 9, 0, 0),
//     desc: 'this event should not change days'
//   }
// ]

export const Calendar = () => (
  <Query
    query={gql`
      {
        allEvents {
          desc
          end
          guestcount
          location
          start
          title
          type
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error, sad.</p>;

      const {allEvents} = data

      //convert datestrings in DB to datetime format for big calendar
      function convertToDate (event, index) {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }
      }
      
      return (
        <div>
          <h2>This is the calendar component</h2>
          <MyCalendar events={allEvents.map(convertToDate)} />
        </div>
        )
    }}    
  </Query>
)

/* MESSAGES */

export const Messages = () => {
	return (
		<div>
			<h2>This is the messages component.</h2>
		</div>
		)
}

/* ADDING EVENTS */
export const AddEventForm = () => {
  return (
    <div>
      <h2>This is the event form.</h2>
      <FormModal />
    </div>
    )
}