export const getNotificaitons = (schema, request) => {
  return schema.notifications.all();
};

export const setNotifications = (schema, request) => {
  const body = request.requestBody;
  const notification = schema.notifications.find(body.id);
  notification.update({ closed: true });
  return new Response(201);
};

export const notificationData = [
  {
    id: "123",
    time: "2021-08-09T23:38:22+00:00",
    message:
      "Your activity level is low you can report any issues or sympthoms you are having in the REPORTS tab.",
    link: "",
    linkText: "",
    closed: false,
  },
  {
    id: "145",
    time: "2021-08-05T22:38:22+00:00",
    message:
      "You reported an increase in PAIN during your last report. Visit {link} for advice on how to manage pain.",
    link: "this link",
    linkText: "example.com",
    closed: false,
  },
  {
    id: "146",
    time: "2021-08-01T22:38:22+00:00",
    message:
      "You reported an increase in PAIN during your last report. Visit {link} for advice on how to manage pain.",
    link: "this link",
    linkText: "example.com",
    closed: false,
  },
  {
    id: "147",
    time: "2021-08-01T05:38:22+00:00",
    message:
      "You reported an increase in PAIN during your last report. Visit {link} for advice on how to manage pain.",
    link: "this link",
    linkText: "example.com",
    closed: false,
  },
  {
    id: "148",
    time: "2021-07-20T02:38:22+00:00",
    message:
      "You reported an increase in PAIN during your last report. Visit {link} for advice on how to manage pain.",
    link: "this link",
    linkText: "example.com",
    closed: false,
  },
];
