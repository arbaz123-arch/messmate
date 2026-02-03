import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddMessForm from '../components/AddMessForm';
import MessList from '../components/MessList';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  const handleMessAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>MessMate Dashboard</h1>

      <button onClick={logout}>Logout</button>
      <hr />

      <AddMessForm onMessAdded={handleMessAdded} />
      <MessList refresh={refresh} />
    </div>
  );
};

export default Dashboard;
