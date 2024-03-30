import { SignUp } from "@clerk/nextjs";

export default function Register() {
  return (
    <div className="flex justify-center py-24">
      <SignUp />
    </div>
  );
}
