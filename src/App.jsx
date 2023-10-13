import { NavLink } from "react-router-dom";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("user added successfully");
          form.reset();
        }
      });
  };
  return (
    <div className="max-w-[1440px] mx-auto">
      <h1 className="text-center text-3xl font-bold p-5">Simple CRUD</h1>
      <div className="flex gap-4 items-center">
        <NavLink
          to="/"
          className="px-4 py-1 bg-blue-400 text-white mx-3 font-medium"
        >
          Add user
        </NavLink>
        <NavLink
          to="/user"
          className="px-4 py-1 bg-blue-400 text-white mx-3 font-medium"
        >
          user
        </NavLink>
      </div>
      <div className="w-1/2 mx-auto mt-10">
        <div className=" w-full bg-base-200">
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="user name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="user email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
