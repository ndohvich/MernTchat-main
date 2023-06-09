import React, {useContext, useEffect} from "react";
import { ListGroup } from "react-bootstrap";
import {useSelector} from "react-redux";
import {AppContext} from "../context/appContext";

function Sidebar() {

  const user = useSelector((state) => state.user);
  const {socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom} = useContext(AppContext);
  
  useEffect(() => {
    if(user){
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);
  
  socket.off("new-user").on("new-user", (payload) =>{
    setMembers(payload);
  });

  function getRooms(){
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  if(!user){
    return <></>;
  }

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key = {idx} onClick={() => joinRoom()} style={{cursor: "pointer"}}>
            {room}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member) => (
        <ListGroup.Item key={member.id} style={{cursor: "pointer"}}>
          {member.name}
        </ListGroup.Item>
      ))}
    </>
  );
}

export default Sidebar;