/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  

  let img = "";
  if(campus.img !== null){
    img=(
      <div>
        <br/>
        <img src={campus.img} alt={`${campus.name}`} style={{maxWidth:'30%'}}/>
        <br/>  
      </div>
    );
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      {img}
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;