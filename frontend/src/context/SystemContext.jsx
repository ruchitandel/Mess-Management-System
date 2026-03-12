import { createContext, useContext, useState, useMemo, useEffect } from "react";

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const costPerDay = 80;

  /* ================= DEFAULT DATA ================= */

  const defaultStudents = [
    { id: 1, name: "Rahul Patel", attendance: 20, paid: false },
    { id: 2, name: "Sneha Shah", attendance: 24, paid: false },
    { id: 3, name: "Amit Joshi", attendance: 18, paid: false },
  ];

  const defaultInventory = [
    { id: 1, name: "Rice", quantity: 120, unit: "kg", price: 40 },
    { id: 2, name: "Oil", quantity: 25, unit: "litre", price: 120 },
    { id: 3, name: "Vegetables", quantity: 15, unit: "kg", price: 30 },
  ];

  const defaultUsers = [
    { id: 1, name: "Ruchi Tandel", role: "Admin", email: "ruchi@mail.com" },
    { id: 2, name: "Rahul Patel", role: "Student", email: "rahul@mail.com" },
  ];

  const defaultMeals = [
    {
      id: 1,
      day: "Monday",
      breakfast: "Poha",
      lunch: "Dal Rice",
      dinner: "Chapati Sabji",
    },
    {
      id: 2,
      day: "Tuesday",
      breakfast: "Upma",
      lunch: "Rajma Rice",
      dinner: "Paneer",
    },
  ];

  const defaultVendors = [
    {
      id: 1,
      name: "Fresh Foods Ltd",
      contact: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Daily Supplies",
      contact: "9123456780",
      status: "Inactive",
    },
  ];

  const defaultAnnouncements = [
    {
      id: 1,
      title: "Mess Timings Updated",
      message: "Dinner timing changed to 7:30 PM.",
      date: "2026-02-20",
    },
  ];

  /* ================= LOAD FROM LOCALSTORAGE ================= */

  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : defaultStudents;
  });

  const [inventory, setInventory] = useState(() => {
    const stored = localStorage.getItem("inventory");
    return stored ? JSON.parse(stored) : defaultInventory;
  });

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users_data");
    return stored ? JSON.parse(stored) : defaultUsers;
  });

  const [meals, setMeals] = useState(() => {
    const stored = localStorage.getItem("meals");
    return stored ? JSON.parse(stored) : defaultMeals;
  });

  const [vendors, setVendors] = useState(() => {
    const stored = localStorage.getItem("vendors");
    return stored ? JSON.parse(stored) : defaultVendors;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const stored = localStorage.getItem("announcements");
    return stored ? JSON.parse(stored) : defaultAnnouncements;
  });

  /* ================= SAVE TO LOCALSTORAGE ================= */

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("users_data", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem(
      "announcements",
      JSON.stringify(announcements)
    );
  }, [announcements]);

  /* ================= ATTENDANCE ================= */

  const updateAttendance = (attendanceMap) => {
    const updated = students.map((student) => {
      if (attendanceMap[student.id]) {
        return { ...student, attendance: student.attendance + 1 };
      }
      return student;
    });
    setStudents(updated);
  };

  /* ================= BILLING ================= */

  const markAsPaid = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, paid: true } : student
      )
    );
  };

  /* ================= CALCULATIONS ================= */

  const totalRevenue = useMemo(() => {
    return students.reduce(
      (sum, student) => sum + student.attendance * costPerDay,
      0
    );
  }, [students]);

  const totalPending = useMemo(() => {
    return students.reduce(
      (sum, student) =>
        !student.paid
          ? sum + student.attendance * costPerDay
          : sum,
      0
    );
  }, [students]);

  const totalStockValue = useMemo(() => {
    return inventory.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }, [inventory]);

  const lowStockItems = useMemo(() => {
    return inventory.filter((item) => item.quantity < 30);
  }, [inventory]);

  /* ================= PROVIDER ================= */

  return (
    <SystemContext.Provider
      value={{
        // Students
        students,
        setStudents,
        updateAttendance,
        markAsPaid,

        // Inventory
        inventory,
        setInventory,
        totalStockValue,
        lowStockItems,

        // Users
        users,
        setUsers,

        // Meals
        meals,
        setMeals,

        // Vendors
        vendors,
        setVendors,

        // Announcements
        announcements,
        setAnnouncements,

        // Billing
        costPerDay,
        totalRevenue,
        totalPending,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);