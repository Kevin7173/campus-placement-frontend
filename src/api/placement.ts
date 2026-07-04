import API from "./axios";

export const getPlacements = () =>
  API.get("/placements");

export const getStudentPlacements = () =>
  API.get("/placements/student");

export const createPlacement = (
  data: any
) =>
  API.post("/placements", data);

export const updatePlacement = (
  id: string,
  data: any
) =>
  API.put(
    `/placements/${id}`,
    data
  );


export const deletePlacement = (
  id: string
) =>
  API.delete(`/placements/${id}`);