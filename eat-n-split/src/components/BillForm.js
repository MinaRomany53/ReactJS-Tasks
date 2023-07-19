import { useState } from "react";

export default function BillForm({
  friends,
  selectedFriend,
  onUpdatedFriends,
}) {
  // Controlled Elements
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = billValue ? billValue - yourExpense : "";
  const [payer, setPayer] = useState("you");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!billValue || !yourExpense) return alert("Please fill all fields");
    if (yourExpense > billValue)
      return alert("Your expense can't be greater than bill value");
    const updatedFriends = friends.map((friend) => {
      if (friend.id === selectedFriend.id) {
        if (payer === "you") {
          return {
            ...friend,
            balance: friend.balance + friendExpense,
          };
        } else {
          return {
            ...friend,
            balance: friend.balance - friendExpense,
          };
        }
      } else {
        return friend;
      }
    });
    onUpdatedFriends(updatedFriends);
    setBillValue("");
    setYourExpense("");
    setPayer("you");
  };

  return (
    <form className=" form-split-bill" onSubmit={handleSubmit}>
      <h2>Split A Bill With {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="number"
        placeholder="Bill value"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />
      <label>🕴️ Your expense</label>
      <input
        type="number"
        placeholder="Your expense"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billValue
              ? yourExpense
              : Number(e.target.value)
          )
        }
      />
      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="number" disabled value={friendExpense} />
      <label>🤑 Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="you">You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
