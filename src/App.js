import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';
import ManagerListings from './ManagerListings';
import ManagerCreate from './ManagerCreate';
import ManagerDetail from './ManagerDetail';
import ManagerEdit from './ManagerEdit';


function App() {
  return (

    <div className="App">
      <h1>Employee & Manager Operations</h1>
      
      <h3>Made By</h3>

    <h1> <Typewriter
      options={{
        strings: ['Reda Belouch', 'Ousseynou Dione', 'Othmane Soumari '],
        autoStart: true,
        loop: true,
      }}
    /> </h1>
      <BrowserRouter>

      <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employe/create' element={<EmpCreate />}></Route>
          <Route path='/manager' element={<ManagerListings />}></Route>
          <Route path='/manager/create' element={<ManagerCreate />}></Route>
          <Route path='/manager/detail/:empid' element={<ManagerDetail />}></Route>
          <Route path='/manager/edit/:empid' element={<ManagerEdit />}></Route>



          <Route path='/employe/detail/:empid' element={<EmpDetail />}></Route>
          <Route path='/employe/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
       
      </BrowserRouter>
    </div>
  );

}

export default App;
