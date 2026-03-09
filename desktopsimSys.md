# Desktop Environment Simulation System Design
### React + TailwindCSS + Framer Motion

---

# Overview

This project is a **desktop environment simulation** built with **React**, **TailwindCSS**, and **Framer Motion**. The goal is to simulate a **Linux Mint–style desktop interface** where users can log in and interact with desktop applications such as encryption tools and file explorers.

The system is **entirely client-side** and does **not use a backend**. All authentication, file systems, and application logic are simulated in the frontend.

This environment should behave like a **desktop operating system**, not a website.

---

# Core Technologies

- React (Vite recommended)
- TailwindCSS
- Framer Motion
- Zustand or React Context for state management
- Lucide Icons or placeholder icons

---

# Application Modes

The application has two primary modes.

## 1. Login Mode

When the application starts, it displays a **fullscreen login interface**.

Features:
- Username input
- Password input
- Fullscreen button
- Input validation
- Simulated authentication

---

## 2. Desktop Mode

After successful login, the user enters a **desktop environment**.

Features:

- Desktop wallpaper
- Desktop icons
- Taskbar
- Start menu
- Window manager
- Application windows

---

# Fullscreen Behavior

When the application launches, the user should be able to enter fullscreen mode.

Example implementation:
document.documentElement.requestFullscreen()


This removes browser UI and helps the interface behave like a desktop system.

---

# Users

There are three users in the system.

| Username | Password | Special Desktop Apps |
|--------|--------|--------|
| Joseph | joseph | Encryption Tool |
| Titus | titus | File Explorer |
| Naomi | naomi | Research Workspace |

All user credentials are stored in frontend configuration.

---

# Authentication Design

Authentication is simulated.

User credentials are validated against a frontend configuration file.

File:
src/config/users.ts


Example structure:

```ts
export const USERS = [
  {
    username: "Joseph",
    password: "joseph",
    desktopIcons: ["encryptionTool"]
  },
  {
    username: "Titus",
    password: "titus",
    desktopIcons: ["fileExplorer"]
  },
  {
    username: "Naomi",
    password: "naomi",
    desktopIcons: ["naomiWorkspace"]
  }
];
```

#Global Desktop Layout

All users share the same base desktop interface.

Components:

Desktop background

Taskbar

Start menu

System tray


#Shared desktop icons

These icons appear for all users.
```ts
MyPC
Trash
Settings
```

Taskbar

The taskbar appears at the bottom of the screen.

Features:

Start Menu button

Running application indicators

Clock

System tray

Window System

Applications open inside desktop windows.

Each window should support:

Dragging

Close

Minimize

Focus

Z-index ordering

Animations should be handled with Framer Motion.

Window state should be stored globally.

Example window structure:

{
 id: string
 type: string
 position: {x:number,y:number}
 size: {width:number,height:number}
 minimized: boolean
 focused: boolean
}
Project Folder Structure
src

app
  App.tsx
  Desktop.tsx
  LoginScreen.tsx

config
  users.ts

context
  DesktopContext.tsx

components

  desktop
    DesktopIcons.tsx
    DesktopIcon.tsx
    Taskbar.tsx
    StartMenu.tsx

  window
    WindowManager.tsx
    WindowFrame.tsx

  apps

    EncryptionTool
      EncryptionToolWindow.tsx

    FileExplorer
      FileExplorerWindow.tsx
      PasswordModal.tsx

    NaomiWorkspace
      NaomiWorkspace.tsx

utils
  auth.ts
  encryptionSimulator.ts
  fileSystem.ts
Desktop Icon System

Desktop icons represent applications.

Example structure:

{
 id: "encryptionTool",
 name: "USB Encryption Tool",
 icon: placeholderIcon,
 app: "EncryptionTool"
}

Icons displayed depend on the logged-in user.

Joseph User Desktop

Joseph has access to the USB Encryption Tool.

Desktop icon:

USB Encryption Tool
Encryption Tool Design

The encryption tool simulates encrypting drives.

Interface sections:

Drive Selection

Encryption Controls

Password Prompt

Encryption Status Logs

Progress Bar

Drive Selection

Drives are grouped by type.

Internal drives:

C:
D:

External drives:

A: archive_
B: USB_key

Selected drive should visually highlight.

Encryption Controls

Controls include:

Buttons:

Encrypt
Decrypt

Dropdown:

KEK Drive

Available option:

B: USB_key
Encryption Password

When Encrypt is pressed, a password modal appears.

Password must be hidden.

Correct password:

John 8:32
Encryption Simulation

Encryption runs as a simulated sequence.

Logs appear with delays.

Encryption Type:
[x] Split Key Encryption

Then:

[Start Encryption]
Encryption Log Sequence
Generating Data Encryption Key...
(2 seconds)

Storing Key to KEK Drive...
(2 seconds)

Encrypting Drives...
(20 seconds)
Progress Bar

A progress bar reflects encryption progress.

Example:

Progress ███████░░ 70%

Final state:

Encryption Complete

When finished:

Progress = 100%

Done button activates

Titus User Desktop

Titus has access to File Explorer.

Desktop icon:

File Explorer
File Explorer Drives

Visible drives:

C
D
A: archive_
Encrypted Drive Access

When user clicks:

A: archive_

A modal appears:

Drive is encrypted
Enter Password

Correct password:

John 8:32
Password Attempt System

User has 5 attempts.

Error message:

Wrong password! {count} attempts left

The message should be styled in danger red.

Successful Decryption

After correct password entry, the drive contents appear.

Root folder:

FAULT LINES
Folder Structure
A: archive_
 └ FAULT LINES
     ├ xj29af
     ├ k92kf1
     ├ z9aa21
     ├ hidden
     └ hfgr0.bin
Hidden Folder

Opening:

hidden

Displays an empty directory.

Address Bar

Explorer shows the navigation path.

Example:

A:/archive_/FAULT LINES/hidden/
Navigation Buttons

Explorer includes navigation controls.

← Back
→ Forward

These navigate folder history.

Naomi User Desktop

Naomi has a dedicated workspace.

Icons include placeholders for future tools.

Example icons:

Encryption Files
Research Logs
Drive Scanner

These open placeholder application windows.

Simulated File System

File:

src/utils/fileSystem.ts

Example structure:

export const FILE_SYSTEM = {
  A: {
    "FAULT LINES": {
      folders: ["xj29af","k92kf1","z9aa21","hidden"],
      files: ["hfgr0.bin"]
    },
    hidden: {}
  }
}
Encryption Simulator

File:

src/utils/encryptionSimulator.ts

Responsible for:

timing encryption stages

updating progress bar

generating logs

Suggested approach:

Use async functions and delays.

Authentication Utility

File:

src/utils/auth.ts

Responsibilities:

validate login credentials

return user configuration

Window Manager

The Window Manager controls all open application windows.

Responsibilities:

opening apps

window focus

window stacking order

minimize/close behavior

Animations should be implemented using Framer Motion.

UI Styling Guidelines

The interface should feel like a desktop OS.

Use:

rounded window frames

drop shadows

subtle blur effects

animated window transitions

consistent spacing

Avoid layouts that resemble typical web pages.

Future Expansion

The system should be designed to allow additional applications.

Potential additions:

terminal emulator

network monitor

log viewer

simulated hacking tools

additional encrypted drives

Constraints

Important restrictions:

No backend server

No real encryption

No persistent storage required

All logic runs in frontend memory

The system should simulate behavior without performing real operations.

Final Goal

The finished product should feel like a simulated desktop operating system environment where users can:

log in

interact with applications

navigate files

simulate encryption workflows
