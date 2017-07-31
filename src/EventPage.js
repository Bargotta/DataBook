import React from 'react';
import Navbar from './Navbar';

export default function EventPage(props) {
  const links = [
    {
      id: 1,
      text: "Community",
      link: "/community"
    },
    {
      id: 2,
      text: "Events",
      link: "/community/events"
    }
  ];
  return (
    <div>
      <Navbar links={links} />
      <div className="container">
        <h1>All Events</h1>
      </div>
    </div>
  )
}
