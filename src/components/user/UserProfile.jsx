import React, { useEffect, useState } from "react";
import {
  Image,
  Menu,
  Header,
  Icon,
  Segment,
  Button,
  Input,
} from "semantic-ui-react";
import { useNavigate } from "react-router";
import axios from "axios";
function UserProfile() {
  const navigate = useNavigate();
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  const [profile, setProfile] = useState();
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/user/getUser?user=${id}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => {
        if (res.status) {
          setProfile(res.data.data);
        }
      })
      .catch((err) => {
        if (err.response.data.tokenExpired) {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, [profile]);
  const handleSavePhoto = async () => {
    setLoading(true);
    const newForm = new FormData();
    newForm.append("userPhoto", photo[0]);
    axios
      .put(`/api/user/addPhoto?user=${id}`, newForm, {
        headers: {
          jwt: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status) {
          setLoading(false);
        }
      })
      .catch((err) => console.dir(err));
  };
  return (
    <div className="min-h-[694px]">
      {profile ? (
        <div className="w-[80%] min-h-[500px] mx-auto my-[5rem] shadow-xl border-2 border-slate-300 p-[3rem] flex gap-[3rem]">
          <div>
            <Image src={profile.userImg} size="medium" bordered />
          </div>
          <div>
            <h1>{profile.userName}</h1>
            <Menu compact>
              <Menu.Item
                as="a"
                color="black"
                onClick={() => {
                  setShowEditPhoto(!showEditPhoto);
                }}
              >
                Edit profile photo
              </Menu.Item>
              <Menu.Item link color="black">
                Edit username
              </Menu.Item>
              <Menu.Item link color="black">
                Edit password
              </Menu.Item>
              <Menu.Item link color="black">
                Edit email
              </Menu.Item>
            </Menu>
            {showEditPhoto && (
              <Segment placeholder>
                <Header icon>
                  <Icon name="photo" />
                  No photos are selected.
                </Header>
                <Input
                  primary
                  type="file"
                  multiple={false}
                  name="userPhoto"
                  onChange={(e) => setPhoto(e.target.files)}
                />
                <Button
                  onClick={() => {
                    handleSavePhoto();
                  }}
                  loading={loading}
                  primary
                  size="large"
                >
                  Save
                </Button>
              </Segment>
            )}
          </div>
        </div>
      ) : (
        <h1>Loading ..</h1>
      )}
    </div>
  );
}

export default UserProfile;