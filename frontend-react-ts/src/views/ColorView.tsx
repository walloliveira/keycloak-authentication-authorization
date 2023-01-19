import { useState } from "react";
import { ListOfColors } from "../domains/ListOfColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ColorView = () => {
  const [listOfColors, setListOfColors] = useState<ListOfColors>({
    data: [],
  });

  let content;
  if (listOfColors.data.length) {
    content = (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hex</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {listOfColors.data.map(({ name, hex }) => (
              <>
                <th>{name}</th>
                <th>{hex}</th>
                <th>
                  <button className="button is-danger">
                    <span className="icon">
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </button>
                </th>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    );
  } else {
    content = (
      <section className="notification is-warning is-light">
        <h2 className="subtitle is-2">No colors, yet.</h2>
        <p>No colors in the system, yet! Create a new one!</p>
      </section>
    );
  }

  return (
    <>
      <div className="is-flex is-justify-content-end">
        <button className="button is-primary is-large is-rounded">
          <span className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span>Create</span>
        </button>
      </div>
      <div className="mt-2">{content}</div>
    </>
  );
};

export default ColorView;
