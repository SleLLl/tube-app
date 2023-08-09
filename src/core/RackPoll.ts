import Rack from './Rack.ts';
import Tube from './Tube.ts';

class RackPoll {
  racks: Rack[] = [];
  listeners: Array<() => void> = [];

  onChangeListener(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  addTube(tube: Tube) {
    const rack = this.racks.find((rack) => rack.isValidToAdd(tube));
    if (rack) {
      rack.addTube(tube);
    } else {
      const newRack = new Rack();
      newRack.addTube(tube);
      this.racks.push(newRack);
    }
    this.notifyListeners();
  }

  getTube(id: string) {
    const rack = this.racks.find((rack) => rack.hasTube(id));
    if (rack) {
      return rack.getTube(id);
    }
  }

  removeTube(tube: Tube) {
    const rack = this.racks.find((rack) => rack.hasTube(tube.id));
    if (rack) {
      rack.removeTube(tube);
      if (rack.isEmpty()) {
        this.racks = this.racks.filter((rc) => rc.id !== rack.id);
      }
    }
    this.notifyListeners();
  }
}

export default new RackPoll();
