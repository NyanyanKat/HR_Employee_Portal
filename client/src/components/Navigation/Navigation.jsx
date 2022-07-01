import React, { useEffect, useState } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
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
import HousingEmp from "../../empPages/Housing";
import AddHousing from '../../hrPages/AddHousing';
import api from '../../api/api';


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
              <NavItem eventKey="hire/housing">
                <NavText>Onboarding Housing</NavText>
              </NavItem>
            </NavItem>
            {auth.getUser().role === "employee"
              ? ( //Employee Sidebar
                <>
                  {auth.getUser().onboardingStatus !== "approved" && (
                    <NavItem eventKey="onboarding">
                      <NavIcon><FontAwesomeIcon icon={faClipboardList} style={{ fontSize: "1.8em" }} /></NavIcon>
                      <NavText>Onboarding Application</NavText>
                    </NavItem>
                  )
                  }

                  {!isCitizen  && (
                    <NavItem eventKey="/employee/visa">
                      <NavIcon><FontAwesomeIcon icon={faCcVisa} style={{ fontSize: "1.5em" }} /></NavIcon>
                      <NavText>Visa Status Management</NavText>
                    </NavItem>
                  )}


                  {auth.getUser().onboardingStatus === "approved" && (
                    <NavItem eventKey="housing">
                      <NavIcon><FontAwesomeIcon icon={faBuildingUser} style={{ fontSize: "1.5em" }} /></NavIcon>
                      <NavText>Housing</NavText>
                      <NavItem eventKey="employee/housing">
                        <NavText>abc</NavText>
                      </NavItem>
                      <NavItem eventKey="employee/housing/detail">
                        <NavText>abc</NavText>
                      </NavItem>
                      <NavItem eventKey="employee/housing/report">
                        <NavText>abc</NavText>
                      </NavItem>
                    </NavItem>
                  )
                  }
                </>
              )
              : ( //HR Siderbar
                <>
                  <NavItem eventKey="hire">
                    <NavIcon><FontAwesomeIcon icon={faRegistered} style={{ fontSize: "1.8em" }} /></NavIcon>
                    <NavText>Hiring Management</NavText>
                    <NavItem eventKey="hire/register">
                      <NavText>Registration Token</NavText>
                    </NavItem>
                    <NavItem eventKey="hire/onboarding">
                      <NavText>Onboarding Application</NavText>
                    </NavItem>
                    <NavItem eventKey="hire/housing">
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
                </>
              )
            }

            <NavItem eventKey="logout" className="sidebar-logout" onClick={handleLogout}>
              <NavIcon><FontAwesomeIcon icon={faPowerOff} style={{ fontSize: "1.5em" }} /></NavIcon>
              <NavText>Log Out</NavText>
            </NavItem>
          </SideNav.Nav >
        </SideNav >
        <Main expanded={expanded}>
          <TopNavigation />
          <div className="main-content-container">
          <Switch>
            <Route path="/hire/register" component={props => <RegistrationToken />} />
            <Route path="/hire/onboarding" exact component={props => <OnboardingReview />} />
            <Route path={`/hire/onboarding/view${path}`}  component={props => <ViewOnboarding />} />
            <Route path="/housing" component={props => <HousingEmp />} />
            <Route path={'/housing/:id'} component={props => <OneHousing />} />
            <Route path={'/employee'} exact component={props => <Employee />} />
            <Route path={`/employee/info/:eid`} component={props => <OneEmployee />} />
            {/* <Route path='/employee/info/:id' element={<OneEmployee />} /> */}
            <Route path={`/onboarding`} component={props => <OnBoardingApp />} />
            <Route path={'/housing/summary'} components={props => <Housing />} />
            <Route path={'/housing/add'} components={props => <AddHousing />} />
            </Switch>
          </div>
        </Main>
      </React.Fragment >
    )
    }
    />
  );
}
