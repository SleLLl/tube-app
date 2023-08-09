import { useEffect, useMemo, useState } from 'react';
import { Empty, Button, Form, Input, Space, InputNumber, Card, Popover } from 'antd';
import RackPoll from './core/RackPoll.ts';

import './app.css';
import Tube, { TubeI } from './core/Tube.ts';
import CardPopover from './CardPopover.tsx';

const { Search } = Input;

function App() {
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [date, setState] = useState(new Date());

  useEffect(() => {
    const unsubscribe = RackPoll.onChangeListener(() => {
      setState(new Date());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onGenerate = () => {
    const tube = Tube.generate();
    RackPoll.addTube(tube);
  };

  const onRemove = (tube: Tube) => () => {
    RackPoll.removeTube(tube);
  };

  const onFinish = (fieldsValue: TubeI) => {
    const tube = new Tube(fieldsValue);
    RackPoll.addTube(tube);
  };

  const racks = useMemo(() => {
    return RackPoll.racks.filter((rack) => {
      return rack.getAllTubes().some((tube) => {
        return (
          tube.id.includes(search) ||
          tube.visionDefect.includes(search) ||
          tube.age.toString().includes(search) ||
          tube.company.includes(search)
        );
      });
    });
  }, [date, search]);

  return (
    <div className="container">
      <aside className="aside">
        <Form
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off">
          <Form.Item name="company" label="Company" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true }, { type: 'number', min: 1 }]}>
            <InputNumber className="age" />
          </Form.Item>
          <Form.Item name="defect" label="Vision Defect" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
              <Button onClick={onGenerate} htmlType="button">
                Generate
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <div className="divider" />
        <Search
          placeholder="Type tube id/defect/age/company"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={setSearch}
        />
      </aside>
      <main className="main" data-state-empty={racks.length === 0}>
        {racks.length === 0 && <Empty />}
        {racks.map((rack) => {
          return (
            <div className="rack" key={rack.id}>
              <Card title={rack.id}>
                {rack.getAllTubes()?.map((tube) => (
                  <Popover
                    content={<CardPopover tube={tube} onRemove={onRemove} />}
                    key={tube.id}>
                    <Card.Grid className="cell">{tube.id}</Card.Grid>
                  </Popover>
                ))}
              </Card>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
