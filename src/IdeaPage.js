import React from 'react';
import ProjectCard from './ProjectCard';
import LeftColumn from './LeftColumn';
import Search from './Search';
import LoadMore from './LoadMore';
import Navbar from './Navbar';

export default function IdeaPage(props) {
  const options = [
    { value: 'Likes', label: 'Likes' },
    { value: 'Members Needed', label: 'Members Needed' },
    { value: 'Complete', label: 'Complete' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Creation Date', label: 'Creation Date' },
    { value: 'APIs Used', label: 'APIs Used' }
  ];
  const items = [
    {
      id: 1,
      text: "Suggest Idea",
      desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium.",
      link: "/community/projects/ideas"
    }
  ];
  const links = [
    {
      id: 1,
      text: "Community",
      link: "/community"
    },
    {
      id: 2,
      text: "Projects",
      link: "/community/projects"
    },
    {
      id: 3,
      text: "Project Ideas",
      link: "/community/projects/ideas"
    }
  ];
  return (
    <div>
      <Navbar links={links} />

      <div className="section row">
        <div className="col m2 left-column">
          <LeftColumn items={items}/>
        </div>

        <div className="col m10">
          <Search options={options}/>

          <div className="col m3">
            <ProjectCard />
          </div>
          <div className="col m3">
            <ProjectCard />
          </div>
          <div className="col m3">
            <ProjectCard />
          </div>
          <div className="col m3">
            <ProjectCard />
          </div>
          <div className="col m3">
            <ProjectCard />
          </div>
          <div className="col s12">
            <LoadMore text="Load More Ideas..." />
          </div>
        </div>

      </div>

    </div>
  );
}
