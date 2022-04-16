
import React, { Component, useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-react';
import Results from './Results';
import './App.css';


const styles = {
  wrap: {
    display: "flex",
    flexDirection:"column"
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};


function App() {
  let calendar = DayPilot.Calendar;

  const [ day, setDay ] = useState(DayPilot.Date.today());
  const [ time, setTime ] = useState([]);
  // const [ event, setEvent ] = useState({})
  const [ eventArray, setEventArray ] = useState([]);

  // not using this currently
  // useEffect(() => {
  // const limitEvent = new DayPilot.Event({
  //   start: "2022-04-05T00:00:00",
  //   end: "2022-04-05T09:00:00",
  //   text: "block",
  // }); 
  // setEvent(limitEvent);
  // calendar.events.add(limitEvent)
  //   // return () => {
  //   //   second
  //   // }
  // }, [])

  // deletes the event when the user clicks on it
  const handleEventClicked = (args) => {
    console.log(args.e, args.e.start, args.e.end, args.e.text);
    const dp = args.control;
    // if (args.e.data.text !== "block") {
      dp.events.remove(args.e);
      console.log(dp.events);
      setEventArray(dp.events.list);
    // }
  }

  // creates an event when the user clicks on a time block
  const handleTimeSelected = (args) => {
    console.log(`You selected: start=${args.start}; end=${args.end}`);
    setTime([args.start, args.end]);
    console.log(args);

    // the two parameters of the event time block in string format
    // eg. "2022-04-05T09:00:00"
    const start = args.start;
    const end = args.end;

    const dp = args.control;
    dp.clearSelection();

    // if (start.value > "2022-04-05T09:00:00"){
    console.log(args);
    dp.events.add(
      new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: `Available: ${start.getHours()}:${
          start.getMinutes() <= 9
            ? "0" + start.getMinutes()
            : start.getMinutes()
        }-${end.getHours()}:${
          end.getMinutes() <= 9 ? "0" + end.getMinutes() : end.getMinutes()
        }`,
      })
    );
    // dp.events.list contains all of the events that have been created
    setEventArray(dp.events.list);
    // }
  };
  

  return (
    <div className="App" style={styles.wrap}>
      <div style={styles.left}>
        {/* this is the full month calendar format displayed  */}
        {/* selectMode can be changed to "day" to select one day only; by having it at week it will capture the week that the day the user clicks on is within*/}
        <DayPilotNavigator
          selectMode={"week"}
          showMonths={1}
          skipMonths={1}
          startDate={day}
          selectionDay={day}
          onTimeRangeSelected={(args) => {
            console.log(
              `You clicked ${args.day}; start=${args.start}; end=${args.end}`
            );
            setDay(args.day);
          }}
        />
      </div>

      {/* this is the weekly calendar format displayed */}
      {/* can also change to view one day only */}
      <DayPilotCalendar
        durationBarVisible={false}
        viewType={"Week"}
        startDate={day}
        dayBeginsHour={9}
        dayEndsHour={17}
        headerDateFormat={"d MMMM yyyy"}
        onTimeRangeSelected={handleTimeSelected}
        onEventClick={handleEventClicked}
        showEventStartEnd={true}
        ref={(component) => {
          calendar = component && component.control;
        }}
      />


      <Results />
    </div>
  );
}


export default App;