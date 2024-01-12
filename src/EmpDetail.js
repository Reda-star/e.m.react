import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";


const EmpDetail = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:1015/api/employe/" + empid).then((res) => {
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
                    <h2>Employee Detail</h2>
                </div>
                <div className="card-body"></div>

                {empdata &&
                    <div>
                        <h2>Le nom de l'Employee est : <b>{empdata.nom}</b>  ({empdata.id})</h2>
                        <h3>General Details</h3>
                        <h5>Prenom est : {empdata.prenom}</h5>
                        <h5>Poste est : {empdata.poste}</h5>
                        <h5>Salaire est : {empdata.salaire}</h5>

                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
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

export default EmpDetail;