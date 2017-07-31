import React from 'react';
import PersonCard from './PersonCard';
import Search from './Search';
import LoadMore from './LoadMore';
import Navbar from './Navbar';

export default function Developers(props) {
  const options = [
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Number of Projects', label: 'Number of Projects' },
    { value: 'Year', label: 'Year' }
  ];
  const links = [
    {
      id: 1,
      text: "Community",
      link: "/community"
    },
    {
      id: 2,
      text: "Developers",
      link: "/community/developers"
    }
  ];
  return (
    <div>

      <Navbar links={links} />

      <div className="container">
        <div className="section row">

          <div className="col m12">
            <Search options={options}/>

            <div className="col m3">
              <PersonCard name="Aaron Bargotta" year="'19" projects={10} saved={3}/>
            </div>
            <div className="col m3">
              <PersonCard name="Bill Adams" year="'19" projects={5} saved={15}/>
            </div>
            <div className="col m3">
              <PersonCard name="Lucy Swartz" year="'19" projects={3} saved={1}/>
            </div>
            <div className="col m3">
              <PersonCard name="Frank Timmy" year="'19" projects={3} saved={1}/>
            </div>
            <div className="col m3">
              <PersonCard name="Tom Liltz" year="'19" projects={3} saved={1}/>
            </div>
            <div className="col m3">
              <PersonCard name="Henry Dung" year="'19" projects={3} saved={1}/>
            </div>
            <div className="col m3">
              <PersonCard name="Yan Sully" year="'19" projects={3} saved={1}/>
            </div>
            <div className="col m3">
              <PersonCard name="Will Hunt" year="'19" projects={3} saved={1}/>
            </div>

            <div className="col s12">
              <LoadMore text="Load More Developers..." />
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
