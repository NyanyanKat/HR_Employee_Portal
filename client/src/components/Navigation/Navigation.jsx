import React, { useState } from 'react'
<<<<<<< HEAD
import { Route, useRouteMatch, Switch } from 'react-router-dom';
=======
import { Route, useRouteMatch,Switch } from 'react-router-dom';
>>>>>>> 508373231b4e822bb69a7a4c6a4d0d462202d0ed
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import auth from '../../utils/auth';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faBuildingUser, faAddressBook, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons'
import TopNavigation from "./TopNav/TopNavigation";
import styled from "styled-components";
import RegistrationToken from '../Hire/RegistrationToken';
import Employee from '../../hrPages/Employee';
<<<<<<< HEAD
import OneEmployee from '../../hrPages/OneEmployee';
import OnboardingReview from "../Hire/OnBoarding";
import Housing from "../../hrPages/Housing";
import OneHousing from "../../hrPages/OneHousing";
=======
import OnboardingReview from "../Hire/OnboardingReview"
import ViewOnboarding from '../Hire/ViewOnboarding';
import OnBoardingApp from '../../empPages/OnBoardingApp'


>>>>>>> 508373231b4e822bb69a7a4c6a4d0d462202d0ed


const Main = styled.main`
  position: relative;
  transition: all 0.15s;
  margin-left: ${(props) => (props.expanded ? 240 : 64)}px;
`;


export default function Sidebar(props) {
  const [expanded, setExpanded] = useState(false)
  const { path } = useRouteMatch();

  const handleLogout = () => {
    auth.logout()
  }

  return (
    <Route render={({ location, history }) => (
      <React.Fragment>
        <SideNav
          onToggle={() => { setExpanded(!expanded) }}
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
              <NavItem eventKey="hire/register">
                <NavText>Registration Token</NavText>
              </NavItem>
              <NavItem eventKey="hire/onboarding">
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

            <NavItem eventKey="logout" className="sidebar-logout" onClick={handleLogout}>
              <NavIcon><FontAwesomeIcon icon={faPowerOff} style={{ fontSize: "1.5em" }} /></NavIcon>
              <NavText>Log Out</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <Main expanded={expanded}>
          <TopNavigation />
          <div className="main-content-container">
<<<<<<< HEAD
            <Switch>
              <Route path="/hire/register" component={props => <RegistrationToken />} />
              <Route path="/hire/onboarding" component={props => <OnboardingReview />} />
              <Route path={'/employee'} exact component={props => <Employee />} />
              <Route path={'/employee/info/:id'} component={props => <OneEmployee />} />
              <Route path={'/housing/summary'} components={props => <Housing />} />
              <Route path={'/housing/:id'} component={props => <OneHousing />} />
            </Switch>

=======
          <Switch>
            <Route path="/hire/register" component={props => <RegistrationToken />} />
            <Route path="/hire/onboarding" exact component={props => <OnboardingReview />} />
            <Route path={`/hire/onboarding/view${path}`}  component={props => <ViewOnboarding />} />
            <Route path={'/employee'} component={props => <Employee />} />
            <Route path={`/onboarding`} component={props => <OnBoardingApp />} />
            </Switch>
>>>>>>> 508373231b4e822bb69a7a4c6a4d0d462202d0ed
          </div>
        </Main>
      </React.Fragment>
    )}
    />
  );
}
