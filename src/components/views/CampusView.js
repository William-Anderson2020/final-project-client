/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, updateCampus} = props;
  
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
          <h1>Students:</h1>
          <Link to={`/student/${student.id}`}>
            <h2>{name}</h2>
          </Link>
          <button onClick={() => updateCampus([student.id, 0])}>Remove from campus</button>   
          <hr style={{width: '30%'}}/>
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
      <Link to={`/campus/${campus.id}/edit`}>
        <button type="button">Edit</button>  
      </Link>
      <Link to={`/campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete</button>
      </Link>
      {students}
      <Link to={`/newstudent`}>
        <button type="button">Create new student</button>  
      </Link>
      {/* <form >
        <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
        <input type="text" name="firstname" onChange ={(e) => handleChange(e)} required/>
      </form> */}
    </div>
  );
};

export default CampusView;