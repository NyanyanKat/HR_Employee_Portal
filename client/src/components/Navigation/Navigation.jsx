import React, { useEffect, useState } from 'react'
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import auth from '../../utils/auth';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faBuildingUser, faAddressBook, faPowerOff, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons'
import TopNavigation from "./TopNav/TopNavigation";
import styled from "styled-components";
import RegistrationToken from '../Hire/RegistrationToken';
import Employee from '../../hrPages/Employee';
import OneEmployee from '../../hrPages/OneEmployee';
import Housing from "../../hrPages/Housing";
import OneHousing from "../../hrPages/OneHousing";
import OnboardingReview from "../Hire/OnboardingReview"
import ViewOnboarding from '../Hire/ViewOnboarding';
import OnBoardingApp from '../../empPages/OnBoardingApp'
import HousingEmp from "../../empPages/HousingEmp";
import AddHousing from '../../hrPages/AddHousing';
import AddTenant from '../../hrPages/AddTenant';
import HousingReport from '../../hrPages/HousingReport';
import api from '../../api/api';
import PersonalInfo from '../../empPages/PersonInfo';
import Visa from '../../empPages/EmpVisa';
import HrVisa from '../HrVisa'
import ContentNotFound from "../ContentNotFound/ContentNotFound"
import Home from "../Home"

const Main = styled.main`
  position: relative;
  transition: all 0.15s;
  margin-left: ${(props) => (props.expanded ? 240 : 64)}px;
`;


export default function Sidebar(props) {
  const [expanded, setExpanded] = useState(false)
  const [isCitizen, updateCitizen] = useState(false)
  const { path } = useRouteMatch();

  const handleLogout = () => {
    auth.logout()
  }

  useEffect(() => {
    api.getOneOnboarding(auth.getUser().id)
      .then(res => {
        // console.log(res.data.citizenship.citizen)
        updateCitizen(res.data.citizenship.citizen)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      {auth.getUser().role === "employee"
        ? (
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
                  <Avatar name={auth.getUser().username} round={true} size={38} className="avatar"  color={Avatar.getRandomColor('sitebase', ['#d4dee1', '#d9efd7', '#ffe4e0'])}/>
                </div>

                {/* Sidebar Menu */}
                <SideNav.Nav defaultSelected="home">
                  {auth.getUser().onboardingStatus !== "approved" && (
                    <NavItem eventKey="onboarding">
                      <NavIcon><FontAwesomeIcon icon={faClipboardList} style={{ fontSize: "1.8em" }} /></NavIcon>
                      <NavText>Onboarding Application</NavText>
                    </NavItem>
                  )
                  }

                  {auth.getUser().onboardingStatus === "approved" && (!isCitizen) && (
                    <NavItem eventKey="employee/visa">
                      <NavIcon><FontAwesomeIcon icon={faCcVisa} style={{ fontSize: "1.5em" }} /></NavIcon>
                      <NavText>Visa Status Management</NavText>
                    </NavItem>
                  )}

                  {auth.getUser().onboardingStatus === "approved" && (
                    <NavItem eventKey="employee/housing">
                      <NavIcon><FontAwesomeIcon icon={faBuildingUser} style={{ fontSize: "1.5em" }} /></NavIcon>
                      <NavText>My Housing</NavText>
                      {/* <NavItem eventKey="employee/housing">
                        <NavText>My Housing</NavText>
                      </NavItem>
                      <NavItem eventKey="employee/housing/detail">
                        <NavText>abc</NavText>
                      </NavItem>
                      <NavItem eventKey="employee/housing/report">
                        <NavText>abc</NavText>
                      </NavItem> */}
                    </NavItem>
                  )
                  }

                  <NavItem eventKey="logout" className="sidebar-logout" onClick={handleLogout}>
                    <NavIcon><FontAwesomeIcon icon={faPowerOff} style={{ fontSize: "1.5em" }} /></NavIcon>
                    <NavText>Log Out</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <Main expanded={expanded}>
                <TopNavigation />
                <div className="main-content-container">
                  {auth.loggedIn() &&
                    <Switch>
                      <Route path="/" exact component={props => <Home />} />
                      <Route path="/employee/housing" component={props => <HousingEmp />} />
                      <Route path={`/onboarding`} component={props => <OnBoardingApp />} />
                      <Route path={`/profile`} component={props => < PersonalInfo />} />
                      <Route path={`/employee/visa`} component={props => < Visa />} />
                      <Route path={`/login`} component={props => <Home />} />
                      <Route path={'*'} component={props => <ContentNotFound />} />
                    </Switch>
                  }
                </div>
              </Main>
            </React.Fragment>
          )}
          />

        ) : (  //hr Sidebar
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
                  <Avatar name={auth.getUser().username} round={true} size={38} className="avatar" color={Avatar.getRandomColor('sitebase', ['lightpink', 'lightgreen', 'lightblue'])}/>
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

                  <NavItem eventKey="hr/visa">
                    <NavIcon><FontAwesomeIcon icon={faCcVisa} style={{ fontSize: "1.5em" }} /></NavIcon>
                    <NavText>Visa Status Management</NavText>
                  </NavItem>

                  <NavItem eventKey="housing">
                    <NavIcon><FontAwesomeIcon icon={faBuildingUser} style={{ fontSize: "1.5em" }} /></NavIcon>
                    <NavText>Housing</NavText>
                    <NavItem eventKey="hr/housing/summary">
                      <NavText>Summary View</NavText>
                    </NavItem>
                    <NavItem eventKey="hr/housing/add">
                      <NavText>Adding Houses</NavText>
                    </NavItem>
                    {/* <NavItem eventKey="hr/housing/report">
                      <NavText>Inbox Message</NavText>
                    </NavItem> */}
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

                  {auth.loggedIn() &&
                    <Switch>
                      <Route path="/" exact component={props => <Home />} />
                      <Route path="/hire/register" component={props => <RegistrationToken />} />
                      <Route path="/hire/onboarding" exact component={props => <OnboardingReview />} />
                      <Route path={`/hire/onboarding/view${path}`} component={props => <ViewOnboarding />} />

                      <Route path="/hr/visa" component={props => <HrVisa />} />

                      <Route path={'/employee'} exact component={props => <Employee />} />
                      <Route path={`/employee/info/:eid`} component={props => <OneEmployee />} />

                      <Route path={'/hr/housing/one/:id'} component={props => <OneHousing />} />
                      <Route path={'/hr/housing/summary'} component={props => <Housing />} />
                      <Route path={'/hr/housing/add'} component={props => <AddHousing />} />
                      <Route path={'/hr/housing/addTenant/:id'} component={props => <AddTenant />} />
                      <Route path={'/hr/housing/report/:id'} component={props => <HousingReport />} />

                      <Route path={`/login`} component={props => <Home />} />
                      <Route path={'*'} component={props => <ContentNotFound />} />
                    </Switch>
                  }
                </div>
              </Main>
            </React.Fragment>
          )}
          />
        )
      }
    </>
  );
}
