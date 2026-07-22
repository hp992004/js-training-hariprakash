interface User {
  name:    string
  isAdmin: boolean
}


function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  )
}

/*
This component forwards the `user` prop to `UserBadge` without using it.
As the `User` object grows, it must continue accepting and passing
the updated prop, making the component more tightly coupled and
harder to maintain.
 */

function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px' }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  )
}

/*
This component receives the `user` prop only to pass it to its child.
It doesn't use the data itself, which is an example of prop drilling.
If the `User` interface gains a new field, this component may still
need to update its props even though it never uses that data.
 */
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}


function PropDrillingDemo() {
  const user: User = { name: 'Rahul', isAdmin: true }
  return <InternList user={user} />
}

export default PropDrillingDemo