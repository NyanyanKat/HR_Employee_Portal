import React, { useEffect,useState } from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from '../../../utils/auth';
import Login from '../../Authentication/Login';
import Registration from '../../Authentication/Registration';
import AlertMsg from "../../AlertMsg/AlertMsg";
import ContentNotFound from "../../ContentNotFound/ContentNotFound"
import Home from '../../Home'


export default function TopNavigation() {
  const [token, setToken] = useState("")
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    setToken(urlParams.get('token'))
  },[])

  const handleLogout = () => {
    auth.logout()
  }
  const { path } = useRouteMatch();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='topNav'>
        <Container>
          <Navbar.Brand href="">HR PROJECT</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#"></Nav.Link> */}
            </Nav>
            <Nav>

              {/* conditional rendering */}
              {!auth.loggedIn() ? (
                <Nav.Link href="/login"><Button variant="outline-success">Login</Button></Nav.Link>
              ) : (
                <NavDropdown title={`welcome, ${auth.getUser().username}`} id="collasible-nav-dropdown">
                  {auth.getUser().onboardingStatus === "approved" && <NavDropdown.Item href="/profile">Personal Profile</NavDropdown.Item>} 
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AlertMsg></AlertMsg>
        {!auth.loggedIn() &&
          <Switch>
          <Route path={'/login'} component={props => <Login />} />
          {token ? <Route exact path={`/register${path}`}  component={props => <Registration />} />
          : <Route exact path={`/register`}  component={props => <ContentNotFound />} />}
          <Route path={'/:any'} component={props => <ContentNotFound />} />
          </Switch>
        }
    </>
  )
}