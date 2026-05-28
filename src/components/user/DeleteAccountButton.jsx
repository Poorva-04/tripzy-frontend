import { FaTrash } from "react-icons/fa";
import Loader from "../common/Loader";

const DeleteAccountButton = ({ deleting, onDelete }) => (
  <button className="danger-action" type="button" onClick={onDelete} disabled={deleting}>
    {deleting ? <Loader size="sm" inline /> : <><FaTrash /> Delete account</>}
  </button>
);

export default DeleteAccountButton;