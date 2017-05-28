import React from 'react';

const demoApi = {
  title: 'Course Offerings',
  categories: ['Courses', 'Athletics', 'Events'],
  description: 'Provides XML and JSON streams of course offerings data.',
  technical: <p>URL parameters:<br/>With no parameters, gives basic info about the current term.<br/><i>term=list</i> just gives a list of the available, published terms, their names, identifiers and active dates.<br/><i>term=current</i> gives results for the term currently in session (Spring, Summer or Fall).<br/><i>term=NNNN</i> - Gives course info for the requested term, using Registrar's 4-digit term ID. (Can also specify comma-separated list of term IDs.)<br/><i>term=all</i> - Use all available terms (typically about three years worth of data are available.)<br/><i>term=</i> - If no term parameter is given, then it finds the latest available Fall or Spring term and uses that (i.e., the upcoming term if it has been published by the Registrar.)<br/><i>subject=list</i> - Gives just a list of subjects for the requested term, just the subject name and dept info.<br/><i>subject=ABC,DEF</i> - (Comma-separated list of subject codes) gives info on all courses for the requested term &amp; subject(s).<br/><i>subject=all</i> - Gives info on all courses for the requested term.<br/><i>catnum=101</i> - Given valid subject and catnum parameters, it will return all the information about that one course. This is the (usually) 3-digit catalog number, so to get a full listing of the info for just ART101, specify "subject=ART&amp;catnum=101". Ignores inst, list and meet params (below).<br/><i>track=UGRD</i> - Returns only courses in the undergrad track (typically catnum&lt;500). If no track param is given, then all courses are returned.<br/><i>track=GRAD</i> - Returns only courses in the graduate track (typically catnum&gt;=500).<br/><i>inst=no</i> - Do not include instructors tags in the course list output.<br/><i>list=no</i> - Do not include crosslistings tags in the course list output.<br/><i>meet=no</i> - Do not include meetings tags in the course list output.<br/>For inst, list and meet, any value other than 'no' means 'yes', and they default to yes if not specified at all.<br/><i>brief=yes</i> - Do not include the detail tag (contains most course info fields other than title, such as status and description), nor the instructors, crosslistings and meetings tags.<br/><i>fmt=json</i> - Output in JSON format instead of default XML. Alternatively, you can include the HTTP request header "Accept: application/json" to let it know that you want JSON output.<br/>Data is updated from PeopleSoft generally every few minutes.</p>,
  versions: [
    {
      version: '1.4',
      date: '07/29/2014',
      status: 'available',
      xsd: 'http://etcweb.princeton.edu/webfeeds/xsd/courseofferings-1_4.xsd',
      description: 'Added instructor full name.',
    },
    {
      version: '1.3',
      date: '07/02/2014',
      status: 'available',
      xsd: 'http://etcweb.princeton.edu/webfeeds/xsd/courseofferings-1_3.xsd',
      description: 'Added support for term=all parameter value.',
    },
    {
      version: '1.2.1',
      date: '05/22/2014',
      status: 'offline',
      xsd: 'http://etcweb.princeton.edu/webfeeds/xsd/courseofferings-1_2.xsd',
      description: 'Added support for subject=all parameter value; improved speed.',
    },
    {
      version: '1.2',
      date: '11/21/2012',
      status: 'offline',
      xsd: 'http://etcweb.princeton.edu/webfeeds/xsd/courseofferings-1_2.xsd',
      description: '',
    }
  ]
};

export default demoApi;
