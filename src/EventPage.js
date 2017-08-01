import React from 'react';

import Navbar from './Navbar';
import EventCard from './EventCard';

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
        <div className="section row">
          <div className="col s12 m4">
            <EventCard
              href="/community/events"
              desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed."
            >
              Workshops
            </EventCard>
          </div>
          <div className="col s12 m4">
            <EventCard
              href="/community/events"
              desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed."
            >
              Student Groups
            </EventCard>
          </div>
          <div className="col s12 m4">
            <EventCard
              href="/community/events"
              desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed."
            >
              COS Events
            </EventCard>
          </div>
          <div className="col s12 m4">
            <EventCard
              href="/community/events"
              desc="lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed."
            >
              HackLab
            </EventCard>
          </div>
        </div>
      </div>
    </div>
  )
}
