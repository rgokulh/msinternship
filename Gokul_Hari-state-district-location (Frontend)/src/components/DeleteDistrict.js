import { useEffect } from "react";
import districtService from "../services/Service";

function DeleteDistrict({
  districtToDelete,
  setShowDeleteDistrict,
  setDistricts,
  districts,
}) {
  useEffect(() => {
    const handleDeleteDistrict = async () => {
      await districtService.deleteDistrict(districtToDelete.district_id);
      setDistricts(
        districts.filter(
          (district) => district.district_id !== districtToDelete.district_id
        )
      );
      setShowDeleteDistrict(false);
    };

    handleDeleteDistrict();
  }, [districtToDelete, setDistricts, districts, setShowDeleteDistrict]);

  return null;
}

export default DeleteDistrict;
