export function GetUSerId() {
  return localStorage.getItem("userId")?.replace(/"/g, "");
}
export function GetToken() {
  return localStorage.getItem("token")?.replace(/"/g, "");
}