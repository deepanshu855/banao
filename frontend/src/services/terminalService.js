import { io } from 'socket.io-client';
import { TERMINAL_EVENTS } from '../utils/constants';
import { getAgentBaseUrl } from '../utils/urlBuilders';

class TerminalService {
  constructor() {
    this.socket = null;
  }

  connect(sandboxId, onOutput) {
    if (!sandboxId) throw new Error("sandboxId is missing");
    const url = getAgentBaseUrl(sandboxId);
    this.socket = io(url, {
      transports: ['websocket'],
    });

    this.socket.on(TERMINAL_EVENTS.OUTPUT, (data) => {
      if (onOutput) onOutput(data);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Terminal connection error:', err);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  write(data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(TERMINAL_EVENTS.INPUT, data);
    }
  }

  resize(cols, rows) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(TERMINAL_EVENTS.RESIZE, { cols, rows });
    }
  }
}

export const terminalService = new TerminalService();
