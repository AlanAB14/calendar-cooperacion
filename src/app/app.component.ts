import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import * as moment from 'moment';
import 'moment/locale/es'; 
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    buttonText: {
      today:    'Hoy',
      month:    'mes',
      week:     'semana',
      day:      'día',
      list:     'lista',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: 'es',
    dayCellContent(renderProps, createElement) {
      if (renderProps.dow >= 1 && renderProps.dow <= 5) {
        let italicEl = document.createElement('div')
        italicEl.classList.add('grid-items')
        italicEl.innerHTML = `
             <div class="show-item-date">${renderProps.dayNumberText}</div>
             <div class="box-items">
             <div class="show-item"><label>40.000.000</label></div>
             <div class="show-item item-negativo"><label>-4.323.242</label></div>
             <div class="show-item item-negativo"><label>-23.424.444</label></div>
             <div class="show-item item-total"><label>67.747.686</label></div>
             </div>
             `

        // const customContentDiv = createElement('div', {
        //   class: 'show-box',
        //   innerHTML: `
        //     <div class="show-item"><p>Asignado</p><label>40.000.000</label></div>
        //     <div class="show-item item-negativo"><p>Comprometido</p><label>-4.323.242</label></div>
        //     <div class="show-item item-negativo"><p>Tentativo</p><label>-23.424.444</label></div>
        //     <div class="show-item item-total"><p>Disponible</p><label>67.747.686</label></div>
        //   `
        // });
        let arrayOfDomNodes = [ italicEl ]
        return { domNodes: arrayOfDomNodes }
      }else {
        return `${renderProps.dayNumberText}`;
      }
    },
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
   events: []
  }

  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    const currentDate = new Date();
    this.generateEventsForMonth(currentDate.getFullYear(), currentDate.getMonth());
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
    Swal.fire({
      html:
      '<div class="show-box">'+
      '<div class="show-item"><p>Asignado</p><label>40.000.000</label></div>' +
      '<div class="show-item item-negativo"><p>Comprometido</p><label>-4.323.242</label></div>' +
      '<div class="show-item item-negativo"><p>Tentativo</p><label>-23.424.444</label></div>' +
      '<div class="show-item item-total"><p>Disponible</p><label>67.747.686</label></div>' +
      '</div>'
    })
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  generateEventsForMonth(year: number, month: number) {
    // const events: EventInput[] = [];
    // const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // for (let day = 1; day <= lastDayOfMonth; day++) {
    //   const currentDate = new Date(year, month, day);
    //   const dayOfWeek = currentDate.getDay();

    //   // Comprueba si el día es laborable (de lunes a viernes)
    //   if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    //     const event: EventInput = {
    //       id: createEventId(),
    //       title: 'Evento en día laborable',
    //       start: currentDate,
    //       allDay: true
    //     };
    //     events.push(event);
    //   }
    // }

    // // Agrega los eventos al calendario
    // this.calendarOptions.events = events;
  }
}
