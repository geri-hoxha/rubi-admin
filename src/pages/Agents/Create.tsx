import { InboxOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;
const { Dragger } = Upload;

const regions = ['North', 'South', 'East', 'West', 'Central'];
const idProofTypes = ['Passport', "Driver's License", 'National ID'];
const agentTypes = ['Main Agent', 'Sub-Agent'];
const contactMethods = ['Phone', 'Email', 'SMS'];

const Create = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Convert dayjs objects to string if needed
    const processedValues = {
      ...values,
      dob: values.dob?.format('YYYY-MM-DD'),
      joiningDate: values.joiningDate?.format('YYYY-MM-DD'),
      profilePicture:
        values.profilePicture?.fileList?.[0]?.originFileObj || null,
    };
    console.log('Agent Data:', processedValues);
    message.success('Agent created successfully!');
    // Send processedValues to your backend here
  };

  const validatePasswords = (_, value) => {
    if (!value || form.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Passwords do not match!'));
  };

  const normFile = (e) => {
    // Normalize upload event value for Form.Item
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <PageContainer>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: true,
          commissionRate: 5,
          region: regions[0],
          agentType: agentTypes[0],
          preferredContactMethod: contactMethods[0],
          isVIP: false,
          maxBetLimit: 1000,
        }}
        scrollToFirstError
      >
        <Row gutter={[24, 24]}>
          <Col span={12} md={8}>
            <Form.Item
              label="Agent Name"
              name="agentName"
              rules={[
                { required: true, message: "Please input the agent's name!" },
                { min: 3, message: 'Name must be at least 3 characters' },
              ]}
            >
              <Input placeholder="Enter agent name" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="Agent ID"
              name="agentId"
              rules={[
                { required: true, message: 'Please input the agent ID!' },
                {
                  pattern: /^[A-Z0-9]+$/,
                  message: 'Agent ID must be uppercase letters or numbers only',
                },
              ]}
            >
              <Input placeholder="E.g. AGT123" maxLength={10} />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="agent@example.com" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: 'Please input the phone number!' },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: 'Phone number must be 10 to 15 digits',
                },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input password!' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm password!' },
                { validator: validatePasswords },
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Date of Birth */}
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: 'Please select date of birth!' },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    if (dayjs().diff(value, 'year') < 18) {
                      return Promise.reject(
                        new Error('Agent must be at least 18 years old'),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Address */}
            <Form.Item
              label="Street Address"
              name="streetAddress"
              rules={[
                { required: true, message: 'Please input street address!' },
              ]}
            >
              <Input placeholder="Street address" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input city!' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: 'Please input state!' }]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="Zip Code"
              name="zipCode"
              rules={[
                { required: true, message: 'Please input zip code!' },
                {
                  pattern: /^[0-9]{5,10}$/,
                  message: 'Zip code must be between 5 and 10 digits',
                },
              ]}
            >
              <Input placeholder="Zip code" />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* ID Proof */}
            <Form.Item
              label="ID Proof Type"
              name="idProofType"
              rules={[
                { required: true, message: 'Please select ID proof type!' },
              ]}
            >
              <Select placeholder="Select ID proof type">
                {idProofTypes.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="ID Proof Number"
              name="idProofNumber"
              rules={[
                { required: true, message: 'Please input ID proof number!' },
              ]}
            >
              <Input placeholder="Enter ID proof number" />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Bank Details */}
            <Form.Item
              label="Bank Name"
              name="bankName"
              rules={[{ required: true, message: 'Please input bank name!' }]}
            >
              <Input placeholder="Bank name" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="Bank Account Number"
              name="bankAccountNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input bank account number!',
                },
                {
                  pattern: /^[0-9]{8,20}$/,
                  message: 'Account number must be 8 to 20 digits',
                },
              ]}
            >
              <Input placeholder="Account number" />
            </Form.Item>
          </Col>
          <Col span={12} md={8}>
            <Form.Item
              label="IFSC Code"
              name="ifscCode"
              rules={[
                { required: true, message: 'Please input IFSC code!' },
                {
                  pattern: /^[A-Z]{4}[0-9]{7}$/,
                  message: 'IFSC code must be 4 letters followed by 7 digits',
                },
              ]}
            >
              <Input placeholder="IFSC code" maxLength={11} />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Joining Date */}
            <Form.Item
              label="Joining Date"
              name="joiningDate"
              rules={[
                { required: true, message: 'Please select joining date!' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Agent Type */}
            <Form.Item
              label="Agent Type"
              name="agentType"
              rules={[{ required: true, message: 'Please select agent type!' }]}
            >
              <Select placeholder="Select agent type">
                {agentTypes.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Preferred Contact Method */}
            <Form.Item
              label="Preferred Contact Method"
              name="preferredContactMethod"
              rules={[
                { required: true, message: 'Please select contact method!' },
              ]}
            >
              <Select placeholder="Select contact method">
                {contactMethods.map((method) => (
                  <Select.Option key={method} value={method}>
                    {method}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>


          <Col span={12} md={8}>
            {/* Max Allowed Bet Limit */}
            <Form.Item
              label="Max Allowed Bet Limit"
              name="maxBetLimit"
              rules={[
                { required: true, message: 'Please input max bet limit!' },
                { type: 'number', min: 0, message: 'Must be zero or positive' },
              ]}
            >
              <InputNumber
                min={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

         

          <Col span={12} md={8}>
            {/* Commission Rate */}
            <Form.Item
              label="Commission Rate (%)"
              name="commissionRate"
              rules={[
                { required: true, message: 'Please input commission rate!' },
                {
                  type: 'number',
                  min: 0,
                  max: 100,
                  message: 'Commission rate must be between 0 and 100',
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace('%', '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

     
          <Col span={12} md={8}>
            {/* Assigned Region */}
            <Form.Item
              label="Assigned Region"
              name="region"
              rules={[{ required: true, message: 'Please select a region!' }]}
            >
              <Select placeholder="Select region">
                {regions.map((region) => (
                  <Select.Option key={region} value={region}>
                    {region}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
     <Col span={12} md={8}>
            {/* Status */}
            <Form.Item
              label="Status"
              name="status"
              valuePropName="checked"
              tooltip="Active means the agent can access the system"
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>

          <Col span={12} md={8}>
            {/* Is VIP */}
            <Form.Item
              name="isVIP"
              valuePropName="checked"
              tooltip="Is the agent a VIP?"
            >
              <Checkbox>VIP Agent</Checkbox>
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            {/* Notes */}
            <Form.Item label="Notes" name="notes">
              <TextArea
                rows={6}
                placeholder="Additional notes about the agent"
              />
            </Form.Item>
          </Col>

           <Col span={24} md={16}>
            {/* Profile Picture Upload */}
            <Form.Item
              label="Profile Picture"
              name="profilePicture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Upload profile picture (JPG/PNG, max 2MB)"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.length === 0) return Promise.resolve();
                    const file = value[0].originFileObj;
                    const isJpgOrPng =
                      file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJpgOrPng) {
                      return Promise.reject(
                        new Error('Only JPG/PNG files are allowed!'),
                      );
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      return Promise.reject(
                        new Error('Image must be smaller than 2MB!'),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Dragger
                name="files"
                multiple={false}
                beforeUpload={() => false} // Prevent auto upload, manual submit instead
                accept=".jpg,.jpeg,.png"
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single upload. Strictly prohibit from uploading
                  company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
 
              
            {/* Buttons */}
            <Form.Item style={{marginLeft: 'auto'}}>
              <Space size='large'>
                
                <Button
                size='large'
                  htmlType="button"
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
                <Button size='large' type="primary" htmlType="submit">
                  Create Agent
                </Button>
              </Space>
            </Form.Item>
         </Row>
      </Form>
    </PageContainer>
  );
};

export default Create;
