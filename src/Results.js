import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import events from "./testEvents";


function Results(){
  let calendar = DayPilot.Calendar;

  const colorArray = ["#ff5733", "#ffb533", "#fcff33", "#33ff46", "#33f6ff", "#3361ff", "#d733ff"];

  const [eventArray, setEventArray] = useState([]);

  useEffect(() => {
    // map through each object in the array
    events.forEach((obj, index) => {
      // assign a color for each user object
      let color = colorArray[index];
      
      obj.dates.forEach((date) => {
        // in each object, map through the array of dates to create new Date Pilot events
        let newEvent = new DayPilot.Event({
          start: date[0],
          end: date[1],
          id: DayPilot.guid(),
          text: obj.user,
          backColor: color,
          fontColor: "#000000",
        })
        // add the new event to the events list
        calendar.events.add(newEvent);
      })
    })
  }, [])

  return (
    <DayPilotCalendar
      durationBarVisible={false}
      viewType={"Week"}
      dayBeginsHour={9}
      dayEndsHour={17}
      showEventStartEnd={true}
      eventArrangement={"Full"}
      ref={(component) => {
        calendar = component && component.control;
      }}
    />
  );
};

export default Results;