import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employe/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/employe/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:1015/api/employe/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }



    useEffect(() => {
        fetch("http://localhost:1015/api/employe/").then((res) => {
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
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employe/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <div className="divbtn">
                        <Link to="/manager" className="btn btn-primary">Manager</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Nom</td>
                                <td>Prenom</td>
                                <td>Poste</td>
                                <td>Salaire</td>
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
                                        <td>{item.poste}</td>
                                        <td>{item.salaire}</td>
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

export default EmpListing;