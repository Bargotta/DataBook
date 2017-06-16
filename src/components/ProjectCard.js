import React from 'react';
import HoverCard from './HoverCard';
import PersonIcon from './PersonIcon';
import { CardTitle, CardText } from 'material-ui/Card';

export default function ProjectCard(props) {
  return (
    <HoverCard href="/project/123">
      <CardTitle title="ReCal" subtitle="A student-made course selection tool for Princeton students." />
      <CardText>
        <strong><PersonIcon size="50" /><PersonIcon size="50" /><PersonIcon size="50" /></strong>
      </CardText>
    </HoverCard>
  );
}
