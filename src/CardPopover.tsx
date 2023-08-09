import Tube from './core/Tube.ts';
import { Button } from 'antd';

interface CardPopoverProps {
  tube: Tube;
  onRemove: (id: Tube) => () => void;
}
const CardPopover = (props: CardPopoverProps) => {
  const { tube, onRemove } = props;

  return (
    <div>
      <p>Age: {tube.age}</p>
      <p>Company: {tube.company}</p>
      <p>Vision Defect: {tube.visionDefect}</p>
      <Button danger onClick={onRemove(tube)}>
        Remove
      </Button>
    </div>
  );
};

export default CardPopover;
