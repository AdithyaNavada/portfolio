// filename: components/Desktop.tsx
'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Window from './Window';
import SystemMenu from './SystemMenu';
import { DESKTOP_APPS, TASKBAR_QUICK_APPS, EXTERNAL_LINKS } from '../constants/apps';
import { useWindowManager } from '../hooks/useWindowManager';
import { useClock } from '../hooks/useClock';
import { useBattery } from '../hooks/useBattery';
import { useMobileDetect } from '../hooks/useMobileDetect';
import { useFullscreen } from '../hooks/useFullscreen';
import { useContextMenu } from '../hooks/useContextMenu';
import { getSortedApps } from '../utils/sort';
import { logger } from '../utils/logger';
import { applySecurityPolicies } from '../utils/security';
import { detectDevTools } from '../utils/devtools-detect';
import type { DesktopProps } from '../types/desktop.types';
import type { AppItem } from '../types/window.types';

export default function Desktop({ onSwitchToTerminal, showTip, onCloseTip }: DesktopProps) {
    // Use extracted hooks
    const isMobile = useMobileDetect();
    const currentTime = useClock();
    const { batteryLevel, isCharging } = useBattery();
    const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, bringToFront, updateWindowPosition, restoreWindow, isAppMinimized, getCurrentWindow } = useWindowManager(isMobile);
    const { contextMenu, handleContextMenu: handleContextMenuClick, closeContextMenu } = useContextMenu();
    
    // Apply security policies and DevTools detection
    useEffect(() => {
        applySecurityPolicies();
        detectDevTools(() => {
            console.clear();
            console.log('%c🛑 Stop!', 'color: red; font-size: 32px; font-weight: bold;');
            console.log('%cThis browser feature is intended for developers. Copying or inspecting this code without permission may violate intellectual property rights.', 'font-size: 14px;');
        });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [showSystemMenu, setShowSystemMenu] = useState(false);
    const [brightness, setBrightness] = useState(100);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortOrder, setSortOrder] = useState<'default' | 'a-z' | 'z-a'>('default');
    const [folders, setFolders] = useState<Array<{
        id: string;
        name: string;
        isEditing: boolean;
    }>>([]);

    const handleIconClick = useCallback((appName: string) => {
        if (EXTERNAL_LINKS[appName]) {
            window.open(EXTERNAL_LINKS[appName], '_blank');
        } else {
            openWindow(appName);
        }
    }, [openWindow]);

    const updateFolderName = useCallback((id: string, newName: string) => {
        setFolders(prev => prev.map(folder =>
            folder.id === id ? { ...folder, name: newName } : folder
        ));
    }, []);

    const finishEditingFolder = useCallback((id: string) => {
        setFolders(prev => prev.map(folder =>
            folder.id === id ? { ...folder, isEditing: false } : folder
        ));
    }, []);

    const handleCreateFolder = useCallback(() => {
        const newFolder = {
            id: `folder-${Date.now()}`,
            name: '',
            isEditing: true
        };
        setFolders(prev => [...prev, newFolder]);
        closeContextMenu();
    }, [closeContextMenu]);

    const handleRefresh = useCallback(() => {
        // This will be handled by the useFullscreen hook
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    }, []);

    // Use fullscreen hook
    useFullscreen(isMobile);

    const filteredApps = useMemo(() => 
        DESKTOP_APPS.map(app => ({ ...app, folderId: '', isFolder: false })).filter(app =>
            app.title.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]
    );

    const sortedApps = useMemo(() => 
        getSortedApps(filteredApps, folders, sortOrder), 
        [filteredApps, folders, sortOrder]
    );

    const handleMobileBack = useCallback(() => {
        const currentWindow = getCurrentWindow();
        if (currentWindow) {
            minimizeWindow(currentWindow.id);
        }
    }, [getCurrentWindow, minimizeWindow]);

    const handleMobileHome = useCallback(() => {
        const currentWindow = getCurrentWindow();
        if (currentWindow) {
            closeWindow(currentWindow.id);
        }
    }, [getCurrentWindow, closeWindow]);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        handleContextMenuClick(e, isMobile);
    }, [handleContextMenuClick, isMobile]);

    return (
        <div
            className="h-screen w-screen bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden"
            onContextMenu={handleContextMenu}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeContextMenu();
                }
            }}
            style={{
                backgroundImage: "url('/images/trace.svg')",
                backgroundSize: 'cover',
            }}
        >
            {showTip && (
                <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
                    <div className="bg-[#1a1a1a] border border-blue-500 rounded-lg p-6 max-w-md w-full">
                        <div className="text-blue-400 text-xl font-bold mb-4">
                            🖥️ Desktop Mode Active
                        </div>
                     
                        <div className="text-gray-300 mb-4 leading-relaxed">
                            Welcome to Desktop Mode! {isMobile ? 'Tap' : 'Double-click'} icons to open applications.
                        </div>
                        <div className="bg-slate-800 border border-slate-600 rounded p-3 mb-4">
                            <div className="text-green-400 text-sm font-semibold mb-2">💡 Pro Tip:</div>
                            <div className="text-gray-300 text-sm">
                                Return to Terminal Mode anytime by clicking the settings icon (⚙️) in the {isMobile ? 'bottom' : 'taskbar'} and selecting "Switch to Terminal".
                                {!isMobile && ' P.S. - Keep an eye out for the Easter egg! 🥚'}
                            </div>
                        </div>
                        <button
                            onClick={onCloseTip}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}

            {isMobile && (
                <div className="absolute top-0 left-0 right-0 h-8 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-between px-4 z-40">
                    <div className="flex items-center space-x-2">
                        <span className="text-white text-xs">{currentTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {batteryLevel !== null && (
                            <div className="flex items-center space-x-1">
                                <span className="text-white text-xs">{batteryLevel}%</span>
                                <span className="text-white text-xs">
                                    {isCharging ? '⚡' : batteryLevel > 20 ? '🔋' : '🪫'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 z-0 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}
                onContextMenu={handleContextMenu}
            />

            <div
                className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 z-40"
                style={{ opacity: (100 - brightness) / 100 }}
            />

            {!isMobile && contextMenu.visible && (
                <>
                    <div
                        className="fixed inset-0 z-45"
                        onClick={closeContextMenu}
                    />
                    <div
                        className="absolute bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-lg border border-gray-600 shadow-2xl z-50 py-2 min-w-60"
                        style={{
                            left: Math.min(contextMenu.x, window.innerWidth - 200),
                            top: Math.min(contextMenu.y, window.innerHeight - 200),
                            padding: '0.5rem'
                        }}
                    >
                        <div className="px-4 py-2 text-gray-300 text-sm border-b border-gray-600 flex items-center space-x-3" style={{ padding: '0.5rem' }}>
                            <span>🔧</span>
                            <span>Sort by</span>
                        </div>
                        <button
                            onClick={() => {
                                setSortOrder('default');
                                closeContextMenu();
                            }}
                            style={{ padding: '0.5rem' }}
                            className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center justify-between ${sortOrder === 'default' ? 'bg-gray-700' : ''}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span>📋</span>
                                <span>Default</span>
                            </span>
                            {sortOrder === 'default' && <span className="text-blue-400">✓</span>}
                        </button>
                        <button
                            onClick={() => {
                                setSortOrder('a-z');
                                closeContextMenu();
                            }}
                            style={{ padding: '0.5rem' }}
                            className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center justify-between ${sortOrder === 'a-z' ? 'bg-gray-700' : ''}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span>🔤</span>
                                <span>A - Z</span>
                            </span>
                            {sortOrder === 'a-z' && <span className="text-blue-400">✓</span>}
                        </button>
                        <button
                            onClick={() => {
                                setSortOrder('z-a');
                                closeContextMenu();
                            }}
                            style={{ padding: '0.5rem' }}
                            className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center justify-between ${sortOrder === 'z-a' ? 'bg-gray-700' : ''}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span>🔤</span>
                                <span>Z - A</span>
                            </span>
                            {sortOrder === 'z-a' && <span className="text-blue-400">✓</span>}
                        </button>
                        <div className="border-t border-gray-600 mt-2 pt-2">
                            <button
                                onClick={handleRefresh}
                                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                style={{ padding: '0.5rem' }}
                            >
                                <span>🔄</span>
                                <span>Refresh</span>
                            </button>
                            <button
                                onClick={() => {
                                    onSwitchToTerminal();
                                    closeContextMenu();
                                }}
                                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                style={{ padding: '0.5rem' }}
                            >
                                <span>🖥️</span>
                                <span>Switch to Terminal</span>
                            </button>
                            <button
                                onClick={handleCreateFolder}
                                style={{ padding: '0.5rem' }}
                                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                            >
                                <span>📁</span>
                                <span>New Folder</span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className={`absolute ${isMobile ? 'top-12 left-4 right-4' : 'top-20 left-8 right-8'} z-30`}>
                <div className={`grid ${isMobile ? 'pt-15 grid-cols-4 gap-4' : 'grid-cols-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-x-8 gap-y-6'} auto-rows-min`}>
                    {sortedApps.map((item, index) => (
                        <div
                            key={item.name}
                            className="flex flex-col items-center cursor-pointer group"
                            onDoubleClick={() => item.isFolder ? openWindow('folder') : handleIconClick(item.name)}
                            onClick={() => isMobile && (item.isFolder ? openWindow('folder') : handleIconClick(item.name))}
                            style={{ userSelect: 'none' }}
                        >
                            <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} bg-gray-300 bg-opacity-40 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-opacity-60 transition-all duration-200 group-hover:scale-105 border border-white border-opacity-30 shadow-lg`}>
                                {!item.isFolder ? (
                                    <>
                                        <img
                                            src={`/icons/${item.name}.png`}
                                            alt={item.title}
                                            className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} object-contain`}
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                const fallback = target.parentElement?.querySelector('.fallback-icon');
                                                if (fallback) {
                                                    target.style.display = 'none';
                                                    (fallback as HTMLElement).style.display = 'block';
                                                }
                                            }}
                                        />
                                        <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} fallback-icon`} style={{ display: 'none' }}>
                                            {item.icon}
                                        </span>
                                    </>
                                ) : (
                                    <span className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>{item.icon}</span>
                                )}
                            </div>
                            {item.isFolder && folders.find(f => f.id === item.folderId)?.isEditing ? (
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateFolderName(item.folderId, e.target.value)}
                                    onBlur={() => finishEditingFolder(item.folderId)}
                                    onKeyDown={(e) => e.key === 'Enter' && finishEditingFolder(item.folderId)}
                                    className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} mt-2 text-center px-2 py-1 rounded-md bg-black bg-opacity-50 border border-white border-opacity-30 ${isMobile ? 'max-w-16' : 'max-w-20'} outline-none`}
                                    autoFocus
                                />
                            ) : (
                                <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} mt-2 text-center ${isMobile ? 'max-w-16' : 'max-w-20'} truncate drop-shadow-sm`} style={{ paddingTop: '0.3rem' }}>
                                    {item.title}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {windows.map(window => (
                !window.isMinimized && (
                    <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        component={window.component}
                        position={window.position}
                        size={window.size}
                        isMaximized={window.isMaximized}
                        zIndex={window.zIndex}
                        brightness={brightness}
                        isMobile={isMobile}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onMaximize={maximizeWindow}
                        onBringToFront={bringToFront}
                        onUpdatePosition={updateWindowPosition}
                        openContactWindow={() => openWindow('contact')}
                    />
                )
            ))}

            {showSystemMenu && (
                <div className="fixed inset-0 z-[10000]">
                    <SystemMenu
                        onClose={() => setShowSystemMenu(false)}
                        onSwitchToTerminal={onSwitchToTerminal}
                        onBrightnessChange={setBrightness}
                        brightness={brightness}
                    />
                </div>
            )}

            <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'h-12' : 'h-12'} bg-gray-800 bg-opacity-95 backdrop-blur-sm flex items-center ${isMobile ? 'justify-around px-2' : 'justify-between px-4'} border-t border-gray-600 z-30`}>
                {isMobile ? (
                    <>
                        <button
                            onClick={() => setShowSystemMenu(!showSystemMenu)}
                            className="flex flex-col items-center justify-center px-4 py-1 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <span className="text-xl ">⚙️</span>
                        </button>

                        <button
                            onClick={handleMobileHome}
                            disabled={!getCurrentWindow()}
                            className={`flex flex-col items-center justify-center px-4 py-1 hover:bg-gray-700 rounded-lg transition-colors ${!getCurrentWindow() ? 'opacity-50' : ''}`}
                        >
                            <span className="text-3xl text-white">⌂</span>
                        </button>

                        <button
                            onClick={handleMobileBack}
                            disabled={!getCurrentWindow()}
                            className={`flex flex-col items-center justify-center px-4 py-1 hover:bg-gray-700 rounded-lg transition-colors ${!getCurrentWindow() ? 'opacity-50' : ''}`}
                        >
                            <span className="text-3xl text-white">◁</span>
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex items-center">
                            {TASKBAR_QUICK_APPS.map(app => (
                                <button
                                    key={app}
                                    onClick={() => handleIconClick(app)}
                                    className={`flex flex-col items-center justify-center w-12 h-10 hover:bg-gray-700 rounded-lg transition-colors group relative ${isAppMinimized(app) ? 'border-b-2 border-blue-400' : ''}`}
                                >
                                    <span className="text-xl">{DESKTOP_APPS.find(a => a.name === app)?.icon}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-white text-sm">{currentTime}</span>
                            {batteryLevel !== null && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-white text-sm">{batteryLevel}%</span>
                                    <span className="text-white text-sm">
                                        {isCharging ? '⚡' : batteryLevel > 20 ? '🔋' : '🪫'}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => setShowSystemMenu(!showSystemMenu)}
                                className="flex flex-col items-center justify-center px-4 py-1 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <span className="text-xl">⚙️</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
