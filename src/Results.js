import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import events from "./testEvents";
import eventsByDate from "./testEventsByDate";

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
        console.log(newEvent)
      })
    })

    const availabilityArray = checkForOverlap(eventsByDate);
  }, [])


  const checkForOverlap = (eventsByDate) => {
    // create an array respresenting all time slots(48)
    // loop through each user and put their name in the slot that they are available for
    // find the slots that are same length as num of users

    let allTimeSlots = [];
    
    
    eventsByDate.forEach(date => {
      // loop through by day
      let timeSlotArray = [];
      let timeDisplay = "";

      for(let i=0; i < 48; i++){
        if(i === 0 || i === 1){
          timeDisplay= i%2 === 0 ?`0:00` :`0:30`
        }else{
            timeDisplay = i%2 === 0 ?`${i/2-1}:00` :`${i/2-2}:30`;
          }
          timeSlotArray.push({time: timeDisplay, array:[]})
      }
      date.forEach(user => {
        console.log(user)
        // loop through by user
        user.times.forEach(time => {
          // loop through each user's timeblocks
        
            console.log(time)
            // get start and end time
            let startTimeObject = new DayPilot.Date(time[0]).toDateLocal();
            let endTimeObject = new DayPilot.Date(time[1]).toDateLocal();
           

            console.log(startTimeObject, endTimeObject)
            let start = 
              startTimeObject.getHours() * 2 + 
              (startTimeObject.getMinutes() === 0 ?0 :1);
            let end =
              endTimeObject.getHours() * 2 +
              (endTimeObject.getMinutes() === 0 ? 0 : 1);

            let timeSlot = `${startTimeObject.getHours()}:${startTimeObject.getMinutes()}`;
            let dateStamp = `${startTimeObject.getFullYear()}-${startTimeObject.getMonth()}-${startTimeObject.getDate()}`;

            // add user to timeSlotArray
            for(let i=start; i < end; i++){
              timeSlotArray[i].array.push({user:user.user, startTime:startTimeObject, endTime:endTimeObject})
            }
            console.log(timeSlotArray)
          })
       
        })
        allTimeSlots.push(timeSlotArray);
    })

    console.log(allTimeSlots)

    if(allTimeSlots.length >0){
      showAvailable(allTimeSlots, 4)

    }


    // return allTimeSlots;














    // array to store all over lapping events
    // let overlapEventArray = [];
    // let allTimeBlocks =[];
    

    // console.log("start", eventsByDate[0][0].times[0][0]);
    // console.log("end", eventsByDate[0][0].times[0][1]);
  //   let overlappingEvent = {
  //     start: new DayPilot.Date(eventsByDate[0][0].times[0][0]).toDateLocal(),
  //     end: new DayPilot.Date(eventsByDate[0][0].times[0][1]).toDateLocal(),
  //  };

  //  console.log("overlapStart:", overlappingEvent.start, "overlapEnd:", overlappingEvent.end)
    //loop through events array processing one date at a time to find an overlapping time
    // eventsByDate.forEach((date, index) => {
    //   console.log(date);
    //   for (let day of date) {
    //     console.log(day.times);
    //     // loop through array of timeblocks 
    //     day.times.forEach(time => {
    //       // put all time blocks in an array
    //       allTimeBlocks.push(time);
    //       console.log(allTimeBlocks.sort())
     

          // let tempEvent = {
          //   start: new DayPilot.Date(time[0]).toDateLocal(),
          //   end: new DayPilot.Date(time[1]).toDateLocal(),
          // }


          // if(tempEvent.start > overlappingEvent.start && tempEvent.start < overlappingEvent.end){
          //   // start time of next slot is after the overlapping event start time but before the end time
          //   // make value of overlappingEvent.start the start time of the new slot
          //   overlappingEvent.start = tempEvent.start;
          //   console.log(overlappingEvent.start);
          // }
        
          // if(tempEvent.end < overlappingEvent && tempEvent.end > overlappingEvent.start){
          //   // if new time end is less than overlappingend time but after the overlapping start time
          //   overlappingEvent.end = tempEvent.end;
          //   console.log(overlappingEvent.end)
          // }

    //     })
   


   
    //   } // end of for loop
    //   let overlappingEvent = {
    //     start: allTimeBlocks[0][0],
    //     end: allTimeBlocks[0][1],
    //   };
    //   // loop through array 
    //   allTimeBlocks.forEach(time => {
    //     // changes the start time if it is later than the overlapping start time but before the end
    //     if(time[0] > overlappingEvent.start && time[0] < overlappingEvent.end){
    //       overlappingEvent.start = time[0]
    //     }
    //     // changes the end time
    //     if(time[1] < overlappingEvent.end && time[1] > overlappingEvent.start){
    //       overlappingEvent.end = time[1];
    //     }
    //   })
    //   console.log(overlappingEvent)

    // });
  }

  // create events where all users available
  const showAvailable = (allTimeSlots, numOfUsers) => {
    const allAvailable = allTimeSlots.map(timeSlot => {
       return timeSlot.filter(time => time.length === numOfUsers)
    })
    console.log(allAvailable)
    const results = allAvailable.filter(avail => avail.length > 0);
    console.log(results)
  };


  return (
    <DayPilotCalendar
      durationBarVisible={false}
      viewType={"Week"}
      dayBeginsHour={9}
      dayEndsHour={17}
      headerDateFormat={"d MMMM yyyy"}
      showEventStartEnd={true}
      eventArrangement={"Full"}
      ref={(component) => {
        calendar = component && component.control;
      }}
    />
  );
};

export default Results;