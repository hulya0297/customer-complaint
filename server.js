// import express from "express";
// import cors from "cors";
// import { json } from "body-parser";

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(json());

// let complaints = [
//   {
//     id: 1,
//     title: "Complaint",
//     name: "Hulya Azizova",
//     email: "azizovahulya12@gmail.com",
//     phone: "+9940516250297",
//     address: "Baku",
//     submissionDate: new Date().toISOString(),
//     status: "Open",
//     feedback: "",
//     priority: "Medium",
//   },
// ];

// app.post("http://localhost:5000/api/complaints/", (req, res) => {
//   const complaint = {
//     id: complaints.length + 1,
//     ...req.body,
//     submissionDate: new Date().toISOString(),
//     status: "Open",
//   };
//   complaints.push(complaint);
//   res.status(201).send(complaint);
// });

// app.get("http://localhost:5000/api/complaints/", (req, res) => {
//   res.send(complaints);
// });

// app.get("http://localhost:5000/api/complaints/:id", (req, res) => {
//   const { id } = req.params;
//   const complaint = complaints.find((complaint) => complaint.id == id);
//   if (!complaint) {
//     return res.status(404).send({ message: "Complaint not found" });
//   }
//   res.send(complaint);
// });

// app.put("http://localhost:5000/api/complaints/", (req, res) => {
//   const { id } = req.params;
//   const index = complaints.findIndex((complaint) => complaint.id == id);
//   if (index === -1) {
//     return res.status(404).send({ message: "Complaint not found" });
//   }
//   complaints[index] = {
//     ...complaints[index],
//     ...req.body,
//     status: "In Progress",
//   };
//   res.send(complaints[index]);
// });

// app.delete("http://localhost:5000/api/complaints/:id", (req, res) => {
//   const { id } = req.params;
//   complaints = complaints.filter((complaint) => complaint.id != id);
//   res.status(204).end();
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid'; 

const app = express();
app.use(json());
app.use(cors());

let complaints = []; 
app.post('http://localhost:5000/api/complaints', (req, res) => {
  const { title, name, email, phone, address, rating } = req.body;
  const newComplaint = {
    id: uuidv4(),
    title,
    name,
    email,
    phone,
    address,
    rating,
    submissionDate: new Date(),
    status: 'Open'
  };
  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});


app.get('http://localhost:5000/api/complaints', (req, res) => {
  res.json(complaints);
});


app.put('http://localhost:5000/api/complaints/:id', (req, res) => {
  const { id } = req.params;
  const { response } = req.body;
  const complaintIndex = complaints.findIndex(c => c.id === id);
  if (complaintIndex !== -1) {
    complaints[complaintIndex].status = 'Completed'; 
    complaints[complaintIndex].response = response;
    res.json(complaints[complaintIndex]);
  } else {
    res.status(404).json({ error: 'Complaint not found' });
  }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
