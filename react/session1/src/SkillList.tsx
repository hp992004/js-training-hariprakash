function SkillList() {
  const skills: string[] = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'React']

  return (
    <div>
      <h3>Skills Covered</h3>
      <ul>
        {skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <p>Total: {skills.length} skills</p>
    </div>
  )
}

export default SkillList

/*
Error:
SkillList.tsx:9 Each child in a list should have a unique "key" prop.


Without a key, React can't easily tell which list item is which.
Adding a unique key helps React update the list correctly.
*/
