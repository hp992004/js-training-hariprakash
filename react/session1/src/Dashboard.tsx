type Intern = {
  id: number;
  name: string;
  score: number;
  isPresent: boolean;
};

function Dashboard() {
  const interns: Intern[]= [
    { id: 1, name: "Rahul", score: 92, isPresent: true },
    { id: 2, name: "Priya", score: 78, isPresent: true },
    { id: 3, name: "Amit", score: 45, isPresent: false },
    { id: 4, name: "Sneha", score: 95, isPresent: true },
  ];

  let presentCount = 0;

  interns.forEach((intern) => {
    if (intern.isPresent) {
      presentCount++;
    }
  });

  return (
    <div>
      <h2>Intern Dashboard</h2>

      {interns.map((intern) => (
        <div key={intern.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{intern.name}</h3>

          <p>Score: {intern.score}</p>

          <p style={{ color: intern.score >= 50 ? "green" : "red" }}>
            {intern.score >= 50 ? "Pass" : "Fail"}
          </p>

          {intern.score >= 90 && <p>Top Performer!!!</p>}

          <p>{intern.isPresent ? "Present" : "Absent"}</p>
        </div>
      ))}

      <p>
        Showing {interns.length} interns — {presentCount} present
      </p>
    </div>
  );
}

export default Dashboard;