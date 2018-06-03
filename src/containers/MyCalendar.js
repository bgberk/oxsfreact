import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Modal, Tag} from 'antd'
import 'antd/dist/antd.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('en-GB')
BigCalendar.momentLocalizer(moment);

// Set up formats
let formats = {
  dayFormat: 'ddd',
  timeGutterFormat: 'ha',
  dayRangeHeaderFormat: function (_ref3, culture, local) { var start = _ref3.start; var end = _ref3.end; return local.format(start, 'MMMM D', culture) + ' - ' + local.format(end, 'D', culture); },
  agendaHeaderFormat: function (_ref3, culture, local) { var start = _ref3.start; var end = _ref3.end; return local.format(start, 'MMMM D', culture) + ' - ' + local.format(end, 'D', culture); },
}

const minTime = new Date();
minTime.setHours(7, 0, 0);

// calendar styling
const styles = {
  height: '450px',
  backgroundColor: 'rgba(255,255,255,0.85)',
  fontFamily: 'DINRoundWeb'
}

// Event Appearance
function MyEvent({ event }) {
  return (
    <div>
      <p>{event.title}</p>
      <small>{event.guestcount} attending</small>
    </div>
    )
}

class EventAgendaContainer extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div style={{cursor: 'pointer' }}>
        <div style={{ display: 'flex', 
                      justifyContent:'space-between'}} 
             onClick={this.showModal}>
          <span style={{ fontWeight: 'bold' }}>
            {this.props.title}
          </span>
          <Tag style={{fontFamily: 'DINRoundWeb'}}color={(this.props.type === 'Activity')?'#ff4c32'
                :(this.props.type === 'Meeting')?'#00c16b'
                :(this.props.type === 'Trip')?'#1bbcc4'
                :'#ffb800'}>
                  {this.props.type}
                </Tag>
        </div>
        <em>{this.props.location}</em>
          
        <Modal
          style={{fontFamily: 'DINRoundWeb'}}
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.props.desc}</p>
          <p>There are {this.props.guestcount} people attending!</p>
        </Modal>
      </div>
    );
  }
}

function EventAgenda({ event }) {
  return (
    <div>
      <EventAgendaContainer title={event.title}
                            desc={event.desc}
                            guestcount={event.guestcount}
                            type={event.type}
                            location={event.location}
                            />
                            

    </div>
  )
}

let components = {
  event: MyEvent,
  agenda: {
       event: EventAgenda
  }
}

const MyCalendar = props => (
    <BigCalendar
      style={styles} // set height of calendar IMPORTANT
      views={['week', 'agenda']} // only allow week and agenda
      defaultView={'agenda'} // default view week
      selectable={true} // allow events and slots to be selected
      events={props.events} // import list from props
      step={15} // enable 15 min slots
      timeslots={4} // fit four slots in one
      scrollToTime={minTime} // start calendar at 7am
      formats= { formats } // formats for all the headers
      defaultDate={minTime} // fix for events not showing on agenda
      length={7} //number of agenda days shown
      showMultiDayTimes // for events that go past midnight
      drilldownView = {'agenda'} // go to agenda when day is clicked
      components={components}
    />
)

export default MyCalendar