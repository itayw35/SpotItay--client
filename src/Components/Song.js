import "./Song.css";
export default function Song(props) {
  return (
    <div className="song" onClick={() => props.choose(props.id)}>
      <td> {props.song} </td>
      <button className="remove-button" onClick={props.remove}>
        Remove
      </button>
    </div>
  );
}
