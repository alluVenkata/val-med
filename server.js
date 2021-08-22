import { createServer, Model } from "miragejs";
import { deviceData, getDevices } from "./stubs/myDevices";
import { getNotes, notesData, setNotes } from "./stubs/myNotes";

import {
  getNotificaitons,
  notificationData,
  setNotifications,
} from "./stubs/notifications";
import { getSymptoms, setSymptoms, symptomsData } from "./stubs/symptoms";
import userLogin, { defaultUser } from "./stubs/userLogin";

export default function () {
  createServer({
    models: {
      user: Model,
      notification: Model,
      symptoms: Model,
      notes: Model,
      devices: Model,
    },
    seeds(server) {
      server.create("user", defaultUser());
      notificationData.map((notification) =>
        server.create("notification", notification)
      );
      symptomsData.map((symptom) => server.create("symptom", symptom));
      notesData.map((notes) => server.create("note", notes));
      deviceData.map((devices) => server.create("device", devices));
    },
    routes() {
      this.post("/user/login", userLogin);
      this.get("/notifications", getNotificaitons);
      this.post("/notifications", setNotifications);
      this.post("/symptoms", getSymptoms);
      this.post("/symptoms/create", setSymptoms);
      this.get("/mynotes", getNotes);
      this.post("/mynotes", setNotes);
      this.post("/devices", getDevices);
    },
  });
}
