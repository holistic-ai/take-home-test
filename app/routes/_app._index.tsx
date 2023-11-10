import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/projects");
}

export default function AppIndex() {
  return null;
}
