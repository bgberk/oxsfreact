import React from 'react'
import { message, Form, Input, Button, DatePicker, TimePicker, Select, Modal } from 'antd'
import 'antd/dist/antd.css'

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
				      <FormItem required={true} label="Date" >
		          {getFieldDecorator('date', {
		            rules: [{ required: true}],
		          })(		      
				        <DatePicker />
				      )}
				      </FormItem>
				      <FormItem required={true} label="Starts">
		          {getFieldDecorator('start', {
		            rules: [{ required: true}],
		          })(		      
				        <TimePicker inputReadOnly={true} format="HH:mm" minuteStep={15} />
				      )}
				      </FormItem>
				      <FormItem required={true} label="Ends">
		          {getFieldDecorator('end', {
		            rules: [{ required: true}],
		          })(		      
				        <TimePicker inputReadOnly={true} format="HH:mm" minuteStep={15} />
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
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
      	error();
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      success();
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>New Event</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default FormModal