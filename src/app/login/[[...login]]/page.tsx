import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}
