import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import EditAssignment from './components/EditAssignment';
import AddAssignment from './components/AddAssignment';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/gradeAssignment" component={GradeAssignment} />
              <Route path='/editAssignment' component={EditAssignment} />
              <Route path='/addAssignment' component={AddAssignment} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
