import { useEffect, useState } from "react";

function StudentProfile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {

    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);

  }, []);

  return (

    <div className="admin-container">

      <h1>My Profile</h1>

      <div className="profile-card">

        <p><strong>Name:</strong> {name}</p>

        <p><strong>Email:</strong> {email}</p>

      </div>

    </div>

  );
}

export default StudentProfile;