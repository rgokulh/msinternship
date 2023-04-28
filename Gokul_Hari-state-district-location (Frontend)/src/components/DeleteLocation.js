import { useEffect } from "react";
import locationService from "../services/Service";

function DeleteLocation({
  locationToDelete,
  setShowDeleteLocation,
  setLocations,
  locations,
}) {
  useEffect(() => {
    const handleDeleteLocation = async () => {
      await locationService.deleteLocation(locationToDelete.location_id);
      setLocations(
        locations.filter(
          (location) => location.location_id !== locationToDelete.location_id
        )
      );
      setShowDeleteLocation(false);
    };

    handleDeleteLocation();
  }, [locationToDelete, setLocations, locations, setShowDeleteLocation]);

  return null;
}

export default DeleteLocation;
