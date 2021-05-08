import React from 'react';
import './styles/Contact.css';

class Contact extends React.Component {
  render() {
    return (
      <div>
        <div id="contact-title">NoCap Team</div>
        <div id="contact-list">
          <div className="profile-container">
            <div className="circular--landscape">
              <img src="Anna.jpeg" alt="Anna" />
            </div>
            <div>
              <div className="name">Anna Litovskaya</div>
              <a href="https://www.linkedin.com/in/alitovskaya/">LinkedIn</a>
              <span> - </span>
              <a href="https://github.com/AnnaLitovskaya">Github</a>
            </div>
          </div>
          <div className="profile-container">
            <div className="circular--landscape">
              <img src="Alcott.jpeg" alt="Alcott" />
            </div>
            <div>
              <div className="name">Alcott Vernon</div>
              <a href="/Contact">LinkedIn</a>
              <span> - </span>
              <a href="https://github.com/capReynolds">Github</a>
            </div>
          </div>
          <div className="profile-container">
            <div className="circular--landscape">
              <img src="Damien.jpg" alt="Damien" />
            </div>
            <div>
              <div className="name">Damien Outar</div>
              <a href="https://www.linkedin.com/mwlite/in/damien-outar-391878112">
                LinkedIn
              </a>
              <span> - </span>
              <a href="https://github.com/damien868">Github</a>
            </div>
          </div>
          <div className="profile-container">
            <div className="circular--landscape">
              <img src="Sam.png" alt="Sam" />
            </div>
            <div>
              <div className="name">Sam Fedenia</div>
              <a href="https://www.linkedin.com/in/sam-fedenia">LinkedIn</a>
              <span> - </span>
              <a href="https://github.com/samfedenia">Github</a>
            </div>
          </div>
          <div className="profile-container">
            <div className="circular--landscape">
              <img src="Stephan.jpeg" alt="Stephan" />
            </div>
            <div>
              <div className="name">Stephan Alas</div>
              <a href="https://www.linkedin.com/in/stephan-alas-3a98631b9/">
                LinkedIn
              </a>
              <span> - </span>
              <a href="https://github.com/stephanalas">Github</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
