import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faBuildingUser, faAddressBook, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons'

export default function Sidebar(props) {
  const [toggle, setToggle] = useState(true)
  return (
    <Router>
      <Route render={({ location, history }) => (
        <React.Fragment>
          <SideNav
            onToggle={() => { props.handleExpaned(toggle); setToggle(!toggle) }}
            onSelect={(selected) => {
              const to = '/' + selected;
              if (location.pathname !== to) {
                history.push(to);
              }
            }}
          >
            <SideNav.Toggle />

            {/* User Basic Info */}
            <div className="sidebar-avatar-container">
              <Avatar name="Danling Sun" round={true} size={38} className="avatar" />
            </div>

            {/* Sidebar Menu */}
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="hire">
                <NavIcon><FontAwesomeIcon icon={faRegistered} style={{ fontSize: "1.8em" }} /></NavIcon>
                <NavText>Hiring Management</NavText>
                <NavItem eventKey="register">
                  <NavText>Registration Token</NavText>
                </NavItem>
                <NavItem eventKey="onboarding">
                  <NavText>Onboarding Application</NavText>
                </NavItem>
              </NavItem>

              <NavItem eventKey="employee">
                <NavIcon><FontAwesomeIcon icon={faAddressBook} style={{ fontSize: "1.7em" }} /></NavIcon>
                <NavText>Employee Profiles</NavText>
              </NavItem>

              <NavItem eventKey="visa">
                <NavIcon><FontAwesomeIcon icon={faCcVisa} style={{ fontSize: "1.5em" }} /></NavIcon>
                <NavText>Visa Status Management</NavText>
              </NavItem>

              <NavItem eventKey="housing">
                <NavIcon><FontAwesomeIcon icon={faBuildingUser} style={{ fontSize: "1.5em" }} /></NavIcon>
                <NavText>Housing</NavText>
                <NavItem eventKey="housing/summary">
                  <NavText>Summary View</NavText>
                </NavItem>
                <NavItem eventKey="housing/add">
                  <NavText>Adding Houses</NavText>
                </NavItem>
                <NavItem eventKey="housing/report">
                  <NavText>Inbox Message</NavText>
                </NavItem>
              </NavItem>

              <NavItem eventKey="logout" className="sidebar-logout">
                <NavIcon><FontAwesomeIcon icon={faPowerOff} style={{ fontSize: "1.5em" }} /></NavIcon>
                <NavText>Log Out</NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </React.Fragment>
      )}
      />
    </Router>
  );
}