import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import CreationModal from "../components/CreationModal";
import ModalContext from "../contexts/ModalContext";
import { Color } from "../domains/Color";
import { ListOfColors } from "../domains/ListOfColors";
import { NewColor } from "../domains/NewColor";
import CreateColorService from "../services/CreateColorService";
import GetColorService from "../services/GetColorService";
import RemoveColorService from "../services/RemoveColorService";

const ColorView = () => {
  const [listOfColors, setListOfColors] = useState<ListOfColors>({
    data: [],
  });
  const [isCreationModalOpened, setIsCreationModalOpened] = useState(false);
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState(false);
  const [newColor, setNewColor] = useState<NewColor>({
    name: "",
    hex: "",
  });
  const [colorsCreatedNow, setColorsCreatedNow] = useState<Color[]>([]);
  const [colorToRemove, setColorToRemove] = useState<Color>();
  const [reason, setReason] = useState("");

  const fetchData = () =>
    GetColorService.list().then((value) => setListOfColors(value));

  const handleOnSave = () => {
    CreateColorService.perform(newColor).then((color) => {
      setNewColor(() => ({
        name: "",
        hex: "",
      }));
      setIsCreationModalOpened(false);
      setColorsCreatedNow((pre) => [...pre, color]);
      fetchData();
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewColor((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const openCreationModal = () => setIsCreationModalOpened(true);

  const handleOnCancel = () => {
    setIsCreationModalOpened(false);
    setIsConfirmationModalOpened(false);
  };

  const handleOnConfirm = () => {
    RemoveColorService.perform(colorToRemove!)
      .then(() => {
        setIsConfirmationModalOpened(false);
      })
      .catch((err) => {
        setReason(err);
        setTimeout(() => {
          setReason("");
        }, 3000);
      });
  };

  const handleRemoveColor = (color: Color) => {
    setColorToRemove({ ...color });
    setIsConfirmationModalOpened(true);
  };

  const wasColorAddedNow = (color: Color) =>
    !!colorsCreatedNow.find((c) => c.id === color.id);

  const getSelectedColorClass = (color: Color) => {
    return wasColorAddedNow(color) ? "is-selected" : "";
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {listOfColors.data.map((color) => (
            <tr key={color.id} className={getSelectedColorClass(color)}>
              <th>{color.name}</th>
              <th>{color.hex}</th>
              <th>
                <button
                  className="button is-danger"
                  onClick={() => handleRemoveColor(color)}
                >
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
  const confirmationDeletion = (
    <>
      <p>You will remove the color : {colorToRemove?.name}</p>
      {reason && (
        <article className="message is-danger">
          <div className="message-body">{reason}</div>
        </article>
      )}
    </>
  );
  return (
    <ModalContext.Provider
      value={{
        isConfirmationOpen: isConfirmationModalOpened,
        isCreationOpen: isCreationModalOpened,
      }}
    >
      <CreationModal
        onSave={handleOnSave}
        onCancel={handleOnCancel}
        children={creationColorForm}
      ></CreationModal>
      <ConfirmationModal
        children={confirmationDeletion}
        onCancel={handleOnCancel}
        onConfirm={handleOnConfirm}
      ></ConfirmationModal>
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
    </ModalContext.Provider>
  );
};

export default ColorView;
