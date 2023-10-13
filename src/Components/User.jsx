import { useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";

const User = () => {
  const loadedUser = useLoaderData();
  const [users, setUsers] = useState(loadedUser);

  const handleDeleteUser = (_id) => {
    console.log(_id);

    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.deletedCount > 0) {
          alert("successfully delete");
          const remainingUser = users.filter(
            (currUser) => currUser._id !== _id
          );
          setUsers(remainingUser);
        }
      });
  };

  return (
    <div className="max-w-[1440px] mx-5 lg:mx-auto">
      <h2 className="text-center my-8 text-4xl font-semibold">
        Total user: {users.length}
      </h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-8">
        {users.map((curUser) => (
          <div key={curUser._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDeleteUser(curUser._id)}
                  className="btn btn-square btn-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h3>{curUser.name}</h3>
              <p>{curUser.email}</p>

              <Link to={`/update/${curUser._id}`}>
                <button className="btn btn-neutral btn-sm">update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
