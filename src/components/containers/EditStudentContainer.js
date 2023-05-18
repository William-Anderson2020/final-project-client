/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { 
  fetchStudentThunk,
  editStudentThunk
} from '../../store/thunks';

class EditStudentContainer extends Component {
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "",
      email: "",
      imageURL: null,
      gpa: null,
      campusId: null, 
      redirect: false, 
      redirectId: null
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let edits = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        gpa: this.state.gpa,
        campusId: this.state.campusId,
        id: this.props.student.id
    };

    if(edits.firstname === null || edits.firstname === ""){
      edits.firstname = this.props.student.firstname;
    };

    if(edits.lastname === null || edits.lastname === ""){
      edits.lastname = this.props.student.lastname;
    };

    if(edits.email === null || edits.email === ""){
      edits.email = this.props.student.email;
    };

    if(edits.gpa === null){
      edits.gpa = this.props.student.gpa;
    };

    if(edits.campusId === null){
      edits.campusId = this.props.student.campusId;
    };

    if(this.state.imageURL === null){
      edits.imageURL = this.props.student.imageURL;
    }
    
    // Add edited student in back-end database
    this.props.editStudent(edits);

    // Update state, and trigger redirect to show the new student
    this.setState({
      id: this.props.match.params.id,
      firstname: "", 
      lastname: "",
      email: "",
      imageURL: null,
      gpa: null,
      campusId: null, 
      redirect: true, 
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render edit student input form
  render() {

    if(this.props.student == null){
      return <Redirect to={`/students`}/>
    }

    // Redirect to student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.id}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          student={this.props.student}
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};
// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);