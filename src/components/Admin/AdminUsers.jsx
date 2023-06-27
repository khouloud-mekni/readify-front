import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Image } from "semantic-ui-react";
function AdminUsers() {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/users", {
        headers: {
          jwt: token,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.dir(err));
  }, [users]);
  const banUser = (id) => {
    axios
      .put(
        `/api/admin/banUser/${id}`,
        {},
        {
          headers: {
            jwt: token,
          },
        }
      )
      .then((res) => {
        if (res) {
          alert("user was banned");
        }
      })
      .catch((err) => console.dir(err));
  };
  const unBanUser = (id) => {
    axios
      .put(
        `/api/admin/unBanUser/${id}`,
        {},
        {
          headers: {
            jwt: token,
          },
        }
      )
      .then((res) => {
        if (res) {
          alert("user was unbanned");
        }
      })
      .catch((err) => console.dir(err));
  };
  return (
    <div className="p-8">
      <Card.Group>
        {users.map((user, index) => (
          <Card key={index}>
            <Card.Content>
              <Image floated="right" size="tiny" src={user.userImg} />
              <Card.Header>{user.userName}</Card.Header>
              {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
              {/* <Card.Description>
                Steve wants to add you to the group{" "}
                <strong>best friends</strong>
              </Card.Description> */}
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Add admin
                </Button>

                {user.isBanned ? (
                  <Button
                    basic
                    color="blue"
                    onClick={() => unBanUser(user._id)}
                  >
                    Unban
                  </Button>
                ) : (
                  <Button basic color="red" onClick={() => banUser(user._id)}>
                    Ban
                  </Button>
                )}
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default AdminUsers;