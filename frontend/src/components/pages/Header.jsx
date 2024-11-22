import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { getToken } from '../../store/getSelectors';

const Header = () => {
  const { t } = useTranslation();
  const token = useSelector(getToken);
  const { logOut } = useAuth();

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">
            {t('header.title')}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <Button variant="primary" onClick={logOut}>
                {t('header.quit')}
              </Button>
            ) : ('')}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
