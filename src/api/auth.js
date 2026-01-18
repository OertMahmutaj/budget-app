// api/auth.js
export async function login(username, password) {
  const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`)
  const users = await res.json()
  console.log(users)
  return users[0] ?? null
}
