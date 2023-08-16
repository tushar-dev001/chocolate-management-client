import { Link, useLoaderData } from "react-router-dom"
import Swal from "sweetalert2";


const UpdateChocolate = () => {
  const updateChocolate = useLoaderData()
  const {_id, name, country, category, photo} = updateChocolate
  
  const handleUpdateChocolate= (event)=>{
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const country = form.country.value
    const category = form.category.value
    const photo = form.photo.value
    const UpdateChocolates = {name, country, category, photo}
    console.log(UpdateChocolates);

    fetch(`http://localhost:5000/chocolates/${_id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(UpdateChocolates)
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        if(data.modifiedCount > 0){
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: 'Chocolate Updated Successfully',
              })
        }
    })
}


  return (
    <>
      <div>
      <Link to="/">
        <button className="btn btn-outline btn-success">Home</button>
      </Link>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleUpdateChocolate} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  defaultValue={name}
                  name = "name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  type="text"
                  placeholder="country"
                  name = 'country'
                  defaultValue={country}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  placeholder="category"
                  name = 'category'
                  defaultValue={category}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  placeholder="photo"
                  name = 'photo'
                  defaultValue={photo}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateChocolate