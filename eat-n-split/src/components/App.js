import { useState } from "react";
import FriendsList from "./FriendsList";
import AddFriendForm from "./AddFriendForm";
import BillForm from "./BillForm";

const initialFriends = [
  {
    id: 118836,
    name: "Messi",
    image:
      "https://scontent.fcai19-7.fna.fbcdn.net/v/t1.6435-1/199385759_345470910277839_3988273979229903886_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&cb=99be929b-59f725be&ccb=1-7&_nc_sid=c6021c&_nc_ohc=P78wZFQcPq4AX8XDj7A&_nc_ht=scontent.fcai19-7.fna&oh=00_AfAlCdpfb4pZNDWH8Z95L46ZQZAS1I7E7uv6Qvi85rn-nA&oe=64DE4F05",
    balance: -7,
  },
  {
    id: 933372,
    name: "MoSalah",
    image: "https://i.pravatar.cc/48?u=566884",
    balance: 20,
  },
  {
    id: 499476,
    name: "Mina",
    image: "https://i.pravatar.cc/48?u=11254",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // console.log("selectedFriend", selectedFriend);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelect={setSelectedFriend} />

        {isOpen && (
          <AddFriendForm
            onSetFriend={(friend) => {
              setFriends([...friends, friend]);
              setIsOpen(false);
            }}
          />
        )}

        <button className="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Add friend"}
        </button>
      </div>

      {selectedFriend && (
        <BillForm
          friends={friends}
          selectedFriend={selectedFriend}
          onUpdatedFriends={setFriends}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
