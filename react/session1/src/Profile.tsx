function Profile() {
  const name:     string = 'Rahul'
  const role:     string = 'Intern'
  const score:    number = 92
  const joinDate: string = '2026-06-30'
  const avatarUrl: string = 'https://i.pravatar.cc/100'
  const altText:   string = `Avatar of ${name}`
  return (
    <div>
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score} / 100</p>
      <p>Name uppercase: {name.toUpperCase()}</p>
      <p>Score doubled: {score * 2}</p>
      <p>Joined: {new Date(joinDate).toDateString()}</p>
      <img src={avatarUrl} alt={altText} width={100} />
    </div>
  )
}

export default Profile

/*
Anything inside {} should return a value that React can display.
if and for are used to control the flow of code, so they can't be placed directly in TSX.
*/


/*
width="100" passes the value as a string, while width={100} passes it as a number.
It matters when a prop expects a specific type, since TSX checks the value's type.
*/