import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import EditProfile from "./EditProfile";
import PasswordChange from "./PasswordChange";

export default function UserProfile() {
  const user = useSelector((state) => state.user);
  const {userInfo} = user;
  console.log(user, "user");
  const [edit, setEdit] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const handleEditProfile = () => {
    setEdit(true);
  }
  const handleChangePass = () => {
    setChangePass(true);
  }
  return (
    <section>
        {(!edit && !changePass) &&
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={userInfo.avatar}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                <p className="text-muted mb-1">Test</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={handleEditProfile} rounded className="mx-2">
                    Edit profile
                  </MDBBtn>
                  <MDBBtn onClick={handleChangePass} outline className="ms-1">
                    Change password
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userInfo.name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userInfo.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    {userInfo.phone_number}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {userInfo.address}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>}
      {edit && <EditProfile />}
      {changePass && <PasswordChange/>}

    </section>
  );
}
