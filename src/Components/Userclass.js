import React from "react";
class Userclass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:{
        name:"Dummy",
        location:"Default",
        avatar_url:"https://dummy-photo.com"
      }, 
    };
    //console.log(this.props.name + " Child Constructor");
  }
  async componentDidMount() {
    // console.log("Child comp is mount");
    const data= await fetch("https://api.github.com/users/kashif05shaikh")
    const json=await data.json();
    this.setState({
      userInfo:json,
    });
    console.log(json);
  }

  componentDidUpdate(){
    console.log("Comment did update")
  }
  componentWillUnmount(){
    console.log("Components is Unmount")
  }
  render() {
    const { name, location, contact ,avatar_url} = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url}/>
        <h2>NAME: {name}</h2>
        <h3>LOCATION: {location}</h3>
        <h4>CONTACT: {contact}</h4>
      </div>
    );
  }
}

export default Userclass;
