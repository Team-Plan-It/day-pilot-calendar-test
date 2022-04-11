// each user object in the events array has a user name and an array of dates
// the array of dates contains arrays with a start time and end time for each time block


  const events = [
    {
      user: "Thor",
      dates: [
        ["2022-04-11T09:00:00", "2022-04-11T14:00:00"],
        ["2022-04-12T11:00:00", "2022-04-12T16:00:00"],
        ["2022-04-13T09:00:00", "2022-04-13T12:00:00"],
        ["2022-04-14T12:00:00", "2022-04-14T14:00:00"],
        ["2022-04-15T09:00:00", "2022-04-15T14:00:00"],
      ],
    },
    {
      user: "Loki",
      dates: [
        ["2022-04-11T12:00:00", "2022-04-11T17:00:00"],
        ["2022-04-12T10:00:00", "2022-04-12T12:00:00"],
        ["2022-04-13T12:00:00", "2022-04-13T16:00:00"],
        ["2022-04-14T11:00:00", "2022-04-14T13:00:00"],
        ["2022-04-15T12:00:00", "2022-04-15T16:00:00"],
      ],
    },
    {
      user: "Gamora",
      dates: [
        ["2022-04-11T10:00:00", "2022-04-11T12:00:00"],
        ["2022-04-12T13:00:00", "2022-04-12T17:00:00"],
        ["2022-04-13T12:00:00", "2022-04-13T14:00:00"],
        ["2022-04-14T11:00:00", "2022-04-14T15:00:00"],
        ["2022-04-15T10:00:00", "2022-04-15T12:00:00"],
      ],
    },
    {
      user: "Natasha",
      dates: [
        ["2022-04-11T09:00:00", "2022-04-11T12:00:00"],
        ["2022-04-11T14:00:00", "2022-04-11T17:00:00"],
        ["2022-04-12T10:00:00", "2022-04-12T13:00:00"],
        ["2022-04-13T09:00:00", "2022-04-13T11:00:00"],
        ["2022-04-14T11:00:00", "2022-04-14T17:00:00"],
        ["2022-04-15T09:00:00", "2022-04-15T12:00:00"],
      ],
    },
  ];


export default events;