import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";


const ManagerListings = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/manager/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/manager/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:1016/api/manager/delete/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const [employeeNames, setEmployeeNames] = useState({});

useEffect(() => {
    fetch("http://localhost:1016/api/manager/")
        .then((res) => res.json())
        .then((managerData) => {
            managerData.forEach(manager => {
                Promise.all(manager.employes.map(id =>
                    fetch(`http://localhost:1015/api/employe/${id}`)
                        .then(response => response.json())
                        .then(employee => employee.nom)
                )).then(names => {
                    setEmployeeNames(prevState => ({ ...prevState, [manager.id]: names.join(', ') }));
                });
            });
            empdatachange(managerData);
        })
        .catch((err) => {
            console.log(err.message);
        })
}, [])




    useEffect(() => {
        fetch("http://localhost:1016/api/manager/").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <AnimatedPage>

        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Manager Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/manager/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <div className="divbtn">
                        <Link to="/" className="btn btn-primary">Employee</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Nom</td>
                                <td>Prenom</td>
                                <td>Departement</td>
                                <td>employes</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nom}</td>
                                        <td>{item.prenom}</td>
                                        <td>{item.departement}</td>
                                        <td>{employeeNames[item.id]}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
     </AnimatedPage>
    );
}

export default ManagerListings
