export default function Friend({ friend, onSelectedID, selectedID }) {
  return (
    <li className={`${selectedID === friend.id ? "selected" : ""}`}>
      <img src={friend.image} alt="friend-img"></img>
      <h3>{friend.name}</h3>
      <p
        className={`${
          friend.balance === 0 ? "" : friend.balance > 0 ? "green" : "red"
        }`}
      >
        {friend.balance === 0
          ? `You and ${friend.name} are even`
          : friend.balance < 0
          ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
          : `${friend.name} owes you ${Math.abs(friend.balance)}$`}
      </p>
      <button
        className="button"
        onClick={() => {
          if (selectedID === friend.id) onSelectedID(null);
          else onSelectedID(friend.id);
        }}
      >
        {`${selectedID === friend.id ? "Close" : "Select"}`}
      </button>
    </li>
  );
}
