import React, {Component} from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import {Home, Calendar, Messages, AddEventForm} from './Content'
import 'antd/dist/antd.css'
import { Button } from 'antd'

class Template extends Component {

	render() {
		return (
			<div className="dinfont">
				<header>
					<h1>SF Oxford 2018</h1>
					<Link to="/"><Button>Home</Button></Link>
					<Link to="/calendar"><Button>Calendar</Button></Link>
					<Link to="/messages"><Button>Messages</Button></Link>
					<Link to="/addevent"><Button>Add Event</Button></Link>
				</header>
				<main>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/calendar" component={Calendar} />
						<Route path="/messages" component={Messages} />
						<Route path="/addevent" component={AddEventForm} />
					</Switch>
				</main>
			</div>
			)
	}
}

export default Template