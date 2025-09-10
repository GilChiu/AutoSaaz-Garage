// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Documents.css";
import Sidebar from "../Sidebar/Sidebar";
import { HiOutlineDownload } from "react-icons/hi";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const documents = [
  {
    title: "Property Types & Classifications",
    size: "2.5 MB",
    date: "2024‑01‑15",
  },
  {
    title: "Property Types & Classifications",
    size: "2.5 MB",
    date: "2024‑01‑15",
  },
  {
    title: "Property Types & Classifications",
    size: "2.5 MB",
    date: "2024‑01‑15",
  },
  {
    title: "Property Types & Classifications",
    size: "2.5 MB",
    date: "2024‑01‑15",
  },
  {
    title: "Property Types & Classifications",
    size: "2.5 MB",
    date: "2024‑01‑15",
  },
  {
    title: "Property Types & Classifications",
    size: "2.5 MB",
    date: "2024‑01‑15",
  },
];

const Documents = () => {
  return (
    <div className="documents-layout">
      <Sidebar />
      <div className="documents-wrapper">
        <h2 className="documents-title">Courses Documents</h2>
        <div className="documents-grid">
          {documents.map((doc, index) => (
            <div className="document-card" key={index}>
              <div className="document-info">
                <VscFilePdf className="doc-icon" />
                <div>
                  <h3>
                    <Link to="/carolina" className="document-link-title">
                      {doc.title}
                    </Link>
                  </h3>
                  <p>{doc.size} • {doc.date}</p>
                </div>
              </div>
              <HiOutlineDownload className="download-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
