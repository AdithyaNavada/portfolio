// filename: app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Terminal from "../components/Terminal";
import Desktop from "../components/Desktop";

const SplineViewer = dynamic(() => import("../components/SplineViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-green-400">
      Loading 3D Scene...
    </div>
  ),
});

const SplineViewerMobile = dynamic(
  () => import("../components/SplineViewerMobile"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-green-400">
        Loading 3D Scene...
      </div>
    ),
  },
);

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [showTerminalTip, setShowTerminalTip] = useState(false);
  const [hasSeenWarning, setHasSeenWarning] = useState(false);
  const terminalRef = useRef<any>(null);
  const [showDesktopSiteWarning, setShowDesktopSiteWarning] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const warningShown = sessionStorage.getItem("terminal-warning-shown");

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const actualWidth = window.screen.width;
      const viewportWidth = window.innerWidth;

      // Detect if desktop site mode is enabled
      const isDesktopSiteMode = mobile && viewportWidth > actualWidth * 1.5;

      setIsMobile(mobile);

      // Show desktop site warning if detected
      if (mobile && isDesktopSiteMode) {
        setShowDesktopSiteWarning(true);
        return;
      }

      if (mobile && !isDesktopMode && !warningShown && !hasSeenWarning) {
        setShowMobileWarning(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Battery monitoring
    const updateBatteryInfo = async () => {
      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);

          battery.addEventListener("levelchange", () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });

          battery.addEventListener("chargingchange", () => {
            setIsCharging(battery.charging);
          });
        } catch (error) {
          console.log("Battery API not available");
        }
      }
    };

    updateBatteryInfo();

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, [isDesktopMode, hasSeenWarning]);

  useEffect(() => {
    // Disable desktop site mode on mobile browsers
    if (isMobile) {
      // Set viewport to force mobile view
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        );
      } else {
        const newViewport = document.createElement("meta");
        newViewport.name = "viewport";
        newViewport.content =
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(newViewport);
      }
    }
  }, [isMobile]);

  const executeCommand = (command: string) => {
    if (terminalRef.current) {
      terminalRef.current.executeCommand(command);
    }
  };

  const handleCloseMobileWarning = () => {
    setShowMobileWarning(false);
    setHasSeenWarning(true);
    sessionStorage.setItem("terminal-warning-shown", "true");
  };

  const handleSwitchToDesktop = () => {
    setIsDesktopMode(true);
    setShowTerminalTip(true);
    setShowMobileWarning(false);
    setHasSeenWarning(true);
    sessionStorage.setItem("terminal-warning-shown", "true");
  };

  const handleSwitchToTerminal = () => {
    setIsDesktopMode(false);
    // Don't show warning again when switching back from desktop mode
    setHasSeenWarning(true);
  };

  const commands = [
    "help",
    "about",
    "projects",
    "skills",
    "experience",
    "contact",
    "education",
    "leadership",
    "clear",
  ];

  if (isDesktopMode) {
    return (
      <>
        <Desktop
          onSwitchToTerminal={handleSwitchToTerminal}
          showTip={showTerminalTip}
          onCloseTip={() => setShowTerminalTip(false)}
        />
      </>
    );
  }

  return (
    <div className="app-container">
      {showMobileWarning && !hasSeenWarning && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-green-500 rounded-lg p-6 max-w-md w-full">
            <div className="text-green-400 text-xl font-bold mb-4 terminal-mono">
              {isMobile ? "📱 Terminal Mode" : "🖥️ Welcome Back to Terminal"}
            </div>
            <div className="text-gray-300 terminal-mono mb-4 leading-relaxed">
              {isMobile
                ? "New to terminal? Try Desktop Mode for a familiar interface!"
                : 'Welcome back to Terminal Mode! Type "help" to see available commands.'}
            </div>
            <div className="bg-slate-800 border border-slate-600 rounded p-3 mb-4">
              <div className="text-blue-400 text-sm font-semibold mb-2">
                💡 Pro Tip:
              </div>
              <div className="text-gray-300 text-sm">
                Switch to Desktop Mode using the button in the top-right corner
                for a GUI experience.
                {!isMobile &&
                  " There might be an Easter egg waiting for you... 👀"}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCloseMobileWarning}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded terminal-mono transition-colors"
                suppressHydrationWarning={true}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="app-header">
        <div className="header-nav">
          {!isMobile &&
            commands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => !isTyping && executeCommand(cmd)}
                className="nav-button"
                disabled={isTyping}
                suppressHydrationWarning={true}
              >
                {cmd}
              </button>
            ))}
        </div>
        <div className="header-info">
          <button
            onClick={handleSwitchToDesktop}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
hover:from-blue-600 hover:to-blue-700 
text-white font-bold rounded-lg 
transition-all duration-300 ease-in-out 
transform hover:scale-105 hover:-translate-y-1 
hover:shadow-lg hover:shadow-blue-500/30 
active:scale-95"
            style={{ padding: "0.4rem" }}
            suppressHydrationWarning={true}
          >
            Desktop Mode
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="spline-container">
          {isMobile ? <SplineViewerMobile /> : <SplineViewer />}
        </div>
        <div className="terminal-wrapper">
          <Terminal ref={terminalRef} onTypingChange={setIsTyping} />
        </div>
      </div>

      {isMobile && (
        <div className="mobile-command-bar">
          <div className="mobile-command-scroll">
            {commands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => !isTyping && executeCommand(cmd)}
                className="mobile-command-btn"
                disabled={isTyping}
                suppressHydrationWarning={true}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="app-footer">
        <span>{isClient ? currentTime : "8/11/2025, 8:43:05"}</span>
        {batteryLevel !== null && (
          <span className="flex items-center gap-2">
            <span>{batteryLevel}%</span>
            <span>{isCharging ? "⚡" : batteryLevel > 20 ? "🔋" : "🪫"}</span>
          </span>
        )}
      </div>
    </div>
  );
}
