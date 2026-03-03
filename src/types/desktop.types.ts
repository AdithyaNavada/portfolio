// src/types/desktop.types.ts
export interface DesktopProps {
  onSwitchToTerminal: () => void;
  showTip: boolean;
  onCloseTip: () => void;
}

export interface SystemMenuProps {
  onClose: () => void;
  onSwitchToTerminal: () => void;
  onBrightnessChange: (brightness: number) => void;
  brightness: number;
}
