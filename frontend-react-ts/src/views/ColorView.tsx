import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { ListOfColors } from "../domains/ListOfColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetColorService from "../services/GetColorService";
import CreationModal from "../components/CreationModal";
import { NewColor } from "../domains/NewColor";

const ColorView = () => {
  const [listOfColors, setListOfColors] = useState<ListOfColors>({
    data: [],
  });
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [newColor, setNewColor] = useState<NewColor>({
    name: "",
    hex: "",
  });

  useEffect(() => {
    GetColorService.list().then((value) => setListOfColors(value));
  }, []);

  const openCreationModal = () => setIsModalOpened(true);

  const save = () => {
    console.warn({ newColor });
  };
  const closeModal = () => setIsModalOpened(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewColor((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
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
          {listOfColors.data.map(({ name, hex }) => (
            <tr key={name}>
              <th>{name}</th>
              <th>{hex}</th>
              <th>
                <button className="button is-danger">
                  <span className="icon">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </th>
            </tr>
          ))}
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
  const creationColorForm = (
    <>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            type="text"
            className="input"
            name="name"
            onChange={handleChange}
            value={newColor.name}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Hex</label>
        <div className="control">
          <input
            type="text"
            className="input"
            name="hex"
            onChange={handleChange}
            value={newColor.hex}
          />
        </div>
      </div>
    </>
  );
  return (
    <>
      <CreationModal
        isOpen={isModalOpened}
        title="Create a new color"
        onSave={save}
        onCancel={closeModal}
        children={creationColorForm}
      ></CreationModal>
      <div className="is-flex is-justify-content-end">
        <button
          className="button is-primary is-large is-rounded"
          onClick={openCreationModal}
        >
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
