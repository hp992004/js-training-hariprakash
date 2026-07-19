import { useEffect, useRef, useState } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

const internData: Intern[] = [
  { id: 1, name: "Rahul", score: 92, role: "Frontend", isPresent: true },
  { id: 2, name: "Priya", score: 78, role: "Backend", isPresent: true },
  { id: 3, name: "Amit", score: 45, role: "Frontend", isPresent: false },
  { id: 4, name: "Sneha", score: 95, role: "Fullstack", isPresent: true },
  { id: 5, name: "Karan", score: 58, role: "Backend", isPresent: true },
];

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setInterns(internData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide Search" : "Show Search"}
      </button>

      {isOpen && (
        <div style={{ marginTop: "10px" }}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search intern..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <p>Loading interns...</p>
      ) : (
        <>
          <p>
            Showing {filteredInterns.length} of {interns.length} interns
          </p>

          {filteredInterns.map((intern) => (
            <div
              key={intern.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{intern.name}</h3>
              <p>Role: {intern.role}</p>
              <p>Score: {intern.score}</p>

              <span
                style={{
                  color: intern.score >= 50 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {intern.score >= 50 ? "Pass" : "Fail"}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;