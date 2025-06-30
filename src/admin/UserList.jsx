// import React from "react";
// import { approveKYC, rejectKYC } from "../admin/api/users.js";

// const UserList = ({ users, refreshUsers }) => {
//   const handleApprove = async (userId) => {
//     await approveKYC(userId);
//     refreshUsers();
//   };

//   const handleReject = async (userId) => {
//     await rejectKYC(userId);
//     refreshUsers();
//   };

//   return (
//     <div className="box">
//       <h3 className="title is-4 ">User List</h3>
//       <table className="table is-striped is-hoverable is-fullwidth">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>KYC Docs</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.role ? user.role.toLowerCase() : "Unknown"}</td>

//               <td>
//                 <span
//                   className={`tag ${
//                     user.kycStatus.toLowerCase() === "approved"
//                       ? "is-success"
//                       : user.kycStatus.toLowerCase() === "rejected"
//                       ? "is-danger"
//                       : "is-warning"
//                   }`}
//                 >
//                   {user.kycStatus}
//                 </span>
//               </td>
//               <td>
//                {console.log("KYC Document URL:", user.kycDocument)}
//                 <a
//                   // href={user.kycDocument}
//                   href={`http://localhost:4000/${user.kycDocument}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="button is-link is-small is-light"
//                 >
//                   View Document
//                 </a>
//               </td>
//               <td>
//                 {user.kycStatus.toLowerCase() === "pending" && (
//                   <div className="buttons">
//                     <button
//                       onClick={() => handleApprove(user._id)}
//                       className="button is-success is-small"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(user._id)}
//                       className="button is-danger is-small"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


// import React from "react";
// import { approveKYC, rejectKYC } from "../admin/api/users.js";


// const UserList = ({ users, refreshUsers }) => {
//   const handleApprove = async (userId) => {
//     await approveKYC(userId);
//     refreshUsers();
//   };

//   const handleReject = async (userId) => {
//     await rejectKYC(userId);
//     refreshUsers();
//   };

//   return (
//     <div className="box has-background-dark animated-fade">
//       <h3 className="title is-4 has-text-white mb-4 slide-in-top">👥 User KYC List</h3>

//       <table className="table is-striped is-hoverable is-fullwidth user-table">
//         <thead>
//           <tr>
//             <th className="has-text-white">Name</th>
//             <th className="has-text-white">Role</th>
//             <th className="has-text-white">Status</th>
//             <th className="has-text-white">KYC Docs</th>
//             <th className="has-text-white">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, idx) => (
//             <tr key={user._id} className="fade-in-item">
//               <td className="has-text-light">{user.name}</td>
//               <td className="has-text-light">
//                 {user.role ? user.role.toLowerCase() : "Unknown"}
//               </td>
//               <td>
//                 <span
//                   className={`tag is-rounded ${
//                     user.kycStatus.toLowerCase() === "approved"
//                       ? "is-success"
//                       : user.kycStatus.toLowerCase() === "rejected"
//                       ? "is-danger"
//                       : "is-warning"
//                   }`}
//                 >
//                   {user.kycStatus}
//                 </span>
//               </td>
//               <td>
//                 <a
//                   href={`http://localhost:4000/${user.kycDocument}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="button is-small is-link is-light"
//                 >
//                   📄 View Document
//                 </a>
//               </td>
//               <td>
//                 {user.kycStatus.toLowerCase() === "pending" && (
//                   <div className="buttons fade-in-item">
//                     <button
//                       onClick={() => handleApprove(user._id)}
//                       className="button is-small is-success animated-hover"
//                     >
//                       ✅ Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(user._id)}
//                       className="button is-small is-danger animated-hover"
//                     >
//                       ❌ Reject
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;


// -----AFTER FIXING ISSUE-----


import React from "react";
import { approveKYC, rejectKYC } from "../admin/api/users.js";
import { config } from "../config";


const UserList = ({ users, refreshUsers }) => {
  const handleApprove = async (userId) => {
    await approveKYC(userId);
    refreshUsers();
  };

  const handleReject = async (userId) => {
    await rejectKYC(userId);
    refreshUsers();
  };

  return (
    <div className="kyc-user-list box p-5">
      <h3 className="title is-3 has-text-centered mb-5 slide-in-top">
        👥 User KYC List
      </h3>

      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>KYC Docs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="fade-in-item">
                <td>{user.name}</td>
                <td>
                  {user.role && user.role !== "admin"
                    ? user.role.toLowerCase()
                    : "Brand/Manager"}
                </td>
                <td>
                  <span
                    className={`tag is-rounded is-medium ${
                      user.kycStatus.toLowerCase() === "approved"
                        ? "is-success"
                        : user.kycStatus.toLowerCase() === "rejected"
                        ? "is-danger"
                        : "is-warning"
                    }`}
                  >
                    {user.kycStatus}
                  </span>
                </td>
                <td>
                  <a
                    // href={`http://localhost:4000/${user.kycDocument.replace('uploads/', '')}`}
                    href={`${config.API_URL}/${user.kycDocument}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-small is-link is-light is-rounded"
                  >
                    📄 View
                  </a>
                </td>
                <td>
                  {user.kycStatus.toLowerCase() === "pending" && (
                    <div className="buttons are-small is-flex is-justify-content-center">
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="button is-success is-light animated-hover"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReject(user._id)}
                        className="button is-danger is-light animated-hover"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
