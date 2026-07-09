import toast from "react-hot-toast";
function Register() {
  const handleRegister = () => {
    toast.success("Registration successful!");
  };

  return (
    <div>
      <h1>Register Page</h1>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;