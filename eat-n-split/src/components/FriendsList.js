import { useState } from "react";
import Friend from "./Friend";

export default function FriendsList({ friends, onSelect }) {
  const [selectedID, setSelectedID] = useState(null);
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectedID={(id) => {
            setSelectedID(id);
            onSelect(friends.find((friend) => friend.id === id));
          }}
          selectedID={selectedID}
        />
      ))}
    </ul>
  );
}
