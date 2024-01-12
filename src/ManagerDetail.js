import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";


const ManagerDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});


    const [employeeNames, setEmployeeNames] = useState('');

useEffect(() => {
    if (empdata.employes) {
        Promise.all(empdata.employes.map(id =>
            fetch(`http://localhost:1015/api/employe/${id}`)
                .then(response => response.json())
                .then(employee => employee.nom)
        )).then(noms => {
            setEmployeeNames(noms.join(', '));
        });
    }
}, [empdata])

    useEffect(() => {
        fetch("http://localhost:1016/api/manager/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    

    return (
        <AnimatedPage>

        <div>

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Manager Detail</h2>
                </div>
                <div className="card-body"></div>

                {empdata &&
                    <div>
                        <h2>Le nom de manager est : <b>{empdata.nom}</b>  ({empdata.id})</h2>
                        <h3>General Details</h3>
                        <h5>Prenom est : {empdata.prenom}</h5>
                        <h5>Departement est : {empdata.departement}</h5>
                        <h5>Employes: {employeeNames}</h5>

                        

                        <Link className="btn btn-danger" to="/manager">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    </AnimatedPage>
    );
}

export default ManagerDetail
