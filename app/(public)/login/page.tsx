import { LoginForm } from "./form";

export default function Page() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col p-4 lg:w-1/3 h-screen justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <p>Welcome To Fresh Mart POS!</p>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
        <div className="mt-4 text-center text-xs text-slate-600">
          Any problem related to login, please contact administrator!
        </div>
      </div>
    </div>
  );
}
