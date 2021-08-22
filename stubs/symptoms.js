// export const getNotificaitons = (schema, request) => {
//   return schema.notifications.all();
// };

import moment from "moment";
import { SYMPTOMS_FILTER } from "../src/howIFeel";

export const setSymptoms = (schema, request) => {
  const body = request.requestBody;
  const allSympthoms = schema.symptoms.all();
  return schema.symptoms.create({
    ...body,
    id: allSympthoms.models.length + 1,
    time: moment().format(),
  });
};

const getNextSymptomId = (allSympthoms, currentDate, to) => {
  let toValue;
  const symptomIndex = allSympthoms.models.findIndex(
    (s) => s.time === currentDate
  );

  let newId =
    symptomIndex + 1 < allSympthoms.models.length
      ? symptomIndex + 1
      : symptomIndex;
  if (to) {
    toValue =
      newId + to < allSympthoms.models.length
        ? newId + to
        : allSympthoms.models.length;
  }
  const isPrev = newId > 0;
  const isNext = to
    ? toValue < allSympthoms.models.length
    : newId < allSympthoms.models.length - 1;
  return { newId, isPrev, isNext, to: toValue };
};

const getPrevSymptomId = (allSympthoms, currentDate, to) => {
  let toValue;
  const symptomIndex = allSympthoms.models.findIndex(
    (s) => s.time === currentDate
  );

  let newId = symptomIndex - 1 >= 0 ? symptomIndex - 1 : 0;
  if (to) {
    toValue = symptomIndex;
    newId = newId - to >= 0 ? newId - to : 0;
    // newId = newId < 0 ? 0 : newId;
  }
  const isPrev = newId > 0;
  const isNext = to
    ? toValue < allSympthoms.models.length - 1
    : newId < allSympthoms.models.length - 1;
  return { newId, isPrev, isNext, to: toValue };
};

const handleLatest = (currentDate, isNext, allSympthoms, schema, isPrev) => {
  if (currentDate) {
    if (isPrev) {
      const { newId, isPrev, isNext } = getPrevSymptomId(
        allSympthoms,
        currentDate
      );
      return new Response({
        symptoms: allSympthoms.models[newId],
        isNext,
        isPrev,
      });
    }
    if (isNext) {
      const { newId, isPrev, isNext } = getNextSymptomId(
        allSympthoms,
        currentDate
      );
      return new Response({
        symptoms: allSympthoms.models[newId],
        isNext,
        isPrev,
      });
    }
  }
  const symptoms = schema.symptoms.find(allSympthoms.models.length);
  return new Response({
    symptoms: symptoms,
    isNext: false,
    isPrev: true,
  });
};

const handleWeek = (currentDate, isNext, allSympthoms, schema, isPrev) => {
  if (currentDate) {
    if (isPrev) {
      const nextDataWeek = getPrevSymptomId(allSympthoms, currentDate, 7);
      return new Response({
        symptoms: allSympthoms.models.slice(
          nextDataWeek.newId,
          nextDataWeek.to
        ),
        isNext: nextDataWeek.isNext,
        isPrev: nextDataWeek.isPrev,
      });
    }
    if (isNext) {
      const prevDataWeek = getNextSymptomId(allSympthoms, currentDate, 7);
      return new Response({
        symptoms: allSympthoms.models.slice(
          prevDataWeek.newId,
          prevDataWeek.to
        ),
        isNext: prevDataWeek.isNext,
        isPrev: prevDataWeek.isPrev,
      });
    }
  }

  return new Response({
    symptoms: allSympthoms.models.slice(
      allSympthoms.models.length - 7,
      allSympthoms.models.length
    ),
    isNext: false,
    isPrev: true,
  });
};

