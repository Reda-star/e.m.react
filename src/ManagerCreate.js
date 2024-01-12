import React from 'react'
import motion from 'framer-motion';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from './AnimatedPage';

const ManagerCreate = () => {
  
    const[id,idchange]=useState("");
    const[nom,nomchange]=useState("");
    const[prenom,prenomchange]=useState("");
    const[employes,employeschange]=useState("");
    const[departement,departementchange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');


    const addEmployee = () => {
        employeschange([...employes, selectedEmployee]);
        setSelectedEmployee('');
    }

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={nom,prenom,employes,departement,active};

    
      

      fetch("http://localhost:1016/api/manager/add",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/manager');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:1015/api/employe/")
            .then((res) => res.json())
            .then((employeeData) => {
                setEmployees(employeeData);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    

    return (
        <AnimatedPage>

        <div>
    
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Manager Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Nom</label>
                                            <input required value={nom} onMouseDown={e=>valchange(true)} onChange={e=>nomchange(e.target.value)} className="form-control"></input>
                                        {nom.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Prenom</label>
                                            <input value={prenom} onChange={e=>prenomchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>Employes</label>
                                        <select multiple={true} value={employes} onChange={e => employeschange(Array.from(e.target.selectedOptions, option => option.value))} className="form-control">
            {employees.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.nom}</option>
            ))}
        </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Departement</label>
                                            <input value={departement} onChange={e=>departementchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/manager" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
            </AnimatedPage>
    );
}

export default ManagerCreate
