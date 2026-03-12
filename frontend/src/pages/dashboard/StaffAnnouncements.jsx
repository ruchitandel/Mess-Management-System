import "../../styles/dashboard.css";

function StaffAnnouncements() {

  const announcements = [
    {
      id: 1,
      title: "Mess Maintenance",
      message: "Mess will remain closed tomorrow for cleaning.",
      date: "18 Feb 2026"
    },
    {
      id: 2,
      title: "New Menu",
      message: "Paneer Butter Masala added to Friday dinner.",
      date: "17 Feb 2026"
    }
  ];

  return (

    <div className="admin-container">

      <h1>Announcements</h1>

      <div className="announcement-container">

        {announcements.map((a) => (

          <div key={a.id} className="announcement-card">

            <h3>{a.title}</h3>
            <p>{a.message}</p>
            <span>{a.date}</span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default StaffAnnouncements;