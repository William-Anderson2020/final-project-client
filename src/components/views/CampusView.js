/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus} = props;
  
  if(campus == null){
    return(
      <Redirect to="/campuses"/>
    )
  }

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

  let students = <h3>No associated students.</h3>
  if(campus.students.length > 0){
    campus.students.map( student => {
      let name = student.firstname + " " + student.lastname;
      students = (
        <div key={student.id}>
          <Link to={`/student/${student.id}`}>
            <h2>{name}</h2>
          </Link>             
        </div>
      );
    })
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      {img}
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      {students}
    </div>
  );
};

export default CampusView;