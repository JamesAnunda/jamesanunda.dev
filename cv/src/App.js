import React, { Component } from 'react';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Certificate from './components/Certificate';
import Skills from './components/Skills';

class App extends Component {
  render() {

    const person = {
      avatar: 'https://gndx.co/wp-content/uploads/2017/05/oscar_barajas.jpg',
      name: 'James Anunda',
      profession: 'Junior Software Engineer ',
      bio: '❤ Full-Stack Developer',
      address: 'Indiana, United States',
      social: [
        {name: 'github', url: 'https://github.com/JamesAnunda'},
        {name: 'linkedin', url: 'https://www.linkedin.com/in/jamesanunda/'}
      ],
      experience: [
        {jobTitle: 'Junior Software Engineer', company: 'Naxos', startDate: 'Feb 2020', endDate: 'Present', jobDescription: 'Develop and Manage React Native app for OD Response.'},
        {jobTitle: 'Technology Summer Intern', company: 'Fort Wayne Community Schools', startDate: 'June 2019', endDate: 'Aug 2019', jobDescription: 'Helped install patch cables, run Cat5e and 6 cables to server rooms, Manage Audio-Visual Equiment for different buildins.'},
      ],
      education: [
        {degree: 'Associate of Applied Science', institution: 'Ivy Tech Community College', startDate: 'Aug 2018', endDate: 'Present', description: 'President of the Infomation Technology Club. Winner at Ivy Tech IT Challenge of 2019.'},
        // {degree: 'Ingenieria Atomica', institution: 'Harvard', startDate: 'Jan 2014', endDate: 'Decenber 2015', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'},
      ],
      certificate: [
        {name: 'Microsoft Office Specialist Outlook 2016', institution: 'Microsoft', date: 'May 2018', description: 'Microsoft Outlook 2016 Certification exam earners have an understanding of the Outlook environment and demonstrate the correct application of the principal features. Earners create professional-grade e-mail messages, maintain calendars across time zones, and schedule tasks. Application proficiency includes: coordinating resources, sending marketing campaigns, staff meetings, and assigning action items. Earners may include business professionals, executive assistants, and sales managers.' },
        {name: 'Microsoft Office Specialist PowerPoint 2016', institution: 'Microsofti', date: 'May 2016', description: 'Microsoft PowerPoint 2016 Certification exam earners have a fundamental understanding of the PowerPoint environment and demonstrate the correct application of PowerPoint 2016. Earners are able to create, edit, and enhance PowerPoint presentations, including those for professional grade sales presentations, employee training, instructional materials, and kiosk slideshows. PowerPoint earners may include business professionals, students, public speakers, sales, marketing staff, and educators.' }
      ],
      skills: [
        {name: 'HTML5', percentage: '95%'},
        {name: 'CSS', percentage: '90%'},
        {name: 'JavaScript', percentage: '50%'},
        {name: 'PHP', percentage: '35%'},
        {name: 'Angular', percentage: '25%'},
        {name: 'Wordpress', percentage: '25%'},
        {name: 'Network Administration', percentage: '85%'},
        {name: 'Photography', percentage: '45%'},
      ]
    };

    return (
      <header>
        <div className='wrapper'>
          <div className='sidebar'>
            <About
              avatar={person.avatar}
              name={person.name}
              profession={person.profession}
              bio={person.bio}
              address={person.address}
              social={person.social} />
          </div>

          <div className='content-wrapper'>
              <div className='content'>
                <Experience experience={person.experience} />
                <Education education={person.education} />
                <Certificate certificate={person.certificate} />
                <Skills skills={person.skills} />
              </div>
          </div>

        </div>
      </header>
    );
  }
}

export default App;
