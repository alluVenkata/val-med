import moment from "moment";

export const getNotes = (schema, request) => {
  return schema.notes.all();
};

export const setNotes = (schema, request) => {
  const { notes } = request.requestBody;
  const allNotes = schema.notes.all();
  const lastone = allNotes.models[allNotes.models.length - 1];
  return schema.notes.create({
    id: lastone.id + 1,
    time: moment().format(),
    message: notes,
  });
};

export const notesData = [
  {
    id: "123",
    time: "2021-08-09T23:38:22+00:00",
    message: "Note to health care staff. Sample note.",
  },
  {
    id: "145",
    time: "2021-08-05T22:38:22+00:00",
    message: "Note to health care staff. new note.",
  },
  {
    id: "146",
    time: "2021-08-01T22:38:22+00:00",
    message: "Note to health care staff.",
  },
  {
    id: "147",
    time: "2021-08-01T05:38:22+00:00",
    message: "Note to health care staff.",
  },
  {
    id: "148",
    time: "2021-07-20T02:38:22+00:00",
    message: "Note to health care staff.",
  },
];
