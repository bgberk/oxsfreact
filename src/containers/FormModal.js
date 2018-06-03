import React from 'react'
import { message, Form, Input, Button, DatePicker, Select, Modal } from 'antd'
import 'antd/dist/antd.css'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const CREATE_EVENT = gql`
	mutation createEvent(
		$title: String!,
		$start: DateTime!,
		$end: DateTime!,
		$type: [String!],
		$desc: String!,
		$location: String!,
		$guestcount: Int!
	) {
	  createEvent(
	    title: $title,
	    start: $start,
	    end: $end,
	    type: $type,
	    desc: $desc,
	    location: $location,
	    guestcount: $guestcount
	  ) {
	    id
	  }
	}
`


const styles = {
  fontFamily: 'DINRoundWeb'
};

const FormItem = Form.Item
const success = () => {
	message.success('This event has been added!')
}
const error = () => {
	message.error('Missing required fields.')
}

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
        	style={styles}
          visible={visible}
          title="Create an event"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
				  <div>
				    <Form>
				      <FormItem required={true} label="Event Title" >
		          {getFieldDecorator('title', {
		            rules: [{ required: true}],
		          })(
				        <Input placeholder="Punting at LMH" />
				       )}
				      </FormItem>
				      <FormItem required={true} label="Location" >
		          {getFieldDecorator('location', {
		            rules: [{ required: true}],
		          })(		      
				        <Input placeholder="LMH Boathouse" />
				      )}
				      </FormItem>		      
				      <FormItem label="Description" >
		          {getFieldDecorator('desc')(		      
				        <Input.TextArea placeholder="Take the punts out on the river and have some fun." />
				        )}
				      </FormItem>
				      <FormItem label="Type of Event">
		          {getFieldDecorator('type', {
		          	initialValue: 'Activity'
		          },{
		            rules: [{ required: true}],
		          })(		      
				        <Select mode="multiple">
				          <Select.Option value="Activity">Activity</Select.Option>
				          <Select.Option value="Academic">Academic</Select.Option>
				          <Select.Option value="Trip">Trip</Select.Option>
				          <Select.Option value="Meeting">Meeting</Select.Option>
				        </Select>
				      )}
				      </FormItem>      
				      <FormItem required={true} label="Starts" >
		          {getFieldDecorator('start', {
		            rules: [{ required: true}],
		          })(		      
				        <DatePicker showToday={false} 
				        						format="MM-DD-YYYY HH:mm" 
				        						showTime={{minuteStep: 15}} 
				        						/>
				      )}
				      </FormItem>
				      <FormItem required={true} label="Ends">
		          {getFieldDecorator('end', {
		            rules: [{ required: true}],
		          })(		      
				        <DatePicker showToday={false} 
				        						format="MM-DD-YYYY HH:mm" 
				        						showTime={{minuteStep: 15}} 
				        						/>
				      )}
				      </FormItem>		      
				    </Form>
				    
				  </div>
        </Modal>
      );
    }
  }
);

class FormModal extends React.Component {
  constructor(props) {
  	super(props);

  	this.state = {
    	visible: false,
  	}
  }

  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {

  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  sendMutation = (values) => {

  }

  render() {
    return (
    	<Mutation mutation={CREATE_EVENT}>
    		{(createEvent) => (
    			<div>
		        <Button type="primary" onClick={this.showModal}>New Event</Button>
		        <CollectionCreateForm
		          wrappedComponentRef={this.saveFormRef}
		          visible={this.state.visible}
		          onCancel={this.handleCancel}
		          onCreate={e => {
						    const form = this.formRef.props.form;
						    form.validateFields((err, fieldsValue) => {
						      if (err) {
						      	error();
						        return;
						      };

						      const values = {
						      	...fieldsValue,
						      	// 'start': fieldsValue['start'].toString(),
						      	// 'end': fieldsValue['end'].toString(),
						      	'type': fieldsValue['type'].toString().split(","),
						      	'guestcount': 0
						      };

						      console.log('Received values of form: ', values)

							    createEvent({
							  		variables: {
							      	start: values.start,
							      	end: values.end,
							      	location: values.location,
							      	desc: values.desc,
							      	title: values.title,
							      	guestcount: values.guestcount,
							      	type: values.type  			
							  		}
							  	})
							    form.resetFields()
							    this.setState({ visible: false })
							    success()      
						    })		          	
		          }}
		        />
	      	</div>
    		)}
      </Mutation>
    );
  }
}

export default FormModal