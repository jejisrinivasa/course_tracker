import { BrowserRouter as Router, Route } from 'react-router-dom';
import CourseDetails from './components/CourseDetails';
import CreateUser from './components/CreateUser';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <div className="container">
      <UserContextProvider>
        <Router>
          <Navbar />
          <Route path='/' exact component={UserForm} />
          <Route path='/createUser' exact component={CreateUser} />
          <Route path='/users' exact component={UserList} />
          <Route path='/users/:name' exact component={CourseDetails} />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
