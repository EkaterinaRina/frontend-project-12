import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getToken } from '../store/getSelectors';

const PrivateRoute = ({ children }) => {
  const token = useSelector(getToken);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
