import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import logo from '../../sars-cov19.png'
import moment from 'moment'

const NavbarComponent = () => {
    return (
        <Navbar className="shadow" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
                <img src={logo} alt="coronavirus-logo" />
            </Navbar.Brand>
            <Navbar.Toggle>
                <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Item>
                        <h5 className="text-danger">Coronavirus COVID-19</h5>
                    </Nav.Item>
                </Nav>
                <h5 className="text-danger my-2 my-lg-0">
                    Last Updated: {moment().subtract(2, 'days').format('MM-DD-YYYY')}
                </h5>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent