import { NavLink, useLoaderData, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const loadedUser = useLoaderData();
  const navigate = useNavigate()

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updateUser = { name, email };

    fetch(`http://localhost:5000/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("data updated successfully");
          navigate('/user')
        }
      });
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <h1 className="text-center text-3xl font-bold p-5">update user</h1>
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
      <div className="w-1/2 mx-auto">
        <div className=" w-full  bg-base-200">
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleUpdateUser} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={loadedUser.name}
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
                  defaultValue={loadedUser.email}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
