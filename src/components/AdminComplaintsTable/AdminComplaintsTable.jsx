import { useState, useEffect } from "react";
import axios from "axios";
import ComplaintFilter from "../ComplaintFilter/ComplaintFilter";
import ReplyForm from "../ReplyForm/ReplyForm";
import "./adminComplaintsTable.scss";

const AdminComplaintsTable = () => {
  const [filter, setFilter] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complaints"
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, [filter]);
  
  const handleReply = async (complaintId, responseText) => {
    try {
      const updatedComplaint = await axios.put(`/api/complaints/${complaintId}`, { response: responseText });
      console.log('Complaint replied:', updatedComplaint.data);
      // Update local state or re-fetch complaints if needed
    } catch (error) {
      console.error('Error replying to complaint:', error);
    }
  };
  

  return (
    <div className="tableContainer">
      <ComplaintFilter
        setFilter={setFilter}
        className="tableContainer_tableFilter"
      />
      <table className="tableContainer_complaintsTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(complaints) &&
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{complaint.name}</td>
                <td>{complaint.email}</td>
                <td>{complaint.phone}</td>
                <td>{complaint.address}</td>
                <td>
                  {new Date(complaint.submissionDate).toLocaleDateString()}
                </td>
                <td>{complaint.status}</td>
                <td>{complaint.feedback}</td>
                <td>{complaint.priority}</td>
                <td>
                 
                  <ReplyForm complaintId={complaint.id} onReply={handleReply} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="tableContainer_tablePagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="tableContainer_tablePagination_paginationButton"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="tableContainer_tablePagination_paginationButton"
        >
          Next
        </button>
      </div>
      {selectedComplaint && (
        <ReplyForm
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};

export default AdminComplaintsTable;
