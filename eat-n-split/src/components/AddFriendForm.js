import { Fragment, useState } from "react";

export default function AddFriendForm({ onSetFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    `https://i.pravatar.cc/48?u=${(Math.random() * 100000).toFixed(0)}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return alert("Please fill all fields");
    const friend = {
      id: Math.floor(Math.random() * 1000000),
      name: name,
      image: image,
      balance: 0,
    };
    onSetFriend(friend);
    setName("");
    setImage("");
  };
  return (
    <Fragment>
      <form className="form-add-friend " onSubmit={handleSubmit}>
        <label>🧔friend name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>🖼️Image URL </label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="button">Add</button>
      </form>
    </Fragment>
  );
}
