import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student, deleteStudent } = props;

  if(student == null){
    return(
      <Redirect to="/students"/>
    )
  }

  let img = "";
  if(student.imageURL != null){
    img=(
      <div>
        <br/>
        <img src={student.imageURL} alt={`${student.firstname + " " + student.lastname}`} style={{maxWidth:'30%'}}/>
        <br/>  
      </div>
    );
  }

  let gpa;
  if(student.gpa != null){
    gpa=(
      <div>
        <h4>{"GPA: " + student.gpa.toFixed(1)}</h4>
      </div>
    );
  }

  let campus
  if(student.campus != null){
    campus=(
      <div>
        <h3><a href={`/campus/${student.campus.id}`}>{student.campus.name}</a></h3>
      </div>
    )
  }else{
    campus=(
      <h3>No associated campus.</h3>
    )
  }

  // Render a single Student view 
  return (
    <div>
      {img}
      <h1>{student.firstname + " " + student.lastname}</h1>
      {campus}
      <h4>{student.email}</h4>
      {gpa}
      <button type="button" onClick={() => deleteStudent(student.id)}>Delete</button>
    </div>
  );

};

export default StudentView;