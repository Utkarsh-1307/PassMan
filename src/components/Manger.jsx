import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const Manger = () => {
  const [form, setform] = useState({ site: "", username: "", pass: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const ref = useRef();
  const passRef = useRef();

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
      setPasswordArray(passwords)
    
  }
  

  useEffect(() => {
   getPassword()
  }, [])

  const showPassword = () => {
    passRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passRef.current.type = "text";
    }
  };

  const savePassword = async () => {
     if (form.site.length > 3 && form.username.length > 3 && form.pass.length > 3)
       {

    // If any such id exists in the db, delete it 
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

   
    setform({ site: "", username: "", pass: "" });
    toast.success("Saved");
   
  };
  
}

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const CopyText = (text) => {
    toast.success("Copied to Clipboard");
    navigator.clipboard.writeText(text);
  };
  const deletePassword = async (id) => {
    console.log("deleting id" , id)
    let c = confirm("do you want to delete !")
    if(c){
    setPasswordArray(passwordArray.filter(item => item.id !== id));
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

    toast.success("Deleted Successfully !");
  }
  };


  const editPassword = (id) => {
    console.log("editing id" , id)
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    toast.success("Edited Successfully !");

  };

 
  

  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className=" md:mycontainer  ">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-900">&lt;</span>
          Pass
          <span className="text-green-900">Man/&gt;</span>
        </h1>
        <p className="text-green-950 text-lg font-bold text-center">
          Your Own Password manager Superhero:PassMan
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            placeholder="enter your Website URL"
            onChange={handleChange}
            className="rounded-full border border-green-800 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full gap-8">
            <input
              value={form.username}
              placeholder="enter your Username"
              onChange={handleChange}
              className="rounded-full border border-green-800 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passRef}
                value={form.pass}
                placeholder="enter Password"
                onChange={handleChange}
                className="rounded-full border border-green-800 w-full p-4 py-1"
                type="password"
                name="pass"
                id=""
              />
              <span
                className="absolute right-[2px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="icons/eye.png"
                  className="p-1"
                  width={20}
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center w-fit items-center bg-green-500 hover:bg-green-600 rounded-full px-4 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No Password To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a href="{item.site}" target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              CopyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              CopyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.pass}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              CopyText(item.pass);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <span className="cursor-pointer mx-1"  onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#242424"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manger;
