// import React from 'react';
// import MessList from './components/MessList';

// function App() {
//   return (
//     <div className="App">
//       <h1>MessMate – Find Your Mess</h1>
//       <MessList />
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import MessList from './components/MessList';
import AddMessForm from './components/AddMessForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleMessAdded = () => {
    setRefresh(!refresh); // Toggle to trigger refresh in MessList
  };

  return (
    <div className="App">
      <h1>MessMate – Manage Mess Listings</h1>
      <AddMessForm onMessAdded={handleMessAdded} />
      <hr />
      <MessList refresh={refresh} />
    </div>
  );
}

export default App;