const handleMonth = (currentDate, isNext, allSympthoms, schema, isPrev) => {
  if (currentDate) {
    if (isPrev) {
      const nextDataMonth = getPrevSymptomId(allSympthoms, currentDate, 10);
      return new Response({
        symptoms: allSympthoms.models.slice(
          nextDataMonth.newId,
          nextDataMonth.to
        ),
        isNext: nextDataMonth.isNext,
        isPrev: nextDataMonth.isPrev,
      });
    }
    if (isNext) {
      const prevDataMonth = getNextSymptomId(allSympthoms, currentDate, 10);
      return new Response({
        symptoms: allSympthoms.models.slice(
          prevDataMonth.newId,
          prevDataMonth.to
        ),
        isNext: prevDataMonth.isNext,
        isPrev: prevDataMonth.isPrev,
      });
    }
  }
  return new Response({
    symptoms: allSympthoms.models.slice(
      allSympthoms.models.length - 10,
      allSympthoms.models.length
    ),
    isNext: false,
    isPrev: true,
  });
};

export const getSymptoms = (schema, request) => {
  const {
    range,
    currentDate,
    isPrev = false,
    isNext = false,
  } = request.requestBody;
  const allSympthoms = schema.symptoms.all();
  switch (range) {
    case SYMPTOMS_FILTER.LATEST:
      return handleLatest(currentDate, isNext, allSympthoms, schema, isPrev);
    case SYMPTOMS_FILTER.WEEK:
      return handleWeek(currentDate, isNext, allSympthoms, schema, isPrev);
    case SYMPTOMS_FILTER.MONTH:
      return handleMonth(currentDate, isNext, allSympthoms, schema, isPrev);
    case SYMPTOMS_FILTER.YEAR: {
      const symptoms = schema.symptoms.all();
      return new Response({
        symptoms: symptoms.models,
        isNext: false,
        isPrev: false,
      });
    }
  }
};

export const symptomsData = [
  {
    id: 1,
    time: "2020-10-01T02:38:22+00:00",
    fatigue: "5",
    pain: "2",
    qol: "4",
    burden: "5",
  },
  {
    id: 2,
    time: "2020-12-01T02:38:22+00:00",
    fatigue: "6",
    pain: "3",
    qol: "5",
    burden: "6",
  },
  {
    id: 3,
    time: "2021-01-01T02:38:22+00:00",
    fatigue: "7",
    pain: "2",
    qol: "6",
    burden: "7",
  },
  {
    id: 4,
    time: "2021-02-01T02:38:22+00:00",
    fatigue: "8",
    pain: "4",
    qol: "7",
    burden: "8",
  },

  {
    id: 5,
    time: "2021-03-01T02:38:22+00:00",
    fatigue: "1",
    pain: "1",
    qol: "1",
    burden: "1",
  },
  {
    id: 6,
    time: "2021-05-01T02:38:22+00:00",
    fatigue: "6",
    pain: "4",
    qol: "5",
    burden: "2",
  },

  {
    id: 7,
    time: "2021-05-05T02:38:22+00:00",
    fatigue: "2",
    pain: "1",
    qol: "1",
    burden: "1",
  },
  {
    id: 8,
    time: "2021-06-01T02:38:22+00:00",
    fatigue: "4",
    pain: "1",
    qol: "5",
    burden: "1",
  },

  {
    id: 9,
    time: "2021-06-20T02:38:22+00:00",
    fatigue: "8",
    pain: "2",
    qol: "4",
    burden: "5",
  },
  {
    id: 10,
    time: "2021-07-20T02:38:22+00:00",
    fatigue: "8",
    pain: "4",
    qol: "1",
    burden: "2",
  },
  {
    id: 11,
    time: "2021-08-01T05:38:22+00:00",
    fatigue: "3",
    pain: "2",
    qol: "6",
    burden: "1",
  },
  {
    id: 12,
    time: "2021-08-02T22:38:22+00:00",
    fatigue: "8",
    pain: "3",
    qol: "2",
    burden: "1",
  },
  {
    id: 13,
    time: "2021-08-05T22:38:22+00:00",
    fatigue: "5",
    pain: "0",
    qol: "3",
    burden: "1",
  },
  {
    id: 14,
    time: "2021-08-09T23:38:22+00:00",
    fatigue: "2",
    pain: "1",
    qol: "3",
    burden: "6",
  },
];
