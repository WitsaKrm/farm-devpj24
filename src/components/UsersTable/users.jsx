import React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import style from "./users.module.css";
import PopAddUser from "../addusers/addusers";
import PopUpdateUser from "../edituser/editUser";
import ExportFile from "../../services/fileExport";
import endpoint from "../../services/API/axios";
import { FetchDevices } from "../../services/API/node.api";
import { APIdataUsers, APIdeleteUser } from "../../services/API/user.api";
import AppHeader from "../header/app-header";
import { FetchDevicesByUid } from "../../services/API/node.api";
import NodeBox from "../node/node";
import svg from "../../assets/svg/svg";

// const USERS_URL = "/user";
const USERSDEL_URL = "/thisuser";
const DEVICE_URL = `/devices`;


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersPage = (props) => {
  const users = props.users;
  const loading = props.loading;
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  // const [loading, setLoading] = React.useState(true);
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  const [filterUsername, setFilterUsername] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);
  // const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deviceByUid = async (SET, URL, UID) => {
    try {
      FetchDevicesByUid(SET, URL, UID);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleAbout = (userID) => {
    setExpandedUserId((prevUserId) => (prevUserId === userID ? null : userID));
  };
  function AccordionContent({ user, URL }) {
    const [devices, setDevices] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!hasFetched) {
            await FetchDevicesByUid(setDevices, URL, user.user_id);
            setHasFetched(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [ URL, user, hasFetched]);
    return (
      <StyledTableRow>
        <StyledTableCell colSpan={8}>
          <div>
            <i
              className={style.edit}
              title="Edit Users"
              onClick={() => handleEditOpen(user.user_id)}
              data-toggle="tooltip"
            >
              <i className="material-icons">edit</i>
              <span>แก้ไขข้อมูลผู้ใช้งาน</span>
            </i>
            <i
              className={style.delete}
              title="Delete Users"
              onClick={() => handleDeleteUser(user.user_id)}
              data-toggle="tooltip"
            >
              <i className="material-icons">delete</i>
              <span>ลบผู้ใช้งาน</span>
            </i>
            <h1>User ID: {user.user_id} </h1>
            <div className={`container-fluid ${style.indexPageContainer}`}>
              <div className="row">
                {devices.map(
                  (station) =>
                    station.type === "station" && (
                      <div className="col-md-3 col-sm-6" key={station.d_id}>
                        <div className={`node d-flex ${style.nodeBox}`}>
                          <NodeBox
                            name={station.d_name.toUpperCase()}
                            src={svg.station.default}
                            status={station.status.toString()}
                            // handleNodeClick={() =>
                            //   handleNodeClick(
                            //     station.user_id,
                            //     "station",
                            //     station.d_id,
                            //     station.lat,
                            //     station.lon
                            //   )
                            // }
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="row">
                {devices.map(
                  (node) =>
                    node.type === "node" && (
                      <div className="col-md-3 col-sm-6" key={node.d_id}>
                        <div className={`node d-flex ${style.nodeBox}`}>
                          <NodeBox
                            name={node.d_name.toUpperCase()}
                            src={svg.node.default}
                            status={node.status.toString()}
                            // handleNodeClick={() =>
                            //   handleNodeClick(
                            //     node.user_id,
                            //     node.type === "station" ? "station" : "senser",
                            //     node.d_id,
                            //     node.lat,
                            //     node.lon
                            //   )
                            // }
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </StyledTableCell>
      </StyledTableRow>
    );
  }
  const handleEditOpen = (userID) => {
    const selectedUser = users.find((user) => user.user_id === userID);
    setSelectedUserData(selectedUser);
    setEditOpen(true);
  };
  const handleDeleteUser = (userID) => {
    const selectedUser = users.find((user) => user.user_id === userID);
    console.log(selectedUser);
    setSelectedUserData(selectedUser);
    Swal.fire({
      title: "ต้องการลบผู้ใช้นี้ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await endpoint.delete(`${USERSDEL_URL}/${userID}`);
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: "ผู้ใช้ถูกลบแล้ว !",
            }).then(
              window.location.reload()
            ) 
          } else {
            Swal.fire("Error", "เกิดข้อผิดพลาดในการลบผู้ใช้", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "เกิดข้อผิดพลาดในการลบผู้ใช้", "error");
        }
      }
    });
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };
  const filteredUsers = users.filter((user) => {
    const firstNameMatch = user.f_name
      .toLowerCase()
      .includes(filterFirstName.toLowerCase());
    const lastNameMatch = user.l_name
      .toLowerCase()
      .includes(filterLastName.toLowerCase());
    const usernameMatch = user.username
      .toLowerCase()
      .includes(filterUsername.toLowerCase());
    const roleMatch = filterRole === "" || user.role.toString() === filterRole;
    const statusMatch =
      filterStatus === "" || user.status.toString() === filterStatus;
    return (
      firstNameMatch &&
      lastNameMatch &&
      usernameMatch &&
      roleMatch &&
      statusMatch
    );
  });

  // APIdataUsers(setUsers, USERS_URL, setLoading);

  return (
    <>
      <div className={style.title}>
        <div className="row">
          <h2 className="col">
            Users <b>Management</b>
          </h2>
        </div>
      </div>

      <div className={style.table}>
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">USER ID</StyledTableCell>
                <StyledTableCell align="left">
                  FIRST NAME
                  <br />
                  <input
                    className={style.filter}
                    // style={{ width: "100px" }}
                    type="text"
                    title="Filter by Firstname"
                    value={filterFirstName}
                    onChange={(e) => setFilterFirstName(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  LAST NAME
                  <br />
                  <input
                    className={style.filter}
                    // style={{ width: "100px" , height:"30px"}}
                    type="text"
                    title="Filter by Lastname"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  USERNAME
                  <br />
                  <input
                    className={style.filter}
                    // style={{ width: "100px" }}
                    type="text"
                    title="Filter by Username"
                    value={filterUsername}
                    onChange={(e) => setFilterUsername(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  ROLE
                  <br />
                  <input
                    className={style.filter}
                    // style={{ width: "100px" }}
                    type="text"
                    title="(0 = Admin , 1 = Users)"
                    placeholder="(0 = Admin , 1 = Users)"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                  />
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  STATUS
                  <br />
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    title="(0 = Deactive , 1 = Active)"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  />
                </StyledTableCell> */}
                <StyledTableCell align="center">CREATED DATE</StyledTableCell>
                <StyledTableCell align="center">
                  <i
                    className={style.add_users}
                    title="ADD USERS"
                    data-toggle="tooltip"
                    onClick={handleAddOpen}
                  >
                    <i className="material-icons">add_circle</i>
                  </i>
                  <ExportFile
                    excelData={users}
                    fileName="Users"
                    classIcon={style.exp_xcel}
                  ></ExportFile>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <StyledTableCell colSpan={8} align="center">
                    Loading...
                  </StyledTableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <React.Fragment key={index}>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        <h5>{index + 1}</h5>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h6>{user.user_id}</h6>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <h6>{user.f_name}</h6>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <h6>{user.l_name}</h6>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h6>{user.username}</h6>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h6>{user.role === 0 ? <b>{"Admin"}</b> : "Users"}</h6>
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                      <h6>
                        {user.status === 1 ? (
                          <span
                            className={`${style.status} ${style.textsuccess}`}
                          >
                            &bull;
                          </span>
                        ) : (
                          <span
                            className={`${style.status} ${style.textdanger}`}
                          >
                            &bull;
                          </span>
                        )}
                      </h6>
                    </StyledTableCell> */}

                      <StyledTableCell align="center">
                        <h6>{user.date}</h6>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <i
                          className={style.more}
                          title="Edit"
                          onClick={() => handleAbout(user.user_id)}
                          data-toggle="tooltip"
                        >
                          <i className="material-icons">more_horiz</i>
                        </i>
                      </StyledTableCell>
                    </StyledTableRow>
                    {expandedUserId === user.user_id && (
                      <AccordionContent user={user} URL={DEVICE_URL} />
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal open={addOpen} onClose={handleAddClose}>
        <div className={style.modal}>
          <PopAddUser />
        </div>
      </Modal>
      <Modal open={editOpen} onClose={handleEditClose}>
        <div className={style.modal}>
          <PopUpdateUser userData={selectedUserData} />
        </div>
      </Modal>
    </>
  );
};

export default UsersPage;
