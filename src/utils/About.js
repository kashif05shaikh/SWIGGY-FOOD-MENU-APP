import { Component } from "react";
import Userclass from "../Components/Userclass";
class About extends Component {
  constructor(props) {
    super(props);
    //console.log("Parent Constructor");
  }
  componentDidMount() {
    //console.log("Parent comp did mount");
  }
  render() {
    //npm startconsole.log("Parent render");
    return (
      <div>
        <h1>About Us</h1>
        <Userclass
          name="SHAIKH KASHIF AHMED"
          location="Mumbai"
          contact="kashif05@gmail.com"
        />
      </div>
    );
  }
}
export default About;
