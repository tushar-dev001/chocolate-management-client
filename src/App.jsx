import { Link, useLoaderData } from "react-router-dom";
import "./App.css";
import Swal from "sweetalert2";
import { useState } from "react";

function App() {
  const loadedChocolates = useLoaderData();
  const [chocolates, setChocolates] = useState(loadedChocolates)

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/chocolates/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              const remaining = chocolates.filter(cho => cho._id !== _id)
              setChocolates(remaining)
            }
          });
      }
    });
  };

  return (
    <>
      <div className="w-[80%] mx-auto">
        <Link to="addChocolate">
          <button className="btn btn-outline btn-success">Add Chocolate</button>
        </Link>
        <h1>Chocolate Management System: {chocolates.length}</h1>
      </div>

      <div className="w-[80%] mt-10 mx-auto">
        <ul className="flex bg-orange-600 text-white font-bold text-lg rounded-lg p-2 justify-between">
          <li>Image</li>
          <li>Name</li>
          <li>Country</li>
          <li>Category</li>
          <li>Action</li>
        </ul>

        {chocolates.map((chocolate) => (
          <>
            <ul key={chocolate._id} className="flex justify-between mt-4">
              <li>
                <img src={chocolate.photo} alt="" />
              </li>
              <li>{chocolate.name}</li>
              <li>{chocolate.country}</li>
              <li>{chocolate.category}</li>
              <li>
                <Link to={`updateChocolate/${chocolate._id}`}>
                  <button className="btn btn-outline btn-warning">Edit</button>
                  </Link>
                <button
                  onClick={() => handleDelete(chocolate._id)}
                  className="btn btn-outline btn-warning ml-2"
                >
                  Delete
                </button>
              </li>
            </ul>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
