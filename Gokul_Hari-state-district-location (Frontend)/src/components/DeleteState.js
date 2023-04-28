import { useEffect } from "react";
import stateService from "../services/Service";

function DeleteState({ stateToDelete, setShowDeleteState, setStates, states }) {
  useEffect(() => {
    const handleDeleteState = async () => {
      await stateService.deleteState(stateToDelete.state_id);
      setStates(
        states.filter((state) => state.state_id !== stateToDelete.state_id)
      );
      setShowDeleteState(false);
    };

    handleDeleteState();
  }, [stateToDelete, setStates, states, setShowDeleteState]);

  return null;
}

export default DeleteState;
